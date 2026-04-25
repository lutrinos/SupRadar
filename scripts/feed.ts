import csv from "csv-parser";
import { createReadStream } from "node:fs";
import log from "./log";

import { Academie, academies, Departement, departements, Etablissement, etablissements, Filiere1, filiere1, filiere2, Filiere2, filiere3, Filiere3, Formation, formations, Region, regions, statistiques, Statistiques, Statut, statuts } from "../src/lib/server/db/schema";
import { db } from "./db";
import { LigneCSV, IndiceStats } from "./types";
import { Value } from "@sinclair/typebox/value";
import { BuildSchema, createInsertSchema } from "drizzle-typebox";
import { sql } from "drizzle-orm";

const IndiceTrie = Object.entries(IndiceStats)
    .sort(([, indexA], [, indexB]) => indexA - indexB)
    .map(([key, _]) => key);

const d = <T>(v: T | undefined, r: T) => v ?? r;
const ds = (v: string, r: string) => v.length > 0 ? v : r;

// Pour transformer du texte en slug
function slugify(str: string) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]|^[^a-zA-Z0-9éèàç]+|[^a-zA-Z0-9éèàç]+$/g, '')
        .replace(/[^a-zA-Z0-9éèàç]+/g, '-');
}

// Pour parser du csv
async function parseCSV(year: number, callback: (data: any, year: number) => void) {
    return new Promise((resolve) => {
        createReadStream(`./data/source/fr-esr-parcoursup_${year}.csv`)
            .pipe(csv({
                separator: ';',
            }))
            .on('data', (c) => {
                callback(c, year);
            })
            .on('end', () => {
                resolve(undefined);
            });
    });
}

// Pour réaliser des chunks
async function chunk<T>(arr: T[], chunkSize: number, callback: (c: T[]) => void) {
    const promises = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
        promises.push(callback(arr.slice(i, Math.min(i + chunkSize, arr.length))));
    }

    await Promise.all(promises);
}

// Pour stocker les valeurs intermédiaires
class Intermediary<T> {
    primary: string;
    schema: BuildSchema<any, any, any>;
    data: Map<string, T>

    constructor(primary: any, schema: BuildSchema<any, any, any>) {
        this.primary = primary;
        this.schema = schema;
        this.data = new Map();
    }

    add(data: T) {
        if (!Value.Check(this.schema, data)) {
            return log('error', 'Wrong data', data);
        }

        this.data.set(data[this.primary], data);
    }

    get(key: any) {
        return this.data.get(key);
    }

    size() {
        return this.data.size;
    }

    async save(path: string, key: any) {
        const obj = {};

        this.data.forEach((value) => {
            // @ts-expect-error
            obj[value[key]] = value;
        });

        // @ts-expect-error
        await Bun.write(path, JSON.stringify(obj));
    }

    code(key: any, codeKey: string) {
        if (key && this.data.has(key)) {
            // @ts-expect-error
            return this.data.get(key)[codeKey];
        }
        return this.data.size;
    }

    async chunk(chunkSize: number, fn: (v: T[]) => void) {
        const promises = [];
        const arr = Array.from(this.data.values());

        for (let i = 0; i < arr.length; i += chunkSize) {
            promises.push(fn(arr.slice(i, Math.min(i + chunkSize, arr.length))));
        }

        await Promise.all(promises);
    }
}


const stats: Statistiques[] = [];

const tables = {

    // @ts-expect-error
    departements: new Intermediary<Departement>('code', createInsertSchema(departements)),
    regions: new Intermediary<Region>("nom", createInsertSchema(regions)),
    academies: new Intermediary<Academie>("nom", createInsertSchema(academies)),
    statuts: new Intermediary<Statut>("nom", createInsertSchema(statuts)),

    etablissements: new Intermediary<Etablissement>("uai", createInsertSchema(etablissements)),
    formations: new Intermediary<Formation>("id", createInsertSchema(formations)),

    filiere1: new Intermediary<Filiere1>("nom", createInsertSchema(filiere1)),
    filiere2: new Intermediary<Filiere2>("nom", createInsertSchema(filiere2)),
    filiere3: new Intermediary<Filiere3>("nom", createInsertSchema(filiere3)),
};

const callback2025_2024_2023_2022 = (data: LigneCSV, session: number) => {
    const sc = tables.statuts.code(data.contrat_etab, "code");
    const rc = tables.regions.code(data.region_etab_aff, "code");
    const ac = tables.academies.code(data.acad_mies, "code");

    const fc1 = tables.filiere1.code(data.Fili, "code");
    const fc2 = tables.filiere2.code(data.form_lib_voe_acc, "code");
    const fc3 = tables.filiere3.code(data.fil_lib_voe_acc, "code");

    tables.departements.add({
        code: data.dep,
        nom: ds(data.dep_lib, "Département inconnu")
    });

    tables.statuts.add({
        code: sc,
        nom: ds(data.contrat_etab, "Contrat inconnu")
    });

    tables.regions.add({
        code: rc,
        nom: ds(data.region_etab_aff, "Région inconnue")
    })

    tables.academies.add({
        code: ac,
        nom: ds(data.acad_mies, "Académie inconnue")
    });

    tables.filiere1.add({
        code: fc1,
        nom: ds(data.Fili, "Aucune filière renseignée"),
        slug: slugify(ds(data.Fili, "Aucune filière renseignée").toLowerCase())
    });

    tables.filiere2.add({
        code: fc2,
        nom: ds(data.form_lib_voe_acc, "Aucune filière renseignée"),
        slug: slugify(ds(data.form_lib_voe_acc, "Aucune filière renseignée")).toLowerCase()
    });

    tables.filiere3.add({
        code: fc3,
        nom: ds(data.fil_lib_voe_acc, "Aucune filière renseignée"),
        slug: slugify(ds(data.fil_lib_voe_acc, "Aucune filière renseignée").toLowerCase())
    });

    const [lat, lng] = ds(data.G_olocalisation_des_formations, ",").split(',');

    tables.etablissements.add({
        uai: data.cod_uai,
        nom: data.G_EA_LIB_VX as string,
        statutCode: sc,

        regionCode: rc,
        departementCode: data.dep,
        academieCode: ac,
        commune: data.ville_etab,

        formationsCount: d(tables.etablissements.get(data.cod_uai)?.formationsCount, 0) + 1,

        longitude: isNaN(parseFloat(lng)) ? null : parseFloat(lng),
        latitude: isNaN(parseFloat(lat)) ? null : parseFloat(lat)
    });

    tables.formations.add({
        id: parseInt(data.cod_aff_form ?? 0),
        etablissementUai: data.cod_uai,
        nom: data.LIB_COMP_VOE_INS,

        selective: data.select_form === "formation sélective",
        capacite: parseInt(data.capa_fin ?? "0"),

        filiere1: fc1,
        filiere2: fc2,
        filiere3: fc3,

        detailForma: ds(data.detail_forma, "Aucun détail"),
        detailForma2: ds(data.detail_forma2, "Aucun détail"),

        recherche: [data.cod_uai, data.LIB_COMP_VOE_INS, data.Fili, data.form_lib_voe_acc, data.fil_lib_voe_acc, data.G_EA_LIB_VX, data.ville_etab, data.acad_mies, data.region_etab_aff, data.dep_lib].filter((i) => !!i).join(' ')
    });

    stats.push({
        session,
        formationId: parseInt(data.cod_aff_form ?? 0),

        stats: IndiceTrie.map((key: string) => {
            // @ts-expect-error
            const v = parseFloat(data[key]);

            if (isNaN(v)) {
                return null;
            }

            return v;
        })
    });
};


log('debug', 'Données 2022');
await parseCSV(2022, callback2025_2024_2023_2022);

log('debug', 'Données 2023');
await parseCSV(2023, callback2025_2024_2023_2022);

log('debug', 'Données 2024');
await parseCSV(2024, callback2025_2024_2023_2022);

// On met à jour quelques données pour n'avoir que les dernières
tables.etablissements.data.forEach((v) => {
    v.formationsCount = 0;
});

log('debug', 'Données 2025');
await parseCSV(2025, callback2025_2024_2023_2022);

log('debug', 'Sauvegarde locale');
await tables.departements.save("./src/lib/data/departements.json", "code");
await tables.regions.save("./src/lib/data/regions.json", "code");
await tables.academies.save("./src/lib/data/academies.json", "code");
await tables.statuts.save("./src/lib/data/statuts.json", "code");

await tables.filiere1.save("./src/lib/data/filiere1.json", "code");
await tables.filiere2.save("./src/lib/data/filiere2.json", "code");
await tables.filiere3.save("./src/lib/data/filiere3.json", "code");

log('debug', 'Sauvegarde SQL');
// On insère les départements
await tables.departements.chunk(1000, (data) => db.insert(departements).values(data).onConflictDoUpdate({
    target: departements.code,
    set: {
        nom: sql`excluded.nom`
    }
}));

log('debug', 'Départements insérés');

// On insère les statuts
await tables.statuts.chunk(1000, (data) => db.insert(statuts).values(data).onConflictDoUpdate({
    target: statuts.code,
    set: {
        nom: sql`excluded.nom`
    }
}));

log('debug', 'Status insérés');

// On insère les régions
await tables.regions.chunk(1000, (data) => db.insert(regions).values(data).onConflictDoUpdate({
    target: regions.code,
    set: {
        nom: sql`excluded.nom`
    }
}));

log('debug', 'Régions insérées');

// On insère les académies
await tables.academies.chunk(1000, (data) => db.insert(academies).values(data).onConflictDoUpdate({
    target: academies.code,
    set: {
        nom: sql`excluded.nom`
    }
}));

log('debug', 'Académies insérées');

// On insère les filières
await tables.filiere1.chunk(1000, (data) => db.insert(filiere1).values(data).onConflictDoUpdate({
    target: filiere1.code,
    set: {
        nom: sql`excluded.nom`,
        slug: sql`excluded.slug`
    }
}))

await tables.filiere2.chunk(1000, (data) => db.insert(filiere2).values(data).onConflictDoUpdate({
    target: filiere2.code,
    set: {
        nom: sql`excluded.nom`,
        slug: sql`excluded.slug`
    }
}))

await tables.filiere3.chunk(1000, (data) => db.insert(filiere3).values(data).onConflictDoUpdate({
    target: filiere3.code,
    set: {
        nom: sql`excluded.nom`,
        slug: sql`excluded.slug`
    }
}))

log('debug', 'Filières insérées');

// On insère les établissements
await tables.etablissements.chunk(500, (data) => db.insert(etablissements).values(data).onConflictDoUpdate({
    target: etablissements.uai,
    set: {
        regionCode: sql`excluded.region_code`,
        academieCode: sql`excluded.academie_code`,
        departementCode: sql`excluded.departement_code`,
        statutCode: sql`excluded.statut_code`,

        longitude: sql`excluded.longitude`,
        latitude: sql`excluded.latitude`
    }
}));

log('debug', 'Établissements insérés');

// On insère les formations
await tables.formations.chunk(500, (data) => db.insert(formations).values(data).onConflictDoUpdate({
    target: formations.id,
    set: {
        etablissementUai: sql`excluded.etablissement_uai`,
        nom: sql`excluded.nom`,

        selective: sql`excluded.selective`,
        capacite: sql`excluded.capacite`,

        filiere1: sql`excluded.filiere1`,
        filiere2: sql`excluded.filiere2`,
        filiere3: sql`excluded.filiere3`,

        detailForma: sql`excluded.detail_forma`,
        detailForma2: sql`excluded.detail_forma2`,

        recherche: sql`excluded.recherche`
    }
}));

log('debug', 'Formations insérées');

// On insère les statistiques
await chunk(stats, 500, (data) => db.insert(statistiques).values(data).onConflictDoNothing());

log('debug', 'Statistiques insérées');

<script lang="ts">
    import Info from "$components/Info.svelte";
    import { getFiliere } from "$lib/data";

    let { formation } = $props();

    let formationKeys = $derived([
        [formation.id, "Identifiant de la formation"],
        [formation.nom, "Nom de la formation"],
        [formation.sigle, "Sigle de la formation"],
        [
            formation.selective
                ? "Formation sélective"
                : "Formation non sélective",
            "Formation sélective ou non",
        ],
        [
            getFiliere(1, formation.filiere1).nom,
            "Filière de formation très agrégée",
        ],
        [getFiliere(2, formation.filiere2).nom, "Filière de formation"],
        [
            getFiliere(3, formation.filiere3).nom,
            "Filière de formation détaillée bis",
        ],
        [formation.detailForma, "Filière de formation très détaillée"],
        [formation.detailForma2, "Concours communs et banque d'épreuves"],
    ]);

    let etablissementKeys = $derived([
        [formation.etablissement.uai, "UAI de l'établissement"],
        [formation.etablissement.nom, "Nom de l'établissement"],
        [formation.etablissement.sigle ?? "", "Sigle de l'établissement"],
        [formation.etablissement.site ?? "", "Site web de l'établissement"],
        [
            formation.etablissement.creation ?? "",
            "Date de création de l'établissement",
        ],
        [
            formation.etablissement.reference ?? "",
            "Référence de l'établissement",
        ],
        [formation.etablissement.referenceUrl ?? "", "URL de référence"],
        [formation.etablissement.statutCode ?? "", "Code statut"],

        [formation.etablissement.pays ?? "", "Pays"],
        [formation.etablissement.adresse ?? "", "Adresse"],
        [formation.etablissement.lieuDit ?? "", "Lieu-dit"],
        [formation.etablissement.boitePostale ?? "", "Boîte postale"],
        [formation.etablissement.codePostal ?? "", "Code postal"],
        [formation.etablissement.localite ?? "", "Localité"],
        [formation.etablissement.telephone ?? "", "Téléphone"],

        [formation.etablissement.type ?? "", "Type d'établissement"],
        [formation.etablissement.typologie ?? "", "Typologie"],
        [formation.etablissement.secteur ?? "", "Secteur"],
        [formation.etablissement.vague ?? "", "Vague de contractualisation"],

        [
            formation.etablissement.region?.nom ?? "",
            "Région de l'établissement",
        ],
        [
            formation.etablissement.academie?.nom ?? "",
            "Académie de l'établissement",
        ],
        [
            formation.etablissement.departement?.nom ?? "",
            "Département de l'établissement",
        ],
        [formation.etablissement.regionCode ?? "", "Code région"],
        [formation.etablissement.academieCode ?? "", "Code académie"],
        [formation.etablissement.departementCode ?? "", "Code département"],

        [formation.etablissement.commune ?? "", "Commune de l'établissement"],
        [formation.etablissement.urbaine ?? "", "Zone urbaine"],
        [
            formation.etablissement.longitude ?? "",
            "Longitude de l'établissement",
        ],
        [formation.etablissement.latitude ?? "", "Latitude de l'établissement"],

        [formation.etablissement.formationsCount ?? "", "Nombre de formations"],
        [formation.etablissement.article ?? "", "Article"],

        [
            Array.isArray(formation.etablissement.anciens_uai)
                ? formation.etablissement.anciens_uai.join(", ")
                : (formation.etablissement.anciens_uai ?? ""),
            "Anciens UAI",
        ],
        [formation.etablissement.siret ?? "", "SIRET"],
        [formation.etablissement.siren ?? "", "SIREN"],
        [formation.etablissement.rna ?? "", "RNA"],
        [formation.etablissement.wikidata ?? "", "Wikidata"],
        [formation.etablissement.idref ?? "", "IDREF"],
        [formation.etablissement.eter ?? "", "ETER"],
        [formation.etablissement.ror ?? "", "ROR"],
        [formation.etablissement.pic ?? "", "PIC"],
        [formation.etablissement.isni ?? "", "ISNI"],
        [formation.etablissement.orgref ?? "", "OrgRef"],
        [formation.etablissement.fundingId ?? "", "Funding ID"],
        [formation.etablissement.scanr ?? "", "ScanR"],
        [formation.etablissement.hal ?? "", "HAL"],
        [formation.etablissement.mooc ?? "", "MOOC"],
    ]);

    let current = $derived(
        formation.statistiques.sort(
            (a: any, b: any) => b.session - a.session,
        )[0],
    );

    const statsLabels = [
        "Capacité de l’établissement par formation",
        "Effectif total des candidats pour une formation",
        "Dont effectif des candidates pour une formation",
        "Effectif total des candidats en phase principale",
        "Dont effectif des candidats ayant postulé en internat",
        "Effectif des candidats néo bacheliers généraux en phase principale",
        "Dont effectif des candidats boursiers néo bacheliers généraux en phase principale",
        "Effectif des candidats néo bacheliers technologiques en phase principale",
        "Dont effectif des candidats boursiers néo bacheliers technologiques en phase principale",
        "Effectif des candidats néo bacheliers professionnels en phase principale",
        "Dont effectif des candidats boursiers néo bacheliers professionnels en phase principale",
        "Effectif des autres candidats en phase principale",
        "Effectif total des candidats en phase complémentaire",
        "Effectif des candidats néo bacheliers généraux en phase complémentaire",
        "Effectif des candidats néo bacheliers technologiques en phase complémentaire",
        "Effectif des candidats néo bacheliers professionnels en phase complémentaire",
        "Effectifs des autres candidats en phase complémentaire",
        "Effectif total des candidats classés par l’établissement en phase principale",
        "Effectif des candidats classés par l’établissement en phase complémentaire",
        "Effectif des candidats classés par l’établissement en internat (CPGE)",
        "Effectif des candidats classés par l’établissement hors internat (CPGE)",
        "Effectif des candidats néo bacheliers généraux classés par l’établissement",
        "Dont effectif des candidats boursiers néo bacheliers généraux classés par l’établissement",
        "Effectif des candidats néo bacheliers technologiques classés par l’établissement",
        "Dont effectif des candidats boursiers néo bacheliers technologiques classés par l’établissement",
        "Effectif des candidats néo bacheliers professionnels classés par l’établissement",
        "Dont effectif des candidats boursiers néo bacheliers professionnels classés par l’établissement",
        "Effectif des autres candidats classés par l’établissement",
        "Effectif total des candidats ayant reçu une proposition d’admission de la part de l’établissement",
        "Effectif des candidats en terminale générale ayant reçu une proposition d’admission de la part de l’établissement",
        "Dont effectif des candidats boursiers en terminale générale ayant reçu une proposition d’admission de la part de l’établissement",
        "Effectif des candidats en terminale technologique ayant reçu une proposition d’admission de la part de l’établissement",
        "Dont effectif des candidats boursiers néo bacheliers technologiques ayant reçu une proposition d’admission de la part de l’établissement",
        "Effectif des candidats en terminale professionnelle ayant reçu une proposition d’admission de la part de l’établissement",
        "Dont effectif des candidats boursiers en terminale générale professionnelle ayant reçu une proposition d’admission de la part de l’établissement",
        "Effectif des autres candidats ayant reçu une proposition d’admission de la part de l’établissement",
        "Effectif total des candidats ayant accepté la proposition de l’établissement (admis)",
        "Dont effectif des candidates admises",
        "Effectif des admis en phase principale",
        "Effectif des admis en phase complémentaire",
        "Dont effectif des admis en internat",
        "Dont effectif des admis boursiers néo bacheliers",
        "Dont effectif des admis ayant reçu leur proposition d’admission à l'ouverture de la procédure principale",
        "Dont effectif des admis ayant reçu leur proposition d’admission avant le baccalauréat",
        "Dont effectif des admis ayant reçu leur proposition d’admission avant la fin de la procédure principale",
        "Effectif des admis néo bacheliers",
        "Effectif des admis néo bacheliers généraux",
        "Effectif des admis néo bacheliers technologiques",
        "Effectif des admis néo bacheliers professionnels",
        "Effectif des autres candidats admis",
        "Dont effectif des admis néo bacheliers sans information sur la mention au bac",
        "Dont effectif des admis néo bacheliers sans mention au bac",
        "Dont effectif des admis néo bacheliers avec mention Assez Bien au bac",
        "Dont effectif des admis néo bacheliers avec mention Bien au bac",
        "Dont effectif des admis néo bacheliers avec mention Très Bien au bac",
        "Dont effectif des admis néo bacheliers avec mention Très Bien avec félicitations au bac",
        "Effectif des admis néo bacheliers généraux ayant eu une mention au bac",
        "Effectif des admis néo bacheliers technologiques ayant eu une mention au bac",
        "Effectif des admis néo bacheliers professionnels ayant eu une mention au bac",
        "Dont effectif des admis issus du même établissement (BTS/CPGE)",
        "Dont effectif des admises issues du même établissement (BTS/CPGE)",
        "Dont effectif des admis issus de la même académie",
        "Dont effectif des admis issus de la même académie (Paris/Créteil/Versailles réunies)",
        "% d’admis dont filles",
        "% d’admis néo bacheliers issus de la même académie",
        "% d’admis néo bacheliers issus de la même académie (Paris/Créteil/Versailles réunies)",
        "% d’admis néo bacheliers issus du même établissement (BTS/CPGE)",
        "% d’admis néo bacheliers boursiers",
        "% d’admis ayant reçu leur proposition d’admission à l'ouverture de la procédure principale",
        "% d’admis ayant reçu leur proposition d’admission avant le baccalauréat",
        "% d’admis ayant reçu leur proposition d’admission avant la fin de la procédure principale",
        "% d’admis néo bacheliers",
        "% d’admis néo bacheliers sans information sur la mention au bac",
        "% d’admis néo bacheliers sans mention au bac",
        "% d’admis néo bacheliers avec mention Assez Bien au bac",
        "% d’admis néo bacheliers avec mention Bien au bac",
        "% d’admis néo bacheliers avec mention Très Bien au bac",
        "% d’admis néo bacheliers avec mention Très Bien avec félicitations au bac",
        "% d’admis néo bacheliers généraux",
        "Dont % d’admis avec mention (BG)",
        "% d’admis néo bacheliers technologiques",
        "Dont % d’admis avec mention (BT)",
        "% d’admis néo bacheliers professionnels",
        "Dont % d’admis avec mention (BP)",
        "Regroupement 1 effectué par les formations pour les classements",
        "Rang du dernier appelé du groupe 1",
        "Regroupement 2 effectué par les formations pour les classements",
        "Rang du dernier appelé du groupe 2",
        "Regroupement 3 effectué par les formations pour les classements",
        "Rang du dernier appelé du groupe 3",
        "Taux d’accès",
        "Part des terminales générales qui étaient en position de recevoir une proposition en phase principale",
        "Part des terminales technologiques qui étaient en position de recevoir une proposition en phase principale",
        "Part des terminales professionnelles qui étaient en position de recevoir une proposition en phase principale",
        "cod_aff_form",
    ];
</script>

<div class="card card-border bg-base-100">
    <div class="card-body">
        <Info>
            Ce tableau liste toutes les informations récupérées par SupRadar sur
            l'établissement et la formation, sans faire le tri.
        </Info>

        <h2 class="card-title">Toutes les informations</h2>

        <!-- Formation -->
        <span class="font-medium">Informations sur la formation.</span>
        <div class="overflow-x-auto">
            <table class="table table-xs table-zebra">
                <thead>
                    <tr>
                        <th>Clé</th>
                        <th>Valeur</th>
                    </tr>
                </thead>
                <tbody>
                    {#each formationKeys as [value, key]}
                        <tr>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <!-- Dernière année -->
        <span class="font-medium">Statistiques de la dernière année.</span>
        <div class="overflow-x-auto">
            <table class="table table-xs table-zebra">
                <thead>
                    <tr>
                        <th>Clé</th>
                        <th>Valeur</th>
                    </tr>
                </thead>
                <tbody>
                    {#each statsLabels as label, index}
                        <tr>
                            <td>{label}</td>
                            <td>{current.stats[index]}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <!-- Établissement -->
        <span class="font-medium">Informations sur l'établissement.</span>
        <div class="overflow-x-auto">
            <table class="table table-xs table-zebra">
                <thead>
                    <tr>
                        <th>Clé</th>
                        <th>Valeur</th>
                    </tr>
                </thead>
                <tbody>
                    {#each etablissementKeys as [value, key]}
                        <tr>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>

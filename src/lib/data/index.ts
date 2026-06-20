import type { Academie, Filiere1, Statut } from "$lib/server/db/schema"
import filiere1 from "./filiere1.json"
import filiere2 from "./filiere2.json"
import filiere3 from "./filiere3.json"
import academies from "./academies.json";
import statut from "./statuts.json";

const defaultFiliere = {
    nom: 'Filière inconnue',
    slug: 'filiere-inconnue',
    code: -1
}

const defaultStatut = {
    code: -1,
    nom: 'Inconnu'
};

const defaultAcademie = {
    code: -1,
    nom: "Inconnue"
}

export const getFiliere = (index: 1 | 2 | 3, value: number): Filiere1 => {
    if (index === 1) {
        // @ts-expect-error
        return filiere1[value] ?? defaultFiliere;
    } else if (index === 2) {
        // @ts-expect-error
        return filiere2[value] ?? defaultFiliere;
    } else {
        // @ts-expect-error
        return filiere3[value] ?? defaultFiliere;
    }
}

export const getStatut = (code: number): Statut => {
    //@ts-expect-error
    return statut[code] ?? defaultStatut;
}

export const getAcademie = (code: number): Academie => {
    //@ts-expect-error
    return academies[code] ?? defaultAcademie;
}
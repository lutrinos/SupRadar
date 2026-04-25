import type { Filiere1 } from "$lib/server/db/schema"
import filiere1 from "./filiere1.json"
import filiere2 from "./filiere2.json"
import filiere3 from "./filiere3.json"

const defaultFiliere = {
    nom: 'Filière inconnue',
    slug: 'filiere-inconnue',
    code: -1
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
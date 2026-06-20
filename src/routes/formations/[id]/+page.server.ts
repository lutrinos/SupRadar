import { db } from '$lib/server/db';

export const load = async ({ params }) => {
    const formations = await db.query.formations.findMany({
        where: (fields, { eq }) => eq(fields.id, parseInt(params.id)),
        with: {
            statistiques: true,
            etablissement: {
                with: {
                    statut: true,
                    region: true,
                    academie: true,
                    departement: true,
                    formations: true
                }
            }
        },
        columns: {
            recherche: false
        }
    });

    const formation = formations[0];

    if (formation?.statistiques) {
        formation.statistiques.sort((a, b) => a.session - b.session);
    }

    return {
        formation
    };
};
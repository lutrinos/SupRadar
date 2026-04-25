import { db } from '$lib/server/db';

export const load = async ({ params }) => {
    const formation = await db.query.formations.findFirst({
        where: (fields, { eq }) => eq(fields.id, parseInt(params.id)),
        with: {
            statistiques: true,
            etablissement: {
                with: {
                    statut: true,
                    region: true,
                    academie: true,
                    departement: true
                }
            }
        },
        columns: {
            recherche: false
        }
    });

    if (formation?.statistiques) {
        formation.statistiques.sort((a, b) => a.session - b.session);
    }

	return {
		formation
	};
};
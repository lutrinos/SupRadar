import { db } from '$lib/server/db/index.js'

export const load = async ({ params }) => {
    let etablissement = await db.query.etablissements.findFirst({
        where: (fields, { eq }) => eq(fields.uai, params.uai),
        with: {
            formations: true,
            departement: true,
            region: true,
            statut: true
        }
    });

    return {
        etablissement
    }
}
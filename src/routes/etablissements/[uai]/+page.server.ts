import { db } from '$lib/server/db/index.js'
import { error } from 'console';

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

    if (!etablissement) {
        return error(404, 'Établissement non trouvé');
    }

    return {
        etablissement
    }
}
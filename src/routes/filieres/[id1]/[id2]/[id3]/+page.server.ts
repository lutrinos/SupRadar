import { db } from '$lib/server/db';
import filieres3 from "$lib/data/filiere3.json";

export const load = async ({ params }) => {
    let filiere3 = Object.values(filieres3).find((f) => f.slug === params.id3);

    if (!filiere3) {
        return { formations: [] };
    }

    const result = await db.query.formations.findMany({
        where(fields, { eq }) {
            return eq(fields.filiere3, filiere3.code);
        }
    });

    return {
        formations: result
    }
}
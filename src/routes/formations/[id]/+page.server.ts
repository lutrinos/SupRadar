import { db } from '$lib/server/db';

export const load = async ({ params }) => {
    /*return {
        formation: {
            "id": 14164,
            "etablissementUai": "0070021K",
            "nom": "Lycée Vincent d'Indy - BTS - Services - Tourisme",
            "selective": true,
            "capacite": 24,
            "recherche": "0070021k lycee vincent d'indy - bts - services - tourisme bts bts - services tourisme lycee vincent d'indy privas grenoble auvergne-rhone-alpes ardeche",
            "filiere1": 4,
            "filiere2": 3,
            "filiere3": 31,
            "detailForma": "Aucun détail",
            "detailForma2": "Aucun détail",
            statistiques: [
                {
                    stats: [0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,]
                }
            ],
            etablissement: {
                statut: {},
                region: {},
                academie: {},
                etablissement: {}
            }
        }
    };

    */

    console.log('id', params.id);

    const formations = await db.query.formations.findMany({
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

    console.log('formations',formations);

    const formation = formations[0];

    if (formation?.statistiques) {
        formation.statistiques.sort((a, b) => a.session - b.session);
    }

    /*formation.etablissement = {};
    formation.statistiques = [];*/

    return {
        formation
    };
};
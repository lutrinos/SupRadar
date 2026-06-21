<svelte:head>
	<title>Sources | SupRadar</title>
	<meta name="description" content="Sources en opendata utilisées pour les informations affichées" />
</svelte:head>

<script lang="ts">
    const data = [
        [
            "Parcoursup 2025",
            "https://data.enseignementsup-recherche.gouv.fr/explore/assets/fr-esr-parcoursup/",
            "24 avril 2026",
        ],
        [
            "Parcoursup 2024",
            "https://data.enseignementsup-recherche.gouv.fr/explore/assets/fr-esr-parcoursup_2024/",
            "24 avril 2026",
        ],
        [
            "Parcoursup 2023",
            "https://data.enseignementsup-recherche.gouv.fr/explore/assets/fr-esr-parcoursup_2023/",
            "25 avril 2026",
        ],
        [
            "Parcoursup 2022",
            "https://data.enseignementsup-recherche.gouv.fr/explore/assets/fr-esr-parcoursup_2022/",
            "25 avril 2026",
        ],
        [
            "Onisep - Idéo-Actions de formation initiale-Univers enseignement supérieur (Licence ODBL)",
            "https://opendata.onisep.fr/data/605344579a7d7/2-ideo-actions-de-formation-initiale-univers-enseignement-superieur.htm?tab=table_696f661015211",
            "25 avril 2026"
        ]
    ];
</script>

<div class="">
    <div class="container mx-auto">
        <div class="prose mb-4">
            <h1>Sources</h1>
        </div>

        <table class="table table-zebra mb-12">
            <thead>
                <tr>
                    <th>Jeu de données</th>
                    <th>Source</th>
                    <th>Date de téléchargement</th>
                </tr>
            </thead>
            <tbody>
                {#each data as row, i (i)}
                    <tr>
                        <td>{row[0]}</td>
                        <td
                            ><a
                                target="_blank"
                                href={row[1]}
                                class="link link-primary">{row[1]}</a
                            ></td
                        >
                        <td>{row[2]}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

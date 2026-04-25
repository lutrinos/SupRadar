<script lang="ts">
    import { IndiceStats } from "$lib";
    import { AreaChart, BarChart } from "layerchart";

    let { formation, current } = $props();
</script>

<div class="card bg-white shadow border border-gray-200">
    <div class="card-body">
        <h2 class="card-title text-primary">Admission</h2>

        <BarChart
            legend
            x="session"
            seriesLayout="group"
            height={300}
            props={{
                xAxis: { format: "none" },
                yAxis: { format: "metric" },
                tooltip: {
                    header: { format: "none" },
                },
                bars: {
                    strokeWidth: 0,
                },
            }}
            series={[
                {
                    key: "voeux",
                    color: "var(--color-blue-400)",
                    label: "Vœux",
                },
                {
                    key: "liste",
                    color: "var(--color-amber-400)",
                    label: "Liste d'appel",
                },
                {
                    key: "rang",
                    color: "var(--color-red-400)",
                    label: "Rang du dernier appelé",
                },
                {
                    key: "prop",
                    color: "var(--color-emerald-400)",
                    label: "Proposition d'admission",
                },
            ]}
            data={formation.statistiques.map((s: any) => {
                return {
                    session: s.session,
                    voeux: s.stats[IndiceStats.voe_tot],
                    liste: s.stats[IndiceStats.nb_cla_PP],
                    prop: s.stats[IndiceStats.Prop_tot],
                    rang: Math.max(
                        s.stats[IndiceStats.ran_grp1],
                        s.stats[IndiceStats.ran_grp2],
                        s.stats[IndiceStats.ran_grp3],
                    ),
                };
            })}
        />

        <div class="prose my-4" style="max-width: 100vw;">
            En {current.session},
            <code>{current.stats[IndiceStats.voe_tot]}</code> candidats ont
            confirmé un vœux. Il y eu ensuite
            <code>{current.stats[IndiceStats.nb_cla_PP]}</code>
            candidats en liste d'appel, parmi lesquel
            <code>{current.stats[IndiceStats.Prop_tot]}</code> ont reçu une
            proposition d'admission. Cette année, le rang du dernier appelé était <code>{Math.max(
                current.stats[IndiceStats.ran_grp1],
                current.stats[IndiceStats.ran_grp2],
                current.stats[IndiceStats.ran_grp3],
            )}</code>.
        </div>

        <h1 class="card-title text-primary">Vitesse de remplissage</h1>
        <BarChart
            height={300}
            seriesLayout="overlap"
            orientation="horizontal"
            y="session"
            props={{
                yAxis: {
                    format: 'none'
                },
                xAxis: {
                    format: 'none'
                },
                tooltip: {
                    header: {
                        format: 'none'
                    },
                    hideTotal: true
                },
                bars: {
                    strokeWidth: 0
                }
            }}
            series={[
                {
                    label: 'Clôture',
                    key: 'fin',
                    color: 'var(--color-red-400)'
                },
                {
                    label: 'Fin phase principale',
                    color: 'var(--color-amber-400)',
                    key: 'fin_pp'
                },
                {
                    label: 'Ouverture phase complémentaire',
                    key: 'ouv_pc',
                    color: 'var(--color-emerald-400)'
                },
                {
                    key: 'deb',
                    color: 'var(--color-blue-400)',
                    label: 'Début'
                },
            ]}
            data={
                formation.statistiques.map((s: any) => {
                    return {
                        session: s.session,
                        deb: s.stats[IndiceStats.pct_acc_debutpp],
                        ouv_pc: s.stats[IndiceStats.pct_acc_datebac],
                        fin_pp: s.stats[IndiceStats.pct_acc_finpp],
                        fin: 100
                    };
                })
            }
        />

        <div class="prose my-4" style="max-width: none">
            En {current.session}, <code>{current.stats[IndiceStats.pct_acc_debutpp]}%</code> des candidats admis ont reçu leur proposition au début de la procédure. Puis <code>{current.stats[IndiceStats.pct_acc_datebac]}%</code> l'avaient reçue avant l'ouverture de la phase complémentaire, et <code>{current.stats[IndiceStats.pct_acc_finpp]}%</code> avant la fin de la procédure principale.
        </div>
    </div>
</div>

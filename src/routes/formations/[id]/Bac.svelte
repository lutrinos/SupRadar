<script lang="ts">
    import { BarChart, defaultChartPadding } from "layerchart";
    import { IndiceStats } from "$lib";

    let { formation } = $props();
</script>

<div class="card-body">
    <h2 class="card-title mb-4 text-emerald-600">Baccalauréat</h2>

    <h3 class="font-medium">Résultats au baccalauréat des élèves admis</h3>
    <BarChart
        x="year"
        data={formation.statistiques.map((s: any) => {
            return {
                year: s.session,
                rien: s.stats[IndiceStats.Acc_mention_nonrenseig_nee] ?? 0,
                pas: s.stats[IndiceStats.Acc_sansmention],
                bien: s.stats[IndiceStats.Acc_ab],
                assezbien: s.stats[IndiceStats.Acc_b],
                tresbien: s.stats[IndiceStats.Acc_tb],
                felicitation: s.stats[IndiceStats.Acc_tbf],
            };
        })}
        height={200}
        props={{
            xAxis: {
                format: "none",
            },
            tooltip: {
                header: {
                    format: "none",
                },
            },
            bars: {
                strokeWidth: 0,
            },
        }}
        seriesLayout="stackExpand"
        legend
        series={[
            {
                key: "rien",
                label: "Pas d'informations",
                color: "var(--color-slate-200)",
            },
            {
                key: "pas",
                label: "Pas de mention",
                color: "var(--color-blue-400)",
            },
            {
                key: "bien",
                label: "Bien",
                color: "var(--color-emerald-400)",
            },
            {
                key: "assezbien",
                label: "Assez bien",
                color: "var(--color-amber-400)",
            },
            {
                key: "tresbien",
                label: "Très bien",
                color: "var(--color-purple-400)",
            },
            {
                key: "felicitation",
                label: "Félicitations du jury",
                color: "var(--color-red-400)",
            },
        ]}
    />
</div>

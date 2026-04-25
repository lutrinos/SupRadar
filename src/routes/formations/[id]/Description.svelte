<script lang="ts">
    import { BarChart, defaultChartPadding } from "layerchart";
    import { IndiceStats } from "$lib";

    let { formation } = $props();
</script>

<div class="card bg-white shadow mb-6 border border-gray-200">
    <div class="card-body">
        <h2 class="card-title mb-4 text-primary">Description</h2>
        <p class="mb-4">
            <BarChart
                x="year"
                data={formation.statistiques.map((s: any) => {
                    return {
                        year: s.session,
                        gen: s.stats[IndiceStats.Acc_BG],
                        tec: s.stats[IndiceStats.Acc_BT],
                        pro: s.stats[IndiceStats.Acc_BP],
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
                        key: "gen",
                        label: "Général",
                        color: "var(--color-blue-400)",
                    },
                    {
                        key: "tec",
                        label: "Technologique",
                        color: "var(--color-emerald-400)",
                    },
                    {
                        key: "pro",
                        label: "Professionnelle",
                        color: "var(--color-amber-400)",
                    },
                ]}
            />

            
        </p>
    </div>
</div>

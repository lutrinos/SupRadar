<script lang="ts">
    import { BarChart, defaultChartPadding } from "layerchart";
    import { IndiceStats } from "$lib";

    let { formation, current } = $props();
</script>

<section class="space-y-6">
    <h2 class="text-2xl font-semibold text-primary">Baccalauréat</h2>
    <BarChart
        x="year"
        data={formation.statistiques.map((s: any) => {
            return {
                year: s.session,
                gen: s.stats[IndiceStats.Acc_BG],
                tec: s.stats[IndiceStats.Acc_BT],
                pro: s.stats[IndiceStats.Acc_BP],
                autre: s.stats[IndiceStats.Acc_at]
            };
        })}
        height={300}
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
            {
                key: "autre",
                label: 'Autre',
                color: 'var(--color-yellow-400)'
            }
        ]}
    />

    <div class="prose my-4" style="max-width: none;">
        En {current.session}, {@html [
            [current.stats[IndiceStats.Acc_BG], 'général'],
            [current.stats[IndiceStats.Acc_BT],'technologique'],
            [current.stats[IndiceStats.Acc_BP],'professionnel'],
        ].filter(([n, _]) => n > 0).map(([n, b]) => `<code>${n}</code> candidats admis ont passé un bac ${b}`).join(', ') }
        {@html current.stats[IndiceStats.Acc_at] > 0 ? `, et <code>${current.stats[IndiceStats.Acc_at]}</code> candidats admis n'étaient pas des néo-bacheliers ou n'ont pas passé le baccalauréat français.` : '.' }
    </div>

    <h2 class="card-title text-primary">Baccalauréat</h2>

    <BarChart
        x="year"
        data={formation.statistiques.map((s: any) => {
            return {
                year: s.session,
                rien: s.stats[IndiceStats.Acc_mention_nonrenseig_nee],
                pas: s.stats[IndiceStats.Acc_sansmention],
                bien: s.stats[IndiceStats.Acc_ab],
                assezbien: s.stats[IndiceStats.Acc_b],
                tresbien: s.stats[IndiceStats.Acc_tb],
                felicitation: s.stats[IndiceStats.Acc_tbf],
            };
        })}
        height={300}
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
                label: "Félicitations",
                color: "var(--color-red-400)",
            },
        ]}
    />

    <div class="prose mt-4" style="max-width: none;">
         En {current.session}, {@html [
            [current.stats[IndiceStats.Acc_tbf], 'ont eu les félicitations du jury'],
            [current.stats[IndiceStats.Acc_tb], 'ont eu une mention très bien'],
            [current.stats[IndiceStats.Acc_ab],'ont eu une mention assez bien'],
            [current.stats[IndiceStats.Acc_b],'ont eu une mention bien'],
            [current.stats[IndiceStats.Acc_sansmention], 'n\'ont pas eu de mention']
        ].filter(([n, _]) => n > 0).map(([n, b]) => `<code>${n}</code> candidats admis ${b}`).join(', ') }.
    </div>
</section>

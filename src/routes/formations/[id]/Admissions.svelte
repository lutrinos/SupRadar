<script lang="ts">
    import { IndiceStats } from "$lib";
    import { AreaChart, BarChart } from "layerchart";

    let Bac = {
        Tout: 0,
        General: 1,
        Technologique: 2,
        Professionnel: 3,
    };

    let BacOptions = [
        "Tous types de bac",
        "Bac général",
        "Bac technologique",
        "Bac professionnel",
    ];

    let percent = (v: number) => v + "%";

    let bac = $state(Bac.Tout);
    let boursier = $state(false);

    let { formation, current } = $props();

    // nombre candidats en phase principal
    let voeux = (stats: number[]) => {
        if (boursier) {
            switch (bac) {
                case Bac.Tout:
                    return (
                        stats[IndiceStats.nb_VOE_PP_BG_brs] +
                        stats[IndiceStats.nb_VOE_PP_BT_brs] +
                        stats[IndiceStats.nb_VOE_PP_BP_brs]
                    );
                case Bac.General:
                    return stats[IndiceStats.nb_VOE_PP_BG_brs];
                case Bac.Technologique:
                    return stats[IndiceStats.nb_VOE_PP_BT_brs];
                case Bac.Professionnel:
                    return stats[IndiceStats.nb_VOE_PP_BP_brs];
            }
        }

        switch (bac) {
            case Bac.Tout:
                return stats[IndiceStats.voe_tot];
            case Bac.General:
                return stats[IndiceStats.nb_VOE_PP_BG];
            case Bac.Technologique:
                console.log(stats[IndiceStats.nb_VOE_PP_BT]);
                return stats[IndiceStats.nb_VOE_PP_BT];
            case Bac.Professionnel:
                return stats[IndiceStats.nb_VOE_PP_BP];
        }
    };

    // nombre candidats en liste d'appel
    let liste = (stats: number[]) => {
        if (boursier) {
            switch (bac) {
                case Bac.Tout:
                    return (
                        stats[IndiceStats.nb_cla_pp_BG_brs] +
                        stats[IndiceStats.nb_cla_pp_BT_brs] +
                        stats[IndiceStats.nb_cla_pp_BP_brs]
                    );
                case Bac.General:
                    return stats[IndiceStats.nb_cla_pp_BG_brs];
                case Bac.Technologique:
                    return stats[IndiceStats.nb_cla_pp_BT_brs];
                case Bac.Professionnel:
                    return stats[IndiceStats.nb_cla_pp_BP_brs];
            }
        }

        switch (bac) {
            case Bac.Tout:
                return stats[IndiceStats.nb_cla_PP];
            case Bac.General:
                return stats[IndiceStats.nb_cla_pp_BG];
            case Bac.Technologique:
                return stats[IndiceStats.nb_cla_pp_BT];
            case Bac.Professionnel:
                return stats[IndiceStats.nb_cla_pp_BP];
        }
    };

    let proposition = (stats: number[]) => {
        if (boursier) {
            switch (bac) {
                case Bac.Tout:
                    return (
                        stats[IndiceStats.prop_tot_BG_brs] +
                        stats[IndiceStats.prop_tot_BT_brs] +
                        stats[IndiceStats.prop_tot_BP_brs]
                    );
                case Bac.General:
                    return stats[IndiceStats.prop_tot_BG_brs];
                case Bac.Technologique:
                    return stats[IndiceStats.prop_tot_BT_brs];
                case Bac.Professionnel:
                    return stats[IndiceStats.prop_tot_BP_brs];
            }
        }

        switch (bac) {
            case Bac.Tout:
                return stats[IndiceStats.Prop_tot];
            case Bac.General:
                return stats[IndiceStats.prop_tot_BG];
            case Bac.Technologique:
                return stats[IndiceStats.prop_tot_BT];
            case Bac.Professionnel:
                return stats[IndiceStats.prop_tot_BP];
        }
    };
</script>

<section class="space-y-6">
    <!-- Informations plus précises -->
    <div class="mb-8 flex flex-col md:flex-row gap-4">
        <fieldset
            class="fieldset border-base-300 rounded-box flex-1 border p-4"
        >
            <legend class="fieldset-legend px-4">Baccalauréat</legend>
            {#each BacOptions as option, index}
                <div class="form-control">
                    <label class="label cursor-pointer justify-between gap-4">
                        <input
                            type="radio"
                            name="bac"
                            id={"bac-" + index}
                            value={index}
                            bind:group={bac}
                            class="radio radio-primary radio-sm"
                        />
                        <span class="label-text">{option}</span>
                    </label>
                </div>
            {/each}
        </fieldset>

        <fieldset
            class="fieldset border-base-300 rounded-box flex-1 border p-4"
        >
            <legend class="fieldset-legend px-4">Boursier</legend>
            <label class="label">
                <input
                    type="checkbox"
                    bind:checked={boursier}
                    class="toggle toggle-primary"
                /> Boursiers seulement
            </label>
        </fieldset>
    </div>

    {#if bac !== Bac.Tout || boursier}
        <div role="alert" class="alert alert-info alert-soft">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-6 w-6 shrink-0 stroke-current"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
            <span>
                Dans cette configuration, les statistiques affichées correspondent aux candidats
                néo-bacheliers.
            </span>
        </div>
    {/if}

    <!-- Admissions -->
    <h2 class="text-2xl font-semibold text-primary">Admissions</h2>
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
                key: "prop",
                color: "var(--color-emerald-400)",
                label: "Proposition d'admission",
            },
            {
                key: "rang",
                color: "var(--color-red-400)",
                label: "Rang du dernier appelé",
            },
        ]}
        data={formation.statistiques.map((s: any) => {
            return {
                session: s.session,
                voeux: voeux(s.stats),
                liste: liste(s.stats),
                prop: proposition(s.stats),
                rang:
                    bac === Bac.Tout && !boursier
                        ? Math.max(
                              s.stats[IndiceStats.ran_grp1],
                              s.stats[IndiceStats.ran_grp2],
                              s.stats[IndiceStats.ran_grp3],
                          )
                        : "Inconnu",
            };
        })}
    />

    <div class="prose my-4" style="max-width: 100vw;">
        En {current.session},
        <code>{current.stats[IndiceStats.voe_tot]}</code> candidats ont confirmé
        un vœux. Il y eu ensuite
        <code>{current.stats[IndiceStats.nb_cla_PP]}</code>
        candidats en liste d'appel, parmi lesquel
        <code>{current.stats[IndiceStats.Prop_tot]}</code> ont reçu une
        proposition d'admission. Cette année, le rang du dernier appelé était
        <code
            >{Math.max(
                current.stats[IndiceStats.ran_grp1],
                current.stats[IndiceStats.ran_grp2],
                current.stats[IndiceStats.ran_grp3],
            )}</code
        >.
    </div>

    <!-- Vitesse de remplissage -->
    <h2 class="text-2xl font-semibold text-primary">Vitesse de remplissage</h2>
    <BarChart
        height={300}
        seriesLayout="overlap"
        orientation="horizontal"
        y="session"
        props={{
            yAxis: {
                format: "none",
            },
            xAxis: {
                format: percent,
            },
            tooltip: {
                header: {
                    format: "none",
                },
                item: {
                    format: percent,
                },
                hideTotal: true,
            },
            bars: {
                strokeWidth: 0,
            },
        }}
        series={[
            {
                label: "Clôture",
                key: "fin",
                color: "var(--color-red-400)",
            },
            {
                label: "Fin phase principale",
                color: "var(--color-amber-400)",
                key: "fin_pp",
            },
            {
                label: "Ouverture phase complémentaire",
                key: "ouv_pc",
                color: "var(--color-emerald-400)",
            },
            {
                key: "deb",
                color: "var(--color-blue-400)",
                label: "Début",
            },
        ]}
        data={formation.statistiques.map((s: any) => {
            return {
                session: s.session,
                deb: s.stats[IndiceStats.pct_acc_debutpp],
                ouv_pc: s.stats[IndiceStats.pct_acc_datebac],
                fin_pp: s.stats[IndiceStats.pct_acc_finpp],
                fin: 100,
            };
        })}
    />

    <div class="prose my-4" style="max-width: none">
        En {current.session},
        <code>{current.stats[IndiceStats.pct_acc_debutpp]}%</code>
        des candidats admis ont reçu leur proposition au début de la procédure. Puis
        <code>{current.stats[IndiceStats.pct_acc_datebac]}%</code>
        l'avaient reçue avant l'ouverture de la phase complémentaire, et
        <code>{current.stats[IndiceStats.pct_acc_finpp]}%</code> avant la fin de
        la procédure principale.
    </div>



    <!-- Origine géographique -->
    <h2 class="text-2xl font-semibold text-primary">Origine géographique</h2>
    <AreaChart
        legend
        x="session"
        seriesLayout="overlap"
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
                key: "admis",
                color: "var(--color-blue-400)",
                label: "Effectif d'admis",
            },
            {
                key: "academie",
                color: "var(--color-amber-400)",
                label: "De la même académie",
            },
            {
                key: "etablissement",
                color: "var(--color-emerald-400)",
                label: "Du même établissement",
            },
        ]}
        data={formation.statistiques.map((s: any) => {
            return {
                session: s.session,
                admis: s.stats[IndiceStats.Acc_tot],
                academie: s.stats[IndiceStats.Acc_aca_orig],
                etablissement: s.stats[IndiceStats.Acc_term],
            };
        })}
    />

    <div class="prose my-4" style="max-width: 100vw;">
        En {current.session},
        <code>{current.stats[IndiceStats.Acc_aca_orig]}</code> admis venaient de la même académie que l'établissement, et
        <code>{current.stats[IndiceStats.Acc_term]}</code> venaient du même établissement.
    </div>

    <!-- Parité -->
    <h2 class="text-2xl font-semibold text-primary">Parité</h2>

    <AreaChart
        height={300}
        x="session"
        seriesLayout="stack"
        legend
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
                label: "Candidats",
                color: "var(--color-emerald-400)",
                key: "candidats",
            },
            {
                label: "Candidates",
                color:"var(--color-amber-400)",
                key: "candidates",
            }
        ]}
        data={
            formation.statistiques.map((s: any) => {
                return {
                    session: s.session,
                    candidates: s.stats[IndiceStats.voe_tot_f],
                    candidats: s.stats[IndiceStats.voe_tot] - s.stats[IndiceStats.voe_tot_f],
                };
            })
        }
    />
    
    <AreaChart
        legend
        height={300}
        seriesLayout="stack"
        x="session"
        props={{
            yAxis: {
                format: "metric",
            },
            xAxis: {
                format: "none",
            },
            tooltip: {
                header: {
                    format: "none",
                },
                hideTotal: true,
            },
            bars: {
                strokeWidth: 0,
            },
        }}
        series={[
            {
                label: "Admis",
                key: "boy",
                color: "var(--color-emerald-400)",
            },
            {
                label: "Admises",
                color: "var(--color-amber-400)",
                key: "girl",
            },
        ]}
        data={formation.statistiques.map((s: any) => {
            return {
                session: s.session,
                girl: s.stats[IndiceStats.Acc_tot_f],
                boy: s.stats[IndiceStats.Acc_tot] - s.stats[IndiceStats.Acc_tot_f],
            };
        })}
    />

    <div class="prose my-4" style="max-width: none">
        En {current.session}, <code>{current.stats[IndiceStats.pct_f]}%</code>
        des candidats admis étaient des filles, et
        <code>{100 - current.stats[IndiceStats.pct_f]}%</code> des garçons. <br>
    </div>
</section>

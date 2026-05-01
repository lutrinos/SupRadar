<script lang="ts">
	import Selective from "$lib/components/Selective.svelte";
	import Statut from "$lib/components/Statut.svelte";
	import { IndiceStats } from "$lib";

    let { formation, current } = $props();
</script>

<div class="card bg-base-100 mb-8">
    <div class="card-body">
        <div class="mb-4">
            <Selective selective={formation.selective} />
            <Statut statut={formation.etablissement.statut?.nom} />
        </div>
        <h1 class="card-title text-4xl mb-4 text-primary">
            {formation.nom}
        </h1>
        <div class="stats">
            <div class="stat">
                <div class="stat-title">Commune</div>
                <div class="stat-value">
                    {formation.etablissement.commune}
                </div>
                <div class="stat-desc">
                    Académie de { formation.etablissement.academie.nom }
                </div>
            </div>
            <div class="stat">
                <p class="stat-title">Capacité</p>
                <p class="stat-value">
                    {formation.capacite} places
                </p>
                <p class="stat-desc">Et { current.stats[IndiceStats.Acc_tot] } étudiants admis</p>
            </div>
            <div class="stat">
                <p class="stat-title">Taux d'accès</p>
                <p class="stat-value">
                    {current?.stats[IndiceStats.Taux_acces_ens] ?? ""}%
                </p>
                <p class="stat-desc">Et {current?.stats[IndiceStats.nb_cla_PP]} candidats classés parmi {current?.stats[IndiceStats.voe_tot]}</p>
            </div>
        </div>
    </div>
</div>

<script lang="ts">
    import Selective from "$lib/components/Selective.svelte";
    import Statut from "$lib/components/Statut.svelte";
    import Info from "$lib/components/Info.svelte";
    import { IndiceStats } from "$lib";

    let { formation, current } = $props();
</script>

<div class="card bg-base-100 mb-8">
    <div class="card-body">
        <Info>
            <p>
                Une formation est <strong>sélective</strong> si elle peut refuser des candidats, même s'il reste des places vacantes.
            </p>
            <p>
                La <strong>capacité</strong> de la formation est le nombre de places
                ouvertes lors de la dernière procédure Parcoursup.
            </p>

            <p>
                Le <strong>taux d'accès</strong> correspond au rapport entre le
                nombre de candidats dont le rang de classement est inférieur ou
                égal au rang du dernier appelé de son groupe et le nombre de
                candidats ayant validé un vœu pour la formation étudiée en phase
                principale. <br />Si le taux est de 100%, cela signifie qu’aucun
                candidat n’était en attente de proposition dans cette formation
                à la fin de la phase principale (avant la procédure de Gestion
                Des Désistements).
            </p>
        </Info>
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
                    Académie de {formation.etablissement.academie.nom}
                </div>
            </div>
            <div class="stat">
                <p class="stat-title">Capacité</p>
                <p class="stat-value">
                    {formation.capacite} places
                </p>
                <p class="stat-desc">
                    Et {current.stats[IndiceStats.Acc_tot]} étudiants admis
                </p>
            </div>
            <div class="stat">
                <p class="stat-title">Taux d'accès</p>
                <p class="stat-value">
                    {current?.stats[IndiceStats.Taux_acces_ens] ?? ""}%
                </p>
                <p class="stat-desc">
                    Et {current?.stats[IndiceStats.nb_cla_PP]} candidats classés
                    parmi {current?.stats[IndiceStats.voe_tot]}
                </p>
            </div>
        </div>
    </div>
</div>

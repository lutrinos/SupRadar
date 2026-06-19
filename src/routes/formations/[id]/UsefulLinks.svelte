<script lang="ts">
    import { getFiliere } from "$lib/data";
    import Info from "$components/Info.svelte";

    let { formation } = $props();
</script>

<div class="card card-border bg-base-100 mb-8">
    <div class="card-body">
        <Info>
            Cet encart propose des liens redirigeant vers des informations officielles et des ressources complémentaires.
        </Info>
        <h2 class="card-title">Liens utiles</h2>
        <ul class="list">
            <li class="list-row">
                <a
                    class="link link-primary"
                    href={`https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=${formation.id}&typeBac=0&originePc=0`}
                    >Fiche Parcoursup</a
                >
            </li>
            <li class="list-row">
                <a
                    class="link link-primary"
                    href={`/etablissements/${formation.etablissementUai}`}
                    >Fiche SupRadar de l'établissement</a
                >
            </li>
            <li class="list-row">
                <a
                    href={`/filieres/${getFiliere(1, formation.filiere1).slug}/${getFiliere(2, formation.filiere2).slug}/${getFiliere(3, formation.filiere3).slug}`}
                    class="link link-primary"
                    >Voir les établissements proposant la même formation</a
                >
            </li>
        </ul>
    </div>
</div>

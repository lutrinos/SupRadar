<script lang="ts">
    import { getFiliere } from "$lib/data/index.js";

    let { formation } = $props();
</script>

<div class="breadcrumbs">
    <ul>
        <li>
            <a
                href={`/filieres/${getFiliere(1, formation.filiere1).slug}`}
                class="link link-hover"
                >{getFiliere(1, formation.filiere1).nom}</a
            >
        </li>
        <li>
            <a
                href={`/filieres/${getFiliere(1, formation.filiere1).slug}/${getFiliere(2, formation.filiere2).slug}`}
                class="link link-hover"
                >{getFiliere(2, formation.filiere2).nom}</a
            >
        </li>
        <li>
            <a
                href={`/filieres/${getFiliere(1, formation.filiere1).slug}/${getFiliere(2, formation.filiere2).slug}/${getFiliere(2, formation.filiere3).slug}`}
                class="link link-hover"
                >{getFiliere(3, formation.filiere3).nom}</a
            >
        </li>
    </ul>
</div>

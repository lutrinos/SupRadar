<script lang="ts">
    import { getFiliere } from "$lib/data/index.js";

    let { formation } = $props();
</script>

<div class="breadcrumbs">
    <ul>
        <li>
            <a href="/filieres" class="link link-hover"
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="h-4 w-4 stroke-current"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    ></path>
                </svg>Filières</a
            >
        </li>
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
                href={`/filieres/${getFiliere(1, formation.filiere1).slug}/${getFiliere(2, formation.filiere2).slug}/${getFiliere(3, formation.filiere3).slug}`}
                class="link link-hover"
                >{getFiliere(3, formation.filiere3).nom}</a
            >
        </li>
    </ul>
</div>

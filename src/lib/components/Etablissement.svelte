<script lang="ts">
    import { getFiliere, getStatut } from "$lib/data";
    import Selective from "./Selective.svelte";
    import Statut from "./Statut.svelte";

    let { etablissement } = $props();
</script>

<a
    href={`/etablissements/${etablissement.uai}`}
    class="card bg-base-100 border-2 border-base-300 hover:border-primary hover:bg-primary-content transition"
>
    <div class="card-body">
        <h2 class="card-title">{etablissement.nom}</h2>

        <ul class="mt-2 flex flex-col gap-2 text-xs">
            <li>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4 me-2 inline-block text-content"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                </svg>

                <span class="text-content">{etablissement.formationsCount} formation{etablissement.formationsCount !== 1 ? "s" : ""}</span>
            </li>
            <li>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4 me-2 inline-block text-content"
                    fill="none"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                </svg>

                <span class="text-content">{etablissement.commune}</span>
            </li>
        </ul>

        <div class="card-actions flex-1 justify-end items-end mt-4">
            <Statut statut={getStatut(etablissement.statutCode ?? -1).nom} />
        </div>
    </div>
</a>

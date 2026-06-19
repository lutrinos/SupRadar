<script lang="ts">
    import filieres1 from "$lib/data/filiere1.json";
    import filieres2 from "$lib/data/filiere2.json";

    let { params } = $props();

    let isValid = (filiere2: any) => {
        // @ts-ignore
        return filieres1[filiere2.parent.toString()]?.slug === params.id1;
    };

    let filiere1 = $derived(
        Object.values(filieres1).find((f) => f.slug === params.id1),
    );
</script>

<div class="flex justify-center min-h-screen bg-base-100 py-12">
    <div class="container">
        <div class="mb-6">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Filières</h1>
            <p class="text-lg text-base-content/70">
                Parcourez les grandes catégories de formations.
            </p>
        </div>

        <div class="breadcrumbs mb-12">
            <ul>
                <li>
                    <a href="/filieres"
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
                    <a href={`/filieres/${filiere1?.slug}`}>{filiere1?.nom}</a>
                </li>
            </ul>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each Object.values(filieres2) as f}
                {#if isValid(f)}
                    <a
                        href={`/filieres/${params.id1}/${f.slug}`}
                        class="card bg-base-100 border-2 border-base-300 hover:border-primary hover:bg-primary-content transition"
                    >
                        <div class="card-body">
                            <h2 class="card-title">{f.nom}</h2>
                        </div>
                    </a>
                {/if}
            {/each}
        </div>
    </div>
</div>

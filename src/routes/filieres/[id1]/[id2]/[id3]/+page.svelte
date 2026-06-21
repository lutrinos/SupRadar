<script lang="ts">
    import fuzzysort from "fuzzysort";
    import Formation from "$components/Formation.svelte";

    import filieres1 from "$lib/data/filiere1.json";
    import filieres2 from "$lib/data/filiere2.json";
    import filieres3 from "$lib/data/filiere3.json";

    let { params, data } = $props();

    let filiere1 = $derived(
        Object.values(filieres1).find((f) => f.slug === params.id1),
    );
    let filiere2 = $derived(
        Object.values(filieres2).find((f) => f.slug === params.id2),
    );
    let filiere3 = $derived(
        Object.values(filieres3).find((f) => f.slug === params.id3),
    );

    let query = $state("");
</script>

<svelte:head>
	<title>{filiere3?.nom ?? "Filières"} | SupRadar</title>
	<meta name="description" content={`Découvrez les formations de la filière ${filiere3?.nom}`} />
</svelte:head>

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
                    <a href="/filieres">
                        <svg
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
                <li><a href={`/filieres/${params.id1}`}>{filiere1?.nom}</a></li>
                <li>
                    <a href={`/filieres/${params.id1}/${params.id2}`}
                        >{filiere2?.nom}</a
                    >
                </li>
                <li>
                    <a
                        href={`/filieres/${params.id1}/${params.id2}/${params.id3}`}
                    >
                        {filiere3?.nom}
                    </a>
                </li>
            </ul>
        </div>

        <!-- Filtres -->
        <div class="mb-6 flex justify-center md:flex-row gap-4">
            <label class="input input-primary">
                <svg
                    class="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    bind:value={query}
                    type="search"
                    placeholder="Filtrer les formations..."
                />
            </label>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#if query.trim().length === 0}
                {#each data.formations as formation (formation.id)}
                    <Formation {formation} />
                {/each}
            {:else}
                {#each fuzzysort.go(query, data.formations, {
                    keys: ["nom", "commune"],
                    //threshold: -10000,
                }) as result (result.obj.id)}
                    <Formation formation={result.obj} />
                {/each}
            {/if}
        </div>
    </div>
</div>

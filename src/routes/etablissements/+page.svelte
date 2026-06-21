<script lang="ts">
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import { getStatut } from "$lib/data";
	import Etablissement from "$components/Etablissement.svelte";

	let { data } = $props();

	let query = $state(page.url.searchParams.get("q") ?? "");
	let currentPage = $state(
		parseInt(page.url.searchParams.get("p") ?? "0") || 0,
	);

	$effect(() => {
		const q = query;
		const p = currentPage;

		const timer = setTimeout(() => {
			const url = new URL(page.url);

			if (q) url.searchParams.set("q", q);
			else url.searchParams.delete("q");

			if (p > 0) url.searchParams.set("p", p.toString());
			else url.searchParams.delete("p");

			goto(url, { replaceState: true, keepFocus: true, noScroll: true });
		}, 500);

		return () => clearTimeout(timer);
	});
</script>

<svelte:head>
	<title>Rechercher un établissement | SupRadar</title>
	<meta name="description" content="Rechercher un établissement sur Parcoursup" />
</svelte:head>

<div class="min-h-screen py-12">
	<div class="container mx-auto px-4">
		<!-- Header -->
		<div class="mb-12">
			<h1 class="text-4xl md:text-5xl font-bold mb-4 text-primary">
				Établissements
			</h1>
			<p class="text-lg text-gray-600">
				Découvrez et explorez les établissements présents sur
				Parcoursup.
			</p>
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
					placeholder="Rechercher un établissement..."
				/>
			</label>
		</div>

		<!-- Table -->
		{#if data.etablissements.length > 0}
			<div class="m-4 text-base-content text-sm">{data.total} résultats sur {data.pageCount} pages</div>
		{/if}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.etablissements as etablissement (etablissement.uai)}
				<Etablissement {etablissement} />
			{/each}
		</div>

		{#if data.pageCount && data.pageCount > 1}
			<div class="mt-6 flex justify-center">
				<div class="join">
					<button
						onclick={() => {
							currentPage = Math.max(0, currentPage - 1);
						}}
						disabled={data.currentPage === 0}
						class="join-item btn">«</button
					>
					<button class="join-item btn"
						>Page {data.currentPage + 1} sur {data.pageCount}</button
					>
					<button
						onclick={() => {
							currentPage = Math.min(
								data.pageCount - 1,
								currentPage + 1,
							);
						}}
						disabled={data.currentPage === data.pageCount - 1}
						class="join-item btn">»</button
					>
				</div>
			</div>
		{/if}

		<!-- Aucun résultat trouvé -->
		{#if data.etablissements.length === 0}
			<div class="mt-8 text-center text-gray-500">
				{query.trim().length === 0
					? "Effectuer une recherche"
					: "Aucun établissement trouvé."}
			</div>
		{/if}
	</div>
</div>

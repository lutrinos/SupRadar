<script lang="ts">
	import { page } from "$app/state";
	import { navigating } from "$app/state";
	import { goto } from "$app/navigation";
	import Selective from "$components/Selective.svelte";
	import Formation from "$components/Formation.svelte";

	let { data } = $props();
	let query = $state(page.url.searchParams.get("q") ?? "");
	let currentPage = $state(parseInt(page.url.searchParams.get("p") ?? "0") || 0);

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

<div class="flex justify-center min-h-screen bg-base-100 py-12">
	<div class="container">
		<!-- Header -->
		<div class="mb-6">
			<h1 class="text-4xl md:text-5xl font-bold mb-4">Formations</h1>
			<p class="text-lg text-base-content/70">
				Explorez l'ensemble des formations proposées par les
				établissements
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
					placeholder="Rechercher une formation..."
				/>
			</label>
		</div>

		<!-- Formations Grid -->
		{#if navigating && navigating.to?.url.searchParams.get("q") !== navigating.from?.url.searchParams.get("q")}
			<div class="text-center py-32">
				<span class="loading loading-spinner loading-xl text-primary"
				></span>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each data.formations as formation (formation.id)}
					<Formation {formation} />
				{/each}
			</div>

			{#if data.pageCount && data.pageCount > 1}
				<div class="mt-6 flex justify-center">
					<div class="join">
						<button onclick={() => {
							currentPage = Math.max(0, currentPage - 1);
						}} disabled={data.currentPage === 0} class="join-item btn">«</button>
						<button class="join-item btn">Page { data.currentPage + 1} sur { data.pageCount }</button>
						<button onclick={() => {
							currentPage = Math.min(data.pageCount - 1, currentPage + 1);
						}} disabled={data.currentPage === data.pageCount - 1} class="join-item btn">»</button>
					</div>
				</div>
			{/if}
		{/if}
	</div>
</div>

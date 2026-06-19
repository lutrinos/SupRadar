<script lang="ts">
	import { page } from "$app/state";
	import { navigating } from "$app/state";
	import { goto } from "$app/navigation";
	import Selective from "$components/Selective.svelte";

	let { data } = $props();
	let query = $state(page.url.searchParams.get("q") ?? "");
	let p = $state(parseInt(page.url.searchParams.get("p") ?? "0") || 0);

	$effect(() => {
		const q = query;

		const timer = setTimeout(() => {
			const url = new URL(page.url);
			if (q) url.searchParams.set("q", q);
			else url.searchParams.delete("q");

			goto(url, { replaceState: true, keepFocus: true, noScroll: true });
		}, 500);

		return () => clearTimeout(timer);
	});

	$inspect(p).with(console.log)
</script>

<div class="min-h-screen bg-base-100 py-12">
	<div class="container">
		<!-- Header -->
		<div class="mb-12">
			<h1 class="text-4xl md:text-5xl font-bold mb-4">Formations</h1>
			<p class="text-lg text-base-content/70">
				Explorez l'ensemble des formations proposées par les
				établissements
			</p>
		</div>

		<!-- Filters -->
		<div class="mb-8 flex flex-col md:flex-row gap-4">
			<input
				bind:value={query}
				type="search"
				placeholder="Rechercher une formation..."
				class="input flex-1"
			/>

			<!--<select class="select select-bordered">
				<option disabled selected>Filtrer par type</option>
				<option>Générale</option>
				<option>Technologique</option>
				<option>Professionnelle</option>
			</select>-->
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
					<a
						href={`/formations/${formation.id}`}
						class="card bg-white shadow-lg hover:shadow-xl transition"
					>
						<div class="card-body">
							<Selective selective={formation.selective} />

							<h2 class="card-title">{formation.nom}</h2>
							<div
								class="card-actions justify-between items-center mt-4"
							>
								<span class="text-sm text-base-content/60"
									>{formation.capacite} places</span
								>
							</div>
						</div>
					</a>
				{/each}
			</div>

			<!--<div class="py-12 flex justify-center">
				<div class="join">
					{#each {length: Math.ceil((data.total || 0) / 20)} as _, i }
						<a href={`/formations?q=${query}&p=${i}`} class={["join-item btn", i === p ? "btn-active" : ""]}>{i + 1}</a>
					{/each}
				</div>
			</div>-->
		{/if}
	</div>
</div>

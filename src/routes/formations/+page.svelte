<script lang="ts">
	import Selective from "$components/Selective.svelte";
	import { getFormations } from "./data.remote";

	let query = $state("");
	let loading = $state(false);
	let thresholdQuery = $state("");

	const formations = $derived(getFormations(thresholdQuery));

	$effect(() => {
		const q = query;
		loading = true;

		const i = setTimeout(() => {
			loading = false;
			thresholdQuery = q;
		}, 500);

		return () => clearTimeout(i);
	});
</script>

<div class="min-h-screen bg-base-100 py-12">
	<div class="container mx-auto px-4">
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

			<select class="select select-bordered">
				<option disabled selected>Filtrer par type</option>
				<option>Générale</option>
				<option>Technologique</option>
				<option>Professionnelle</option>
			</select>
		</div>

		<!-- Formations Grid -->
		{#if formations.loading}
			<div class="text-center py-32">
				<span class="loading loading-spinner loading-xl text-primary"
				></span>
			</div>
		{:else if formations.error}
			<div class="text-center py-32">
				<span class="text-sm text-gray-700 italic"
					>Une erreur s'est produite.</span
				>
			</div>
		{:else if !formations.current || formations.current.length === 0}
			<div class="text-center py-32">
				<span class="text-sm text-gray-700 italic">Aucun résultat</span>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each formations.current as formation (formation.id)}
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
		{/if}
	</div>
</div>

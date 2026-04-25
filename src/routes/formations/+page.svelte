<script lang="ts">

	let formations = $state([]);
	let query = $state("");

	const update = (q: string) => {
		console.log('query', q);
		fetch(`https://lutrinos.alwaysdata.net/api/parcoursup/recherche?q=${q}`)
			.then((res) => res.json())
			.then((res) => formations = res.data);
	}

	$effect(() => {
		const q = query;
		console.log(q);

		const i = setTimeout(() => {
			update(q);
		}, 500);

		return () => clearTimeout(i);
	});

	$inspect(formations)
</script>

<div class="min-h-screen bg-base-100 py-12">
	<div class="container mx-auto px-4">
		<!-- Header -->
		<div class="mb-12">
			<h1 class="text-4xl md:text-5xl font-bold mb-4">Formations</h1>
			<p class="text-lg text-base-content/70">
				Explorez l'ensemble des formations proposées par nos établissements
			</p>
		</div>

		<!-- Filters -->
		<div class="mb-8 flex flex-col md:flex-row gap-4">
			<input
				bind:value={query}
				type="text"
				placeholder="Rechercher une formation..."
				class="input input-bordered flex-1"
			/>
			<select class="select select-bordered">
				<option disabled selected>Filtrer par type</option>
				<option>Générale</option>
				<option>Technologique</option>
				<option>Professionnelle</option>
			</select>
		</div>

		<!-- Formations Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each formations as formation (formation.id)}
				<a href="/formation/001" class="card bg-white shadow-lg hover:shadow-xl transition">
				<div class="card-body">
					<div class="badge badge-primary mb-2">{formation.selective ? "Sélective" : "Non sélective"}</div>
					<h2 class="card-title">{ formation.nom }</h2>
					<p class="text-base-content/70">{ formation.formation }</p>
					<div class="card-actions justify-between items-center mt-4">
						<span class="text-sm text-base-content/60">{formation.capacite} places</span>
						<div class="badge">S</div>
					</div>
				</div>
			</a>
			{/each}
		</div>
	</div>
</div>

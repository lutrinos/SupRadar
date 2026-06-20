<script lang="ts">
	import Formation from "$components/Formation.svelte";
    import { getAcademie, getStatut } from "$lib/data";

	let { data } = $props();
</script>

{#if data.etablissement}
	<div class="min-h-screen bg-base-200 rounded-selector py-12">
		<div class="container mx-auto px-4">
			<!-- Header Card -->
			<div class="card bg-white mb-8 border border-gray-200">
				<div class="card-body">
					<h1 class="card-title text-4xl mb-4 text-primary">
						{data.etablissement.nom}
					</h1>
					<div class="stats">
						<div class="stat">
							<div class="stat-title">Type d'établissement</div>
							<div class="stat-value">{getStatut(data.etablissement.statutCode ?? -1).nom}</div>
						</div>

						<div class="stat">
							<div class="stat-title">Commune</div>
							<div class="stat-value">{data.etablissement.commune}</div>
							<div class="stat-desc">
								Académie de {getAcademie(data.etablissement.academieCode ?? -1).nom}
							</div>
						</div>

						<div class="stat">
							<div class="stat-title">Nombre de formations</div>
							<div class="stat-value">{data.etablissement.formationsCount}</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Details Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Informations Générales -->
				<div class="card bg-white border border-gray-200">
					<div class="card-body">
						<h2 class="card-title text-primary">
							Informations Générales
						</h2>
						<div class="space-y-4">
							<div>
								<p class="text-sm text-gray-500">Adresse</p>
								<p class="text-gray-800">
									{data.etablissement.adresse ??
										data.etablissement.commune}
								</p>
							</div>
							<div>
								<p class="text-sm text-gray-500">Téléphone</p>
								<p class="text-gray-800">+33 3 87 XX XX XX</p>
							</div>
							<div>
								<p class="text-sm text-gray-500">Email</p>
								<p class="text-gray-800">contact@example.com</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Statistiques -->
				<div class="card bg-white border border-gray-200">
					<div class="card-body">
						<h2 class="card-title text-primary">Statistiques</h2>
						<div class="space-y-4">
							<div class="flex justify-between items-center">
								<span class="text-gray-700"
									>Nombre de places</span
								>
								<span
									class="badge bg-primary-content text-primary"
									>{data.etablissement.formations.reduce(
										(acc, formation) =>
											acc + (formation.capacite ?? 0),
										0,
									)}</span
								>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-gray-700"
									>Formations proposées</span
								>
								<span
									class="badge bg-primary-content text-primary"
									>{data.etablissement.formationsCount}</span
								>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Formations liées -->
			<div class="card bg-white mt-6 border border-gray-200">
				<div class="card-body">
					<h2 class="card-title mb-4 text-primary">
						Formations proposées
					</h2>
					<div
						class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
					>
						{#each data.etablissement.formations as formation (formation.id)}
							<Formation {formation} />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

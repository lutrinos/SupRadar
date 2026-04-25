<script lang="ts">
	let { data } = $props();
</script>

{#if data.etablissement}
	<div class="min-h-screen bg-gray-50 py-12">
		<div class="container mx-auto px-4">
			<!-- Back Button -->
			<div class="mb-6">
				<a
					href="/etablissements"
					class="btn bg-emerald-500 hover:bg-emerald-600 text-white border-0 gap-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
							clip-rule="evenodd"
						/>
					</svg>
					Retour
				</a>
			</div>

			<!-- Header Card -->
			<div class="card bg-white shadow-lg mb-8 border border-gray-200">
				<div class="card-body">
					<h1 class="card-title text-4xl mb-4 text-emerald-600">
						Établissement
					</h1>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<p class="text-sm text-gray-500 mb-1">UAI</p>
							<p class="text-lg font-semibold text-gray-800">
								{data.etablissement.uai}
							</p>
						</div>
						<div>
							<p class="text-sm text-gray-500 mb-1">Nom</p>
							<p class="text-lg font-semibold text-gray-800">
								{data.etablissement.nom}
							</p>
						</div>
						<div>
							<p class="text-sm text-gray-500 mb-1">
								Type d'établissement
							</p>
							<p class="text-lg font-semibold text-gray-800">
								{data.etablissement.statut?.nom}
							</p>
						</div>
						<div>
							<p class="text-sm text-gray-500 mb-1">Région</p>
							<p class="text-lg font-semibold text-gray-800">
								{data.etablissement.region?.nom}
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Details Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Informations Générales -->
				<div class="card bg-white shadow border border-gray-200">
					<div class="card-body">
						<h2 class="card-title text-emerald-600">
							Informations Générales
						</h2>
						<div class="space-y-4">
							<div>
								<p class="text-sm text-gray-500">Adresse</p>
								<p class="text-gray-800">
									123 rue de la École, 54000 Nancy
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
				<div class="card bg-white shadow border border-gray-200">
					<div class="card-body">
						<h2 class="card-title text-emerald-600">
							Statistiques
						</h2>
						<div class="space-y-4">
							<div class="flex justify-between items-center">
								<span class="text-gray-700"
									>Nombre d'élèves</span
								>
								<span
									class="badge bg-emerald-100 text-emerald-800"
									>1,250</span
								>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-gray-700"
									>Formations proposées</span
								>
								<span class="badge bg-blue-100 text-blue-800"
									>{data.etablissement.formationsCount}</span
								>
							</div>
							<!--<div class="flex justify-between items-center">
								<span class="text-gray-700"
									>Taux de réussite</span
								>
								<span class="badge bg-green-100 text-green-800"
									>92%</span
								>
							</div>-->
						</div>
					</div>
				</div>
			</div>

			<!-- Formations liées -->
			<div class="card bg-white shadow mt-6 border border-gray-200">
				<div class="card-body">
					<h2 class="card-title mb-4 text-emerald-600">
						Formations proposées
					</h2>
					<div
						class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
					>
						{#each data.etablissement.formations as formation (formation.id)}
							<a
								href={`/formations/${formation.id}`}
								class="card bg-gray-50 hover:bg-emerald-50 transition border border-gray-200 hover:border-emerald-300 cursor-pointer"
							>
								<div class="card-body">
									<h3 class="font-bold text-emerald-700">
										{formation.nom}
									</h3>
									<p class="text-sm text-gray-600">
										{formation.capacite} places
									</p>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

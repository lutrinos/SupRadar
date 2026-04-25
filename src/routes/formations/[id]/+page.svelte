<script lang="ts">
	import Presentation from "./Presentation.svelte";
	import AllInformations from "./AllInformations.svelte";
	import UsefulLinks from "./UsefulLinks.svelte";

	import BreadCrumbs from "./BreadCrumbs.svelte";
	import Description from "./Description.svelte";
    import Bac from "./Bac.svelte";

	let { data } = $props();
	let current = $derived(
		data.formation?.statistiques.at(-1),
	);
</script>

{#if !data.formation}
	<div>Formation introuvable</div>
{:else}
	<div class="min-h-screen bg-slate-50 rounded-xl p-4">
		<div class="container mx-auto">
			<BreadCrumbs formation={data.formation} />

			<!-- Présentation générale -->
			<Presentation formation={data.formation} {current} />

			<!-- Détails -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				<div class="lg:col-span-2">
					<!-- Description -->
					<Description formation={data.formation} />

					<!-- Bac -->
					<div
						class="card bg-white shadow mb-6 border border-gray-200"
					>
						<Bac formation={data.formation} />
					</div>

					<!-- Débouchés -->
					<div class="card bg-white shadow border border-gray-200">
						<div class="card-body">
							<h2 class="card-title mb-4 text-emerald-600">
								Débouchés
							</h2>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
								<div class="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5 text-emerald-500"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
									<span class="text-gray-700"
										>Licences Scientifiques</span
									>
								</div>
								<div class="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5 text-emerald-500"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
									<span class="text-gray-700"
										>Écoles d'Ingénieur</span
									>
								</div>
								<div class="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5 text-emerald-500"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
									<span class="text-gray-700">BTS/CPGE</span>
								</div>
								<div class="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5 text-emerald-500"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
									<span class="text-gray-700"
										>Métiers Scientifiques</span
									>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Sidebar -->
				<div class="space-y-6">
					<!-- Établissements -->
					<div class="card bg-white shadow border border-gray-200">
						<div class="card-body">
							<h2 class="card-title mb-4 text-emerald-600">
								Établissements proposant cette formation
							</h2>
							<div class="space-y-2">
								<a
									href="/etablissement/0945691B"
									class="btn btn-ghost justify-start hover:bg-emerald-50"
								>
									Lycée Victor Grignard
								</a>
								<a
									href="/etablissement/0751234A"
									class="btn btn-ghost justify-start hover:bg-emerald-50"
								>
									Lycée Henri IV
								</a>
								<a
									href="/etablissement/0692013H"
									class="btn btn-ghost justify-start hover:bg-emerald-50"
								>
									Lycée Molière
								</a>
							</div>
						</div>
					</div>

					<!-- Statistiques -->
					<div class="card bg-white shadow border border-gray-200">
						<div class="card-body">
							<h2 class="card-title mb-4 text-emerald-600">
								Statistiques
							</h2>
							<div class="space-y-3">
								<div>
									<p class="text-sm text-gray-500 mb-1">
										Capacité annuelle
									</p>
									<div
										class="progress progress-emerald"
										// @ts-expect-error
										value={75}
										max={100}
									>
										<span class="text-xs text-emerald-700"
											>1500 places</span
										>
									</div>
								</div>
								<div>
									<p class="text-sm text-gray-500 mb-1">
										Taux de réussite
									</p>
									<div
										class="stat-value text-emerald-600 text-2xl"
									>
										92%
									</div>
								</div>
								<div>
									<p class="text-sm text-gray-500 mb-1">
										Taux d'insertion
									</p>
									<div
										class="stat-value text-blue-600 text-2xl"
									>
										88%
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<UsefulLinks formation={data.formation} />

			<AllInformations formation={data.formation} />
		</div>
	</div>
{/if}

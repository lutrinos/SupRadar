<script lang="ts">
	import Presentation from "./Presentation.svelte";
	import AllInformations from "./AllInformations.svelte";
	import UsefulLinks from "./UsefulLinks.svelte";

	import BreadCrumbs from "./BreadCrumbs.svelte";
	import Description from "./Description.svelte";
    import Admissions from "./Admissions.svelte";

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
						<Bac formation={data.formation} {current} />
					</div>

					<!-- Débouchés -->
					<Admissions formation={data.formation} {current} />
				</div>

				<!-- Sidebar -->
				<div class="space-y-6">
					<!-- Établissements -->
					<div class="card bg-white shadow border border-gray-200">
						<div class="card-body">
							<h2 class="card-title text-primary">
								Établissements proposant cette formation
							</h2>
							<div class="space-y-2">
								Bientôt !
							</div>
						</div>
					</div>

					<!-- Statistiques -->
					<div class="card bg-white shadow border border-gray-200">
						<div class="card-body">
							<h2 class="card-title mb-4 text-primary">
								Autres formations de l'établissement
							</h2>
							<div class="space-y-3">
								Bientôt !
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

<script lang="ts">
	import Presentation from "./Presentation.svelte";
	import AllInformations from "./AllInformations.svelte";
	import UsefulLinks from "./UsefulLinks.svelte";

	import BreadCrumbs from "./BreadCrumbs.svelte";
	import Resume from "./Resume.svelte";
	import Admissions from "./Admissions.svelte";

	import Bac from "./Bac.svelte";
	import Tabs from "$components/Tabs.svelte";
    import Info from "$components/Info.svelte";
    import Formation from "$components/Formation.svelte";
    import { getFiliere } from "$lib/data/index.js";

	let { data } = $props();
	let current = $derived(data.formation?.statistiques.at(-1));

	let activeTab = $state("resume");

	$inspect(data.formation)
</script>

{#if !data.formation}
	<div>Formation introuvable</div>
{:else}
	<div class="min-h-screen bg-base-200 rounded-selector p-2 lg:p-4">
		<div class="container mx-auto">
			<BreadCrumbs formation={data.formation} />

			<!-- Présentation générale -->
			<Presentation formation={data.formation} {current} />

			<!-- Détails -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				<div class="lg:col-span-2">
					<div class="mb-4">
						<Tabs
							bind:active={activeTab}
							tabs={[
								{
									label: "Résumé",
									code: "resume",
								},
								{
									label: "Baccalauréat",
									code: "bac",
								},
								{
									label: "Admissions",
									code: "admissions",
								},
							]}
						/>
					</div>
					<div class="bg-base-100 rounded-field overflow-hidden">
						<div class="px-5 pb-5 pt-5">
							{#if activeTab === "resume"}
								<!-- Description -->
								<Resume formation={data.formation} />
							{:else if activeTab === "bac"}
								<!-- Bac -->
								<Bac formation={data.formation} {current} />
							{:else if activeTab === "admissions"}
								<!-- Admissions -->
								<Admissions
									formation={data.formation}
									{current}
								/>
							{/if}
						</div>
					</div>
				</div>

				<!-- Sidebar -->
				<div class="space-y-6">
					<!-- Établissements -->
					<div class="card card-border bg-base-100">
						<div class="card-body relative">
							<!-- svelte-ignore a11y_consider_explicit_label -->
							<Info>
								Pas encore implémenté.
							</Info>
							<h2 class="card-title text-primary">
								Établissements proposant cette formation
							</h2>
							<div class="space-y-2">
								Bientôt ! Une liste est disponible <a class="link" href={`/filieres/${getFiliere(1, data.formation.filiere1)?.slug}/${getFiliere(2, data.formation.filiere2)?.slug}/${getFiliere(3, data.formation.filiere3)?.slug}`}>ici</a>.
							</div>
						</div>
					</div>

					<!-- Statistiques -->
					<div class="card card-border bg-base-100">
						<div class="card-body">
							<Info>
								Une liste des différentes formations proposées par l'établissement.
							</Info>
							<h2 class="card-title mb-4 text-primary">
								Autres formations de l'établissement
							</h2>
							<div class="space-y-3">
								{#each data.formation.etablissement.formations as f (f.id)}
									{#if f.id !== data.formation.id}
										<Formation tiny formation={f} />
									{/if}
								{/each}
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

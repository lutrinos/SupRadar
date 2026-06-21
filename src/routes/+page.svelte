
<svelte:head>
	<title>Accueil | SupRadar</title>
	<meta name="description" content="Explorateur de formations sur Parcoursup" />
</svelte:head>

<!-- from-emerald-500 to-emerald-400 -->
<div class="hero px-8 py-48  rounded-xl bg-linear-to-br from-primary to-emerald-400">
	<div class="hero-content text-center text-white">
		<div class="max-w-2xl">
			<h1 class="text-5xl md:text-6xl font-bold mb-6">SupRadar</h1>
			<p class="text-lg md:text-xl mb-8 opacity-90">
				Explorateur de formations sur Parcoursup
			</p>
			<div class="flex flex-col md:flex-row gap-4 justify-center">
				<a href="/formations" class="btn btn-lg bg-white text-black hover:bg-gray-100 border-0">
					Découvrir les formations
				</a>
				<a href="/etablissements" class="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-emerald-600">
					Voir les Établissements
				</a>
			</div>
		</div>
	</div>
</div>
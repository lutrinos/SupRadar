<div class="min-h-screen bg-gray-50 py-12">
	<div class="container mx-auto px-4">
		<!-- Header -->
		<div class="mb-12">
			<h1 class="text-4xl md:text-5xl font-bold mb-4 text-primary">Établissements</h1>
			<p class="text-lg text-gray-600">
				Découvrez et explorez les établissements présents sur Parcoursup.
			</p>
		</div>

		<!-- Search Bar -->
		<div class="mb-8">
			<input
				type="text"
				placeholder="Rechercher par nom..."
				class="input input-bordered input-primary"
			/>
		</div>

		<!-- Table -->
		<div class="overflow-x-auto">
			<table class="table w-full bg-base-100 rounded-lg shadow-lg border border-gray-200">
				<thead class="bg-primary-content">
					<tr>
						<th class="text-primary font-semibold">UAI</th>
						<th class="hidden sm:table-cell text-primary font-semibold">Nom</th>
						<th class="hidden md:table-cell text-primary font-semibold">Type</th>
						<th class="text-primary font-semibold">Action</th>
					</tr>
				</thead>
				<tbody>
					<tr class="hover:bg-emerald-25 transition">
						<td class="font-medium">0691774D</td>
						<td class="hidden sm:table-cell">Université Claude Bernard</td>
						<td class="hidden md:table-cell">
							<span class="badge bg-primary-content text-primary">Université</span>
						</td>
						<td>
							<a href="/etablissements/0691774D" class="btn btn-sm bg-primary hover:bg-primary-content text-white border-0">
								Voir
							</a>
						</td>
					</tr>
					<tr class="hover:bg-emerald-25 transition">
						<td class="font-medium">	0690026D</td>
						<td class="hidden sm:table-cell">Lycée du Parc</td>
						<td class="hidden md:table-cell">
							<span class="badge bg-primary-content text-primary">Lycée</span>
						</td>
						<td>
							<a href="/etablissements/0690026D" class="btn btn-sm bg-primary hover:bg-primary-content text-white border-0">
								Voir
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Empty State (if no results) 
		<div class="flex justify-center items-center py-12">
			<div class="text-center max-w-md">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-20 w-20 mx-auto mb-4 text-emerald-300"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 21l-7-5m0 0l-7 5m7-5v8"
					/>
				</svg>
				<p class="text-gray-500">Aucun établissement trouvé</p>
			</div>
		</div>-->
	</div>
</div>

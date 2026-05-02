<script lang="ts">
	import "../app.css";
	import "layerchart/daisyui-5.css";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
	let sidebarOpen = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script defer src="/script.js" data-website-id="ae5aa64e-400a-4e16-8987-0986aa82c30c"></script>
</svelte:head>

<!-- Navbar -->
<div class="flex flex-col p-2 lg:p-8 min-h-screen">
	<div class="max-lg:collapse w-full">
		<input id="navbar-1-toggle" class="peer hidden" type="checkbox" />
		<label
			for="navbar-1-toggle"
			class="fixed inset-0 hidden max-lg:peer-checked:block"
		></label>
		<div class="collapse-title navbar">
			<div class="navbar-start">
				<label for="navbar-1-toggle" class="btn btn-ghost lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h8m-8 6h16"
						/></svg
					>
				</label>
				<a href="/" class="text-2xl font-bold"
					>Sup<span class="text-accent">Radar</span></a
				>
			</div>
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal px-1">
					<li><a href="/a-propos">À propos</a></li>
					<li><a href="/etablissements">Établissements</a></li>
					<li><a href="/formations">Formations</a></li>
					<li><a href="/filieres">Filières</a></li>
				</ul>
			</div>
			
			<div class="navbar-end hidden lg:flex">
				<label class="input input-bordered">
					<svg
						class="h-[1em] opacity-50"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<g
							stroke-linejoin="round"
							stroke-linecap="round"
							stroke-width="2.5"
							fill="none"
							stroke="currentColor"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.3-4.3"></path>
						</g>
					</svg>
					<input
						type="text"
						placeholder="Rechercher une formation..."
						class="grow"
					/>
				</label>
			</div>
		</div>

		<div class="collapse-content lg:hidden z-1">
			<ul class="menu">
				<li><a href="/a-propos">À propos</a></li>
				<li><a href="/etablissements">Établissements</a></li>
				<li><a href="/formations">Formations</a></li>
				<li><a href="/filieres">Filières</a></li>
			</ul>
		</div>
	</div>

	<!-- Main Content with top spacing for fixed navbar -->
	<main class="flex-1 pt-6">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer
		class="footer footer-horizontal footer-center text-base-content rounded p-10"
	>
		<nav class="grid sm:grid-flow-col gap-4">
			<a href="/a-propos" class="link link-hover">À propos</a>
			<a href="/contact" class="link link-hover">Contact</a>
			<a
				target="_blank"
				href="https://github.com/lutrinos/SupRadar"
				class="link link-hover">GitHub</a
			>
			<a
				href="/sources"
				class="link link-hover">Sources</a
			>
			<a href="/changelog" class="link link-hover">Changelog</a>
		</nav>

		<aside class="p-8">
			<div class="text-4xl font-bold">
				Sup<span class="text-accent">Radar</span>
			</div>
		</aside>

		<!--<nav>
		<div class="grid grid-flow-col gap-4">
			<a>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="fill-current"
				>
					<path
						d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
					></path>
				</svg>
			</a>
			<a>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="fill-current"
				>
					<path
						d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
					></path>
				</svg>
			</a>
			<a>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="fill-current"
				>
					<path
						d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
					></path>
				</svg>
			</a>
		</div>
	</nav>-->

		<aside>
			<p>
				Copyright © 2026 - Nathan Tillier
			</p>
		</aside>
	</footer>
</div>

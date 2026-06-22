<script lang="ts">
	import "../app.css";
	import "layerchart/daisyui-5.css";
	import favicon from "$lib/assets/favicon.svg";
    import { goto, afterNavigate } from "$app/navigation";

	let { children } = $props();

	afterNavigate(({ from, to }) => {
		const purl = from?.url;
		const url = to?.url;

		if (purl && url && purl !== url) {
			// @ts-ignore
			window.goatcounter.count({
				path: url.pathname
			})
		}
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!--<script
		defer
		src="/script.js"
		data-website-id="ae5aa64e-400a-4e16-8987-0986aa82c30c"
	></script>-->
	<script data-goatcounter="/api/count"
        async src="/script2.js"></script>
</svelte:head>

<!-- Navbar -->
<div class="flex flex-col p-2 md:p-8 min-h-screen">
	<div class="max-md:collapse w-full">
		<input id="navbar-1-toggle" class="peer hidden" type="checkbox" />
		<label
			for="navbar-1-toggle"
			class="fixed inset-0 hidden max-md:peer-checked:block"
		></label>
		<div class="collapse-title navbar">
			<div class="navbar-start">
				<label for="navbar-1-toggle" class="btn btn-ghost md:hidden">
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
			<div class="navbar-center hidden md:flex">
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
						onkeydown={(e) => {
							if (e.key === "Enter") {
								const url = new URL("/formations", window.location.origin);

								url.searchParams.set("q", (e.target as HTMLInputElement).value as string);
								
								goto(url);

								(e.target as HTMLInputElement).blur();
								(e.target as HTMLInputElement).value = "";
							}
						}}
					/>
				</label>
			</div>
		</div>

		<div class="collapse-content md:hidden z-1">
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
			<a href="/sources" class="link link-hover">Sources</a>
			<a href="/changelog" class="link link-hover">Changelog</a>
		</nav>

		<aside class="p-8">
			<div class="text-4xl font-bold">
				Sup<span class="text-accent">Radar</span>
			</div>
		</aside>

		<aside>
			<p>Copyright © 2026 - Nathan Tillier</p>
		</aside>
	</footer>

	<!--<div
		role="alert"
		class="fixed left-0 bottom-0 w-screen rounded-none alert alert-error alert-soft"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 shrink-0 stroke-current"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<span style="z-index: 0;">Attention ! Ce site est en construction et il est possible qu'il y ait des erreurs.</span>
	</div>-->
</div>

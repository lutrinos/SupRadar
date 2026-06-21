<script lang="ts">
    // @ts-expect-error
    import About from "./About.svx";
</script>

<svelte:head>
	<title>À propos | SupRadar</title>
	<meta name="description" content="À propos de SupRadar" />
</svelte:head>

<div class="container mx-auto prose">
    <About />
</div>
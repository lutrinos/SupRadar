<script lang="ts">
    // @ts-expect-error
    import Contact from "./Contact.svx"
</script>

<svelte:head>
	<title>Contact | SupRadar</title>
	<meta name="description" content="Contactez l'auteur de ce site" />
</svelte:head>

<div class="prose container mx-auto">
    <Contact />
</div>
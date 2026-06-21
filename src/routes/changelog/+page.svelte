<script lang="ts">
    // @ts-expect-error
    import Changelog from "../../../CHANGELOG.md";
</script>

<svelte:head>
	<title>Changelog | SupRadar</title>
	<meta name="description" content="Accéder à l'historique des modifications de SupRadar" />
</svelte:head>

<div class="container mx-auto">
    <div class="prose">
        <Changelog />
    </div>
</div>

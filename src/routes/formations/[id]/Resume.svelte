<script lang="ts">
    import { MapLibre, Marker } from "svelte-maplibre-gl";

    let { formation } = $props();
</script>

<section class="space-y-4">
    <h2 class="text-2xl font-semibold text-primary">Résumé</h2>
    <div class="prose" style="max-width: none;">Aucune description.</div>

    <MapLibre
        class="h-100"
        zoom={10}
        center={[formation.longitude, formation.latitude]}
        style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
    >
        <Marker lnglat={[formation.longitude, formation.latitude]} />
    </MapLibre>
</section>

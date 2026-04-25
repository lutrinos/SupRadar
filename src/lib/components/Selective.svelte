<script lang="ts">
    let { selective } = $props();
</script>

<span class={["badge badge-soft", selective ? "badge-primary" : "badge-secondary"]}>{selective ? "Formation sélective" : "Formation non sélective"}</span>
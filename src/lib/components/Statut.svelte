<script lang="ts">
    let { statut } = $props();
</script>

<span class={["badge badge-soft", statut === "Public" ? "badge-success" : "badge-error"]}>{ statut }</span>
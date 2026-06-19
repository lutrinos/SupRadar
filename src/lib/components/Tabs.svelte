<script lang="ts">
    let { tabs, active = $bindable("") } = $props();
</script>

<nav
    class="flex flex-wrap overflow-x-auto rounded-field bg-base-100 border border-neutral-content"
    aria-label="Tabs"
>
    {#each tabs as tab, i (tab.code)}
        <button
            class="grow cursor-pointer border-neutral-content p-4 text-sm font-medium text-neutral hover:text-primary"
            class:text-primary={active === tab.code}
            class:bg-primary-content={active === tab.code}
            class:border-r={i != tabs.length - 1}
            onclick={() => (active = tab.code)}>{ tab.label }</button
        >
    {/each}
</nav>

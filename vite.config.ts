import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { adapter, analyzer } from 'vite-bundle-analyzer';

export default defineConfig({
    plugins: [
        adapter(analyzer()),
        tailwindcss(),
        sveltekit()
    ],
});

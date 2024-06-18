import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
			autoInstall: true
		}),
		mkcert()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		https: true,
		host: '0.0.0.0',

		proxy: {}
	}
});

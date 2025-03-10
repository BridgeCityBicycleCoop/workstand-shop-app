<script lang="ts">
	import '../styles.css';
	import { setContext } from 'svelte';
	import { navigating } from '$app/stores';
	import { loadingStore } from '$lib/ui';

	let { data, children } = $props();
	const theme = data.theme;

	let themeStyles = $derived(`
	<style class="theme-styles">
		:root {
			${Object.keys(theme).reduce((str: string, key: string) => {
				return str + `--${key}: ${theme[key]};` + '\n';
			}, '')}
		}
	</style>
	`);

	const loading = loadingStore(navigating);
	// ...and add it to the context for child components to access
	setContext('loading-store', loading);
</script>

<svelte:head>
	<!-- eslint-disable-next-line -->
	{@html themeStyles}
</svelte:head>

{@render children?.()}

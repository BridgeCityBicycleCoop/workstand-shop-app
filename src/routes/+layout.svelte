<script lang="ts">
	import '../styles.css';

	export let data;
	const theme = data.theme;

	$: themeStyles = `
	<style class="theme-styles">
		:root {
			${Object.keys(theme).reduce((str: string, key: string) => {
				return str + `--${key}: ${theme[key]};` + '\n';
			}, '')}
		}
	</style>
	`;
</script>

<svelte:head>
	{@html themeStyles}
</svelte:head>

<slot />

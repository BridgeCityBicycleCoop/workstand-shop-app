<script lang="ts">
	import '../styles.css';

	export let data;
	const shopConfig = data.shopConfig;
	const theme = data.theme;

	const themeString = Object.keys(theme).reduce((str: string, key: string) => {
		return str + key + ': ' + theme[key] + '\n';
	}, '');
</script>

<div id="shop-theme" style={themeString}>
	<slot />
</div>

<style>
	div {
		display: contents;
	}
</style>

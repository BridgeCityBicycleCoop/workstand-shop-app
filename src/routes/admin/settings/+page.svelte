<script lang="ts">
	import { shopConfig, theme } from '../../../shop_config';
	import { camelCaseToWords } from '$lib/ui/utils';
</script>

<h2>Settings</h2>

<h3>Shop Config</h3>
<section>
	{#each Object.keys(shopConfig) as setting}
		<tr>
			<td>{camelCaseToWords(setting)}: </td>
			<td>{shopConfig[setting]}</td>
		</tr>
	{/each}
</section>

<h3>Shop Theme</h3>
<section>
	{#each Object.keys(theme) as style}
		<tr>
			<td>{camelCaseToWords(style)}: </td>
			<td>{theme[style]}</td>
		</tr>
	{/each}
</section>

<style>
	h2 {
		font-weight: bold;
	}
</style>

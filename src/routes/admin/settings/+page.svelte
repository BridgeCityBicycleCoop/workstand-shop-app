<script lang="ts">
	import { shopConfig, theme } from '../../../shop_config';
	import { camelCaseToWords } from '$lib/ui/utils';
</script>

<h2>Shop Config</h2>
<section>
	{#each Object.keys(shopConfig) as setting}
		<tr>
			<td>{camelCaseToWords(setting)}: </td>
			<td>{shopConfig[setting]}</td>
		</tr>
	{/each}
</section>

<h2>Shop Theme</h2>
<section>
	{#each Object.keys(theme) as style}
		<tr>
			<td>{camelCaseToWords(style)}: </td>
			<td>{theme[style]}</td>
		</tr>
	{/each}
</section>

<style>
</style>

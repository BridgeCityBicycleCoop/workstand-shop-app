<script lang="ts">
	import { shopConfig, theme } from '../../../shop_config';
	import { camelCaseToWords } from '$lib/ui/utils';
</script>

<pre>[Under Construction]</pre>
<h2>Settings</h2>

<p>Here you will be able edit certain site settings, such as the site name and special settings.</p>
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

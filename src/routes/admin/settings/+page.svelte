<script lang="ts">
	import { shopConfig, theme } from '../../../shop_config';
	import { camelCaseToWords } from '$lib/ui/utils';
</script>

<h2>Shop Config</h2>
<table class="settings-list">
	{#each Object.keys(shopConfig) as setting}
		<tr>
			<th>{camelCaseToWords(setting)}</th>
			<td>{shopConfig[setting]}</td>
		</tr>
	{/each}
</table>

<h2>Shop Theme</h2>
<table class="theme-list">
	{#each Object.keys(theme) as style}
		<tr>
			<th>{camelCaseToWords(style)}</th>
			<td>{theme[style]}</td>
		</tr>
	{/each}
</table>

<style>
	.settings-list {
		margin-top: 1rem;
	}

	th {
		border: 1px dotted black;
		width: 10em;
	}

	td {
		border: 1px dotted black;
	}

	h2 {
		margin-top: 1.5em;
		text-decoration: underline;
	}
</style>

<script lang="ts">
	import { shopConfig, theme } from '../../../shop_config';
	import { camelCaseToWords } from '$lib/ui/utils';
	import LiabilityWaiver from '$lib/ui/LiabilityWaiver.svelte';
	import MemberRightsAndGuidelines from '$lib/ui/MemberRightsAndGuidelines.svelte';
</script>

<h2>Shop Config</h2>
<small>(Update Config settings in src/shop_config.ts)</small>
<table class="settings-list">
	<tbody>
		{#each Object.keys(shopConfig) as setting}
			<tr>
				<th>{camelCaseToWords(setting)}</th>
				<td>{shopConfig[setting]}</td>
			</tr>
		{/each}
	</tbody>
</table>

<h2>Shop Theme</h2>
<small>(Update Theme settings in src/shop_config.ts)</small>
<table class="theme-list">
	<tbody>
		{#each Object.keys(theme) as style}
			<tr>
				<th>{camelCaseToWords(style)}</th>
				<td>{theme[style]}</td>
			</tr>
		{/each}
	</tbody>
</table>

<h3>(Update Liability Waiver markup content in src/lib/ui/LiabilityWaiver.svelte)</h3>

<LiabilityWaiver />

<h3>
	(Update Member Rights & Guidelines markup content in src/lib/ui/MemberRightsAndGuidelines.svelte)
</h3>
<MemberRightsAndGuidelines />

<style>
	.theme-list,
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

	h3 {
		margin-top: 1.5em;
		text-decoration: underline;
	}
</style>

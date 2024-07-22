<script lang="ts">
	import { shopConfig, theme } from '../../../shop_config';
	import { camelCaseToWords } from '$lib/ui/utils';
</script>

<h2>Shop Config</h2>
<section class="settings-list">
	{#each Object.keys(shopConfig) as setting}
		<div class="row">
			<div class="column1">
				<div><span class="setting-name">{camelCaseToWords(setting)}</span></div>
			</div>
			<div class="column2">
				<div class="setting-value">{shopConfig[setting]}</div>
			</div>
		</div>
	{/each}
</section>

<h2>Shop Theme</h2>
<section class="theme-list">
	{#each Object.keys(theme) as style}
		<div class="row">
			<div><span class="setting-name">{camelCaseToWords(style)}</span></div>
			<div class="setting-value">{theme[style]}</div>
		</div>
	{/each}
</section>

<style>
	.row {
		display: flex;
		width: 100%;
		column-gap: 6rem;
	}
	.settings-list {
		margin-top: 1rem;
	}

	.setting-name {
		color: var(--color-accent-subtle);
		background-color: var(--color-bg-med);
		padding: 0px 10px;
		text-align: left;
		min-width: 175px;
		flex-grow: 1;
	}

	.setting-name:after {
		content: ':';
	}

	.setting-value {
		flex-grow: 1;
	}

	h2 {
		margin-top: 1em;
	}
</style>

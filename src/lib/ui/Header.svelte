<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		logo?: import('svelte').Snippet;
	}

	let { children, logo }: Props = $props();
</script>

<header>
	{@render children?.()}
	<div class="logo">
		{@render logo?.()}
	</div>
</header>

<style>
	header {
		display: grid;
		grid-template-areas: 'logo nav home';
		grid-template-columns: max-content auto max-content;
	}

	@media (max-width: 540px) {
		header {
			grid-template-areas:
				'nav nav nav'
				'logo x home';
		}
	}

	.logo {
		grid-area: logo;
		height: 3em;
	}
</style>

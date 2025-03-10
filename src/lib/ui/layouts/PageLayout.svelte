<script lang="ts">
	import Spinner from '$lib/ui/Spinner.svelte';
	interface Props {
		loading?: boolean;
		header?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
	}

	let {
		loading = false,
		header,
		children,
		footer
	}: Props = $props();
</script>

<div class="background-spinner" class:loading>
	<Spinner />
</div>

<div class="layout-page">
	{@render header?.()}

	<main>
		{@render children?.()}
	</main>

	{@render footer?.()}
</div>

<style>
	.layout-page {
		display: grid;
		grid-template-rows: auto 1fr auto;
		height: 100vh;
		height: 100dvh;
	}

	main {
		padding: 1rem 2rem;
		width: 80%;
		max-width: var(--max-width-main);
		margin: 0 auto;
	}

	@media (width < 1024px) {
		main {
			max-width: var(--max-width-sm);
		}
	}

	.background-spinner {
		width: 70vw;
		pointer-events: none;
		z-index: -1;
		position: fixed;
		top: -2dvh;
		left: -20vw;
		opacity: 0;
		transition: opacity ease-out 1s;

		&.loading {
			opacity: 0.2;
		}
	}
</style>

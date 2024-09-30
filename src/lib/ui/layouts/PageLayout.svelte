<script lang="ts">
	import Spinner from '$lib/ui/Spinner.svelte';
	export let loading = false;
</script>

<div class="background-spinner" class:loading>
	<Spinner />
</div>

<div class="layout-page">
	<slot name="header" />

	<main>
		<slot />
	</main>

	<slot name="footer" />
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
		width: 100%;
		max-width: 36rem;
		margin: 0 auto;
	}

	@media (min-width: 1024px) {
		main {
			max-width: 50rem;
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

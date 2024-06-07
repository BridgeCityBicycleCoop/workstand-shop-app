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
		min-height: 100vh;
	}

	main {
		padding: 1rem 2rem;
		max-width: 64rem;
		width: 100%;
		margin: 0 auto;
	}
</style>

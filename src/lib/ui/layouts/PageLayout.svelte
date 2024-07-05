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
		max-width: 64rem;
		width: 100%;
		margin: 0 auto;
	}
</style>

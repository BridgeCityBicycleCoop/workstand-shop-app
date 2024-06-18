<div class="layout-page">
	<slot name="header" />

	<main class="container">
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
</style>

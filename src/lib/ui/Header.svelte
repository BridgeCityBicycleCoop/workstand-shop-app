<header>
	<slot />
	<div class="logo">
		<slot name="logo" />
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

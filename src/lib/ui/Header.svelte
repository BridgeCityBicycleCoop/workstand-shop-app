<header>
	<slot />

	<div class="logo">
		<slot name="logo" />
	</div>

	<div class="menu">
		<slot name="menu" />
	</div>
</header>

<style>
	header {
		display: grid;
		grid-template-areas: 'logo nav menu';
		grid-template-columns: max-content auto max-content;
	}

	@media (max-width: 540px) {
		header {
			grid-template-areas:
				'nav nav nav'
				'logo x menu';
		}
	}

	.logo {
		grid-area: logo;
		height: 5em;
	}

	.menu {
		grid-area: menu;
		width: 3em;
		height: 3em;
	}
</style>

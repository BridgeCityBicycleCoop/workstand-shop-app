<script lang="ts">
	import { Logo } from '$lib/ui';
</script>

<div class="admin-layout">
	<nav>
		<span aria-label="logo" class="logo"><Logo /></span>
		<ul class="admin-menu">
			<li class="menu-heading">
				<h3>Reporting</h3>
			</li>
			<li>
				<a href="/admin">
					<span>Members</span>
				</a>
			</li>
			<li>
				<a href="/admin/bikes">
					<span>Bikes</span>
				</a>
			</li>
			<li>
				<a href="/admin/activity">
					<span>Activity</span>
				</a>
			</li>
			<li class="menu-heading">
				<h3>Admin</h3>
			</li>
			<li>
				<a href="/admin/settings">
					<span>Settings</span>
				</a>
			</li>
			<li>
				<a href="/admin/options">
					<span>Options</span>
				</a>
			</li>
			<li>
				<a href="/admin/branding">
					<span>Branding</span>
				</a>
			</li>
		</ul>
	</nav>

	<section class="page-content">
		<header>
			<a href="/">Return to Shop</a>
		</header>
		<main>
			<slot />
		</main>
	</section>
</div>

<style>
	.admin-layout {
		display: flex;
		min-height: 100%;
	}

	nav {
		display: flex;
		flex-direction: column;
		min-width: 8rem;
		max-width: 12rem;
		min-height: 100dvh;
		padding-inline-end: 1rem;
		background: var(--color-bg-dark);
		color: var(--color-text-light);
	}

	.logo {
		display: block;
		height: 2rem;
		margin: 0 15px;
		filter: invert(1);
	}

	.admin-menu {
		display: flex;
		flex-direction: column;
		margin-top: 1rem;
	}

	.admin-menu li {
		font-size: 0.9em;
		padding: 12px 15px;
	}

	.admin-menu a {
		color: inherit;
	}

	.admin-menu h3 {
		margin: 0;
		padding: 0;
	}

	.admin-menu .menu-heading {
		text-transform: uppercase;
		letter-spacing: 0.15em;
		font-size: 0.5em;
		margin-top: 0.5rem;
		color: var(--color-accent-med, #84a5c5);
	}

	.page-content {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		min-height: 100dvh;
		flex: 1;
		min-height: 100dvh;
		padding: 0 1.4rem 1rem;
		background: var(--color-bg-lighter, white);
	}

	.page-content > header {
		display: flex;
		gap: 2rem;
		align-items: center;
		justify-content: end;
		min-height: 3rem;
	}
</style>

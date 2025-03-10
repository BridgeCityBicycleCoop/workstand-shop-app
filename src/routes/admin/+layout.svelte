<script lang="ts">
	import { page } from '$app/stores';
	import { Logo } from '$lib/ui';
	import ArrowLeftBoldIcon from '~icons/mdi/arrow-left-bold';

	const navItems = [
		{ name: 'Reporting', href: '' },
		{ name: 'Members', href: '/admin' },
		{ name: 'Activity', href: '/admin/activity' },
		{ name: 'Bikes', href: '/admin/bikes' },
		{ name: 'Admin', href: '' },
		{ name: 'Settings', href: '/admin/settings' }
	];

	let { data, children } = $props();

	let logoUrl = $derived(data.shopConfig.logoUrl);
	let shopName = $derived(data.shopConfig.shopName);
</script>

<div class="admin-layout">
	<nav>
		<span aria-label="logo" class="logo"><Logo {logoUrl} {shopName} /></span>
		<ul class="admin-menu">
			{#each navItems as { name, href }}
				{#if !href}
					<li class="menu-heading">
						<h3>{name}</h3>
					</li>
				{:else}
					<li>
						<a {href}>{name}</a>
						{#if $page.url.pathname === href}
							<span class="nav-arrow">
								<ArrowLeftBoldIcon />
							</span>
						{/if}
					</li>
				{/if}
			{/each}
		</ul>
	</nav>

	<section class="page-content">
		<header>
			<a href="/">Return to Shop</a>
		</header>
		<main>
			{@render children?.()}
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
		flex-basis: 8rem;
		flex-shrink: 0;
		flex-direction: column;
		min-height: 100dvh;
		padding-inline-end: 1rem;
		background: var(--color-bg-dark);
		color: var(--color-text-light);
	}

	.nav-arrow {
		display: inline-flex;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		align-items: center;

		opacity: 1;
		animation-name: fadeInFromRight;
		animation-iteration-count: 1;
		animation-timing-function: ease-in;
		animation-duration: 0.2s;
	}

	@keyframes fadeInFromRight {
		0% {
			opacity: 0;
			transform: translateX(50%);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
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
		position: relative;
		font-size: 0.9em;
		padding: 12px calc(1rem + 15px) 12px 15px;
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
		flex: 1;
		flex-direction: column;
		justify-content: stretch;
		min-height: 100dvh;
		min-height: 100dvh;
		padding: 0 1.4rem 1rem;
		background: var(--color-bg-lighter, white);
	}

	.page-content > header {
		display: flex;
		gap: 2rem;
		align-items: center;
		justify-content: start;
		min-height: 3rem;
	}
</style>

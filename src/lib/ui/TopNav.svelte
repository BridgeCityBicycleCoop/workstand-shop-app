<script lang="ts">
	import { page } from '$app/stores';

	export let navItems: { name: string; href: string }[];
	const matchesPath = (path: string, href: string) =>
		path === href || (href.length > 1 && path.startsWith(href));
</script>

<nav>
	<svg viewBox="0 0 2 3" aria-hidden="true">
		<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
	</svg>
	<ul>
		{#each navItems as { name, href }}
			<li>
				<a aria-current={matchesPath($page.url.pathname, href) ? 'page' : undefined} {href}
					>{name}</a
				>
			</li>
		{/each}
	</ul>
	<svg viewBox="0 0 2 3" aria-hidden="true">
		<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
	</svg>
</nav>

<style>
	nav {
		grid-area: 1 / 1 / 2 / 4;
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	a[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid rgb(var(--color-primary));
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	[aria-current='page'] {
		color: rgb(var(--color-primary));
	}

	@media (hover: hover) {
		a:hover {
			color: rgb(var(--color-primary));
		}
	}
</style>

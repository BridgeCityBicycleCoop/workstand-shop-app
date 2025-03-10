<script lang="ts">
	import { getContext } from 'svelte';
	import { PageLayout, Header, Footer, TopNav, Logo, Toasts } from '$lib/ui';
	import type { Writable } from 'svelte/store';

	let { data, children } = $props();

	let logoUrl = $derived(data.shopConfig.logoUrl);
	let shopName = $derived(data.shopConfig.shopName);
	let user = $derived(data.user);

	const loading = getContext<Writable<boolean>>('loading-store');

	let navItems = $derived([
		{ name: 'Login', href: '/login' },
		{ name: 'Shop', href: '/' },
		{ name: 'Members', href: '/members' },
		{ name: 'Bikes', href: '/bikes' },
		...(user?.role.includes('admin') ? [{ name: 'Admin', href: '/admin' }] : [])
	]);
</script>

<PageLayout loading={$loading}>
	{#snippet header()}
		<Header >
			{#snippet logo()}
				<Logo {logoUrl} {shopName}  />
			{/snippet}
			<TopNav {navItems} />
		</Header>
	{/snippet}

	{@render children?.()}

	{#snippet footer()}
		<Footer  />
	{/snippet}
</PageLayout>

<Toasts />

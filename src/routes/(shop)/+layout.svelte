<script lang="ts">
	import { getContext } from 'svelte';
	import { PageLayout, Header, Footer, TopNav, Logo, Toasts } from '$lib/ui';
	import type { Writable } from 'svelte/store';

	export let data;

	$: logoUrl = data.shopConfig.logoUrl;
	$: shopName = data.shopConfig.shopName;
	$: user = data.user;

	const loading = getContext<Writable<boolean>>('loading-store');

	$: navItems = [
		{ name: 'Login', href: '/login' },
		{ name: 'Shop', href: '/' },
		{ name: 'Members', href: '/members' },
		{ name: 'Bikes', href: '/bikes' },
		...(user?.role.includes('admin') ? [{ name: 'Admin', href: '/admin' }] : [])
	];
</script>

<PageLayout loading={$loading}>
	<Header slot="header">
		<Logo {logoUrl} {shopName} slot="logo" />
		<TopNav {navItems} />
	</Header>

	<slot />

	<Footer slot="footer" />
</PageLayout>

<Toasts />

<script lang="ts">
	import { PageLayout, Header, Footer, TopNav, Logo, Toasts } from '$lib/ui';
	export let data;

	$: logoUrl = data.shopConfig.logoUrl;
	$: shopName = data.shopConfig.shopName;

	$: navItems = [
		{ name: 'Login', href: '/login' },
		{ name: 'Shop', href: '/' },
		{ name: 'Members', href: '/members' },
		{ name: 'Bikes', href: '/bikes' },
		...(data.user?.role.includes('admin') ? [{ name: 'Admin', href: '/admin' }] : [])
	];
</script>

<PageLayout>
	<Header slot="header">
		<TopNav {navItems} />
		<Logo {logoUrl} {shopName} slot="logo" />
	</Header>

	<slot />

	<Footer slot="footer" />
</PageLayout>

<Toasts />

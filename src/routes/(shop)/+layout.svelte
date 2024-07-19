<script lang="ts">
	import { PageLayout, Header, Footer, TopNav, Logo, GithubLink, Toasts } from '$lib/ui';
	export let data;

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
		<Logo slot="logo" />
		<TopNav {navItems} />
		<GithubLink slot="menu" />
	</Header>

	<slot />

	<Footer slot="footer" />
</PageLayout>

<Toasts />

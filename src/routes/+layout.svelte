<script>
	import { PageLayout, Header, Footer, TopNav, Logo, GithubLink } from '$lib/ui';
	import '@picocss/pico/css/pico.min.css';
	import './styles.css';
</script>

<PageLayout>
	<Header slot="header">
		<Logo slot="logo" />
		<TopNav />
		<GithubLink slot="menu" />
	</Header>

	<slot />

	<Footer slot="footer" />
</PageLayout>

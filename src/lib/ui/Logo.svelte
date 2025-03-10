<script lang="ts">
	interface Props {
		logoUrl?: string;
		shopName?: string;
	}

	let { logoUrl = '', shopName = 'Workstand' }: Props = $props();
</script>

<a href="/">
	<img src={logoUrl} alt={shopName} />
</a>

<style>
	a {
		display: block;
		height: 100%;
	}

	img {
		object-fit: contain;
		max-height: 100%;
	}
</style>

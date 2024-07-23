<script lang="ts">
	export let logoUrl: string = '';
	export let shopName: string = 'Workstand';
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

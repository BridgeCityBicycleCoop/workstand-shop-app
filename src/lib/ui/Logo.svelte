<script lang="ts">
	export const logoUrl: string = '';
	export const shopName: string = '';
</script>

<img src={logoUrl} alt={shopName} />

<style>
	img {
		object-fit: contain;
		max-height: 100%;
	}
</style>

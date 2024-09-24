<script lang="ts">
	export let start = 1;
	export let end = 1;
	export let page = '1';
	export let url: URL;

	const getPreviousHref = (url: URL) => {
		const newUrl = new URL(url);

		const pageAsNumber = parseInt(page, 10);
		if (pageAsNumber === start) {
			return url;
		}
		newUrl.searchParams.set('page', (pageAsNumber - 1).toString());

		return newUrl;
	};

	const getNextHref = (url: URL) => {
		const newUrl = new URL(url);

		const pageAsNumber = parseInt(page, 10);
		if (pageAsNumber === end) {
			return url;
		}
		newUrl.searchParams.set('page', (pageAsNumber + 1).toString());

		return newUrl;
	};
</script>

<div class="pagination-controls">
	<a class="btn btn-primary" href={`${getPreviousHref(url)}`}> Prev </a>
	<div class="current-page">{page}</div>
	<a class="btn btn-primary" href={`${getNextHref(url)}`}> Next </a>
</div>

<style>
	.pagination-controls {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin-top: 1em;
	}

	.current-page {
		font-size: 2em;
	}
</style>

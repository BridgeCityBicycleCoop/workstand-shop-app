<script lang="ts">
	export let totalPages: number;
	export let page;
	export let urlString: string;

	const getPreviousHref = (url: string) => {
		const newUrl = new URL(url);
		let pageTarget = page;

		if (page > 1) {
			pageTarget--;
		}

		newUrl.searchParams.set('page', pageTarget.toString());

		return newUrl;
	};

	const getNextHref = (url: string) => {
		const newUrl = new URL(url);
		let pageTarget = page;

		if (page < totalPages) {
			pageTarget++;
		}

		newUrl.searchParams.set('page', pageTarget.toString());

		return newUrl;
	};
</script>

<div class="pagination-controls">
	<a href={`${getPreviousHref(urlString)}`}>
		<button class="btn btn-primary">Prev</button>
	</a>
	<div class="current-page">{page}</div>
	<a href={`${getNextHref(urlString)}`}>
		<button class="btn btn-primary">Next</button>
	</a>
</div>

<style>
	.pagination-controls {
		display: flex;
		flex-direction: row;
		margin: 0.5em 0em;
	}

	.current-page {
		font-size: 2em;
		margin: 0px 60px;
	}
</style>

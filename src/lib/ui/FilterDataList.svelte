<script lang="ts">
	import type { IsoDateString } from '$lib/server/db/pocketbase/types';
	import { convertAndDownloadCsv } from '$lib/utils';
	import { Pagination } from '$lib/ui';

	export let name: string;
	export let headers: string[];
	export let list: string[][];
	export let startDate: IsoDateString;
	export let endDate: IsoDateString;
	export let page;
	export let totalPages;
	export let urlString;

	const downloadCSV = (_event: MouseEvent) => {
		list.unshift(headers);
		convertAndDownloadCsv(list, name);
	};
</script>

<section class="data-list">
	<form class="filter-list">
		<ul class="wrapper">
			<li class="form-row">
				<span>
					<label for="startDate">Start (optional)</label>
					<input type="date" name="startDate" max={endDate} bind:value={startDate} />
				</span>
				<span>
					<label for="endDate">End (optional)</label>
					<input type="date" name="endDate" min={startDate} bind:value={endDate} />
				</span>
				<span>
					<button class="primary" type="submit">Filter {name}</button>
					<button class="btn btn-secondary" type="reset">Clear Filter</button>
				</span>
			</li>
		</ul>
	</form>

	<button class="btn btn-primary download-csv" on:click={downloadCSV}>Download {name} as CSV</button
	>

	<div class="tableWrap search-result">
		{#if list.length > 0}
			<table>
				<thead>
					<Pagination {urlString} {page} {totalPages} />
					<tr>
						{#each headers as header}
							<th class="sticky-header">{header}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each list as row}
						<tr>
							{#each row as item}
								<td>{item}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No {name} Logged</p>
		{/if}
	</div>
</section>

<style>
	button {
		min-height: var(--admin-button-height);
	}
	.wrapper {
		list-style-type: none;
		padding: 0;
		border-radius: 3px;
	}
	.form-row {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 0.5em;
	}
	.form-row > span {
		padding: 0.5em 1em 0.5em 0;
	}

	thead {
		background: var(color-bg-light);
		height: 60px;
		position: sticky;
		inset-block-start: 0;
	}

	.data-list {
		margin-top: 1rem;
		display: grid;
		grid-template-areas:
			'filter-data'
			'download-csv'
			'search-result';
		row-gap: 0.5rem;
	}

	.filter-list {
		grid-area: filter-data;
	}

	.download-csv {
		grid-area: download-csv;
		justify-self: start;
	}

	.search-result {
		grid-area: search-result;
	}
</style>

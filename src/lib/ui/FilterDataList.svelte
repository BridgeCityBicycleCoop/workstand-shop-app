<script lang="ts">
	import type { IsoDateString } from '$lib/server/db/pocketbase/types';
	import { Pagination } from '$lib/ui';

	interface Props {
		name: string;
		headers: string[];
		list: string[][];
		startDate: IsoDateString;
		endDate: IsoDateString;
		page: any;
		totalPages: any;
		urlString: any;
		downloadPath: string;
	}

	let {
		name,
		headers,
		list,
		startDate = $bindable(),
		endDate = $bindable(),
		page,
		totalPages,
		urlString,
		downloadPath
	}: Props = $props();
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

	<a
		href={downloadPath}
		class="btn btn-primary download-csv"
		download={`${name.toLocaleLowerCase()}.csv`}
	>
		Download {name} as CSV
	</a>

	<div class="tableWrap search-result">
		<Pagination {urlString} {page} {totalPages} />
		{#if list.length > 0}
			<table>
				<thead>
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
		min-height: var(--button-height-admin);
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

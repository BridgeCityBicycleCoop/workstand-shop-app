<script lang="ts">
	import { getDisplayName, getLocaleDisplayDate } from '$lib/ui';
	import { convertAndDownloadCsv } from '$lib/utils';
	import type { Visit } from '$lib/models';

	export let data;

	const formatCsvData = (_event: MouseEvent) => {
		const rows = data.visits.map((visit: Visit) => {
			return [
				getLocaleDisplayDate(visit.date),
				`${visit.member.name} [${visit.member.preferredName}]`,
				visit.purpose.name
			];
		});

		convertAndDownloadCsv(rows, 'Visits');
	};

	let startDate = data.startDate;
	let endDate = data.endDate;
</script>

<section class="activity-list">
	<form class="filter-visits">
		<label for="startDate">Start (optional)</label>
		<input type="date" name="startDate" max={endDate} bind:value={startDate} />

		<label for="endDate">End (optional)</label>
		<input type="date" name="endDate" min={startDate} bind:value={endDate} />

		<button class="primary" type="submit">Filter Visits</button>
	</form>

	<button class="btn btn-primary download-csv" on:click={formatCsvData}
		>Download Visits as CSV</button
	>

	<div class="tableWrap search-result">
		{#if data.visits.length > 0}
			<table>
				<thead>
					<tr>
						<th class="sticky-header">Name</th>
						<th class="sticky-header">Purpose</th>
						<th class="sticky-header">Signed-in At</th>
					</tr>
				</thead>
				<tbody>
					{#each data.visits as visit}
						<tr>
							<td>{getDisplayName(visit.member)}</td>
							<td>{visit.purpose.name}</td>
							<td>{getLocaleDisplayDate(visit.date)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No Visits Logged</p>
		{/if}
	</div>
</section>

<style>
	.activity-list {
		margin-top: 1rem;
		display: grid;
		grid-template-areas:
			'filter-visits'
			'download-csv'
			'search-result';
		row-gap: 2rem;
	}

	.filter-visits {
		grid-area: filter-visits;
	}

	.download-csv {
		grid-area: download-csv;
		justify-self: start;
	}

	.search-result {
		grid-area: search-result;
	}
</style>

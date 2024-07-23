<script lang="ts">
	import { getDisplayName, Modal, ActivitySelect, getLocaleDisplayDate } from '$lib/ui';
	import { convertAndDownloadCsv } from '$lib/utils';
	import type { Visit, Member, Purpose } from '$lib/models';

	export let data;

	let selectedPurpose: Purpose;
	let activeMember: Member | undefined;
	let activeVisit: Visit | undefined;
	let isOpen: boolean;

	const handleVisitUpdate = (_event: MouseEvent, visit: Visit) => {
		activeMember = visit.member;
		activeVisit = visit;
		isOpen = true;
	};

	const handleClose = () => {
		isOpen = false;
		activeMember = undefined;
	};

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
							<td>
								<button
									class="edit-profile link"
									on:click={(event) => handleVisitUpdate(event, visit)}
									>{getDisplayName(visit.member)}
								</button>
							</td>
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

	<Modal bind:open={isOpen}>
		<ActivitySelect
			formId="log-visit"
			formData={data.logVisitForm}
			bind:selectedPurpose
			purposes={data.purposes}
			displayName={getDisplayName(activeMember)}
			{activeMember}
			{activeVisit}
			onSuccess={() => {
				handleClose();
			}}
		/>
		<div slot="buttons">
			<button class="primary" on:click={handleClose}>Cancel</button>
		</div>
	</Modal>
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

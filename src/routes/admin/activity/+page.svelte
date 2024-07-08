<script lang="ts">
	import { formatDistance } from 'date-fns';
	import { getDisplayName } from '$lib/ui/utils';

	import type { Visit } from '$lib/models/visit';
	import type { Member } from '$lib/models/member';
	import type { Purpose } from '$lib/models/purpose';

	import Modal from '$lib/ui/Modal.svelte';
	import ActivitySelect from '$lib/ui/ActivitySelect.svelte';

	export let data;

	let selectedPurpose: Purpose;
	let activeMember: Member | undefined;
	let activeVisit: Visit | undefined;
	let isOpen: boolean;

	const handleVisitUpdate = (event: MouseEvent, visit: Visit) => {
		activeMember = visit.member;
		activeVisit = visit;
		isOpen = true;
	};

	const handleClose = () => {
		isOpen = false;
		activeMember = undefined;
	};
</script>

<pre>[Under Construction]</pre>
<h2>Activity Reporting</h2>

<p>Not sure about this one, but 🤷 some charts and such here</p>

<section class="currently-signed-in">
	<h3>Member Visits</h3>
	<div class="tableWrap">
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
								<button class="edit-profile" on:click={(event) => handleVisitUpdate(event, visit)}
									>{getDisplayName(visit.member)}
								</button>
							</td>
							<td>{visit.purpose.name}</td>
							<td>{formatDistance(visit.date, Date.now(), { addSuffix: true })}</td>
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
			<button class="btn btn-primary" on:click={handleClose}>Cancel</button>
		</div>
	</Modal>
</section>

<style>
	h2 {
		font-weight: bold;
	}

	.currently-signed-in {
		grid-area: activity;
	}

	/* If we use border,
	we must use table-collapse to avoid
	a slight movement of the header row */
	table {
		border-collapse: collapse;
	}

	.edit-profile {
		appearance: unset;
		background-color: transparent;
		border: none;
		color: rgb(var(--color-primary));
		cursor: pointer;
	}
</style>

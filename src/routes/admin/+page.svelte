<script lang="ts">
	import { convertAndDownloadCsv } from '$lib/utils';
	import { formatStringDate } from '$lib/ui/utils';
	import { isValidIsoDateString } from '$lib/models/utils/isValidIsoDateString';
	import { type Member } from '$lib/models';

	export let data;

	let startDate = data.startDate;
	let endDate = data.endDate;

	const downloadCSV = (_event: MouseEvent) => {
		if (data.members.length) {
			const firstMember = data.members[0];
			const headers = Object.keys(firstMember).filter((key) => key !== 'id');
			const csvSource = data.members.map((member: Member) => {
				return headers.map((key) => member[key]);
			});

			csvSource.unshift(headers);

			convertAndDownloadCsv(csvSource, 'Members');
		}
	};
</script>

<pre>[Under Construction]</pre>
<h2>Members Reporting</h2>

<p>We will put reports and csv downloads here in the future</p>

<section class="members-list">
	<h3>Members List</h3>

	<form id="filter-members">
		<label for="startDate">Start (optional)</label>
		<input type="date" name="startDate" max={endDate} bind:value={startDate} />

		<label for="endDate">End (optional)</label>
		<input type="date" name="endDate" min={startDate} bind:value={endDate} />

		<button class="btn btn-primary" type="submit">Filter Members</button>
	</form>

	<br />
	<button class="csv btn-primary" on:click={downloadCSV}>Download Members as CSV</button>

	<br />
	<br />

	<div class="tableWrap">
		{#if data.members.length > 0}
			<table>
				<thead>
					<tr>
						<th class="sticky-header">Waiver Date</th>
						<th class="sticky-header">Name</th>
						<th class="sticky-header">Preferrred Name</th>
						<th class="sticky-header">Pronouns</th>
						<th class="sticky-header">Email</th>
						<th class="sticky-header">Email Consent</th>
						<th class="sticky-header">Postal Code</th>
						<th class="sticky-header">Phone</th>
						<th class="sticky-header">Requires Guardian</th>
						<th class="sticky-header">Guardian Name</th>
						<th class="sticky-header">Notes</th>
					</tr>
				</thead>
				<tbody>
					{#each data.members as member}
						<tr>
							<td>{formatStringDate(member.waiver)}</td>
							<td>{member.name}</td>
							<td>{member.preferredName}</td>
							<td>{member.pronouns}</td>
							<td>{member.email}</td>
							<td>{member.emailConsent}</td>
							<td>{member.postalCode}</td>
							<td>{member.phone}</td>
							<td>{member.requiresGuardian}</td>
							<td>{member.guardianName}</td>
							<td>{member.notes}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No Members Logged</p>
		{/if}
	</div>
</section>

<style>
	h2 {
		font-weight: bold;
	}
</style>

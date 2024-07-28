<script lang="ts">
	import { convertAndDownloadCsv } from '$lib/utils';
	import { getLocaleDisplayDate } from '$lib/ui/utils';
	import { type Member } from '$lib/models';

	export let data;

	let startDate = data.startDate;
	let endDate = data.endDate;

	const downloadCSV = (_event: MouseEvent) => {
		if (data.members.length) {
			const firstMember = data.members[0];
			const headers = (Object.keys(firstMember) as (keyof Member)[]).filter((key) => key !== 'id');
			const csvSource = data.members.map((member: Member) => {
				return headers.map((key) => {
					const memberValue = member[key] ?? '';

					if (memberValue instanceof Date) {
						return getLocaleDisplayDate(memberValue);
					} else {
						return `${memberValue}`;
					}
				});
			});

			csvSource.unshift(headers);

			convertAndDownloadCsv(csvSource, 'Members');
		}
	};
</script>

<section class="members-list">
	<form class="filter-members">
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
					<button class="btn btn-primary" type="submit">Filter Members</button>
					<button class="btn btn-secondary" type="reset">Clear Filter</button>
				</span>
			</li>
		</ul>
	</form>

	<button class="csv btn-primary download-csv" on:click={downloadCSV}
		>Download Members as CSV</button
	>

	<div class="tableWrap search-result">
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
							<td>{getLocaleDisplayDate(member.waiver)}</td>
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

	.members-list {
		margin-top: 1rem;
		display: grid;
		grid-template-areas:
			'filter-members'
			'download-csv'
			'search-result';
		row-gap: 2rem;
	}

	.filter-members {
		grid-area: filter-members;
	}

	.download-csv {
		grid-area: download-csv;
		justify-self: start;
	}

	.search-result {
		grid-area: search-result;
	}
</style>

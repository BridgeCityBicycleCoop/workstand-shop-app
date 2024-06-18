<script lang="ts">
	import { formatDistance } from 'date-fns';
	import ActivitySelect from '$lib/ui/ActivitySelect.svelte';
	import EditMember from '$lib/ui/EditMember.svelte';
	import Modal from '$lib/ui/Modal.svelte';
	import type { Member } from '$lib/models/member.js';
	import type { Purpose } from '$lib/models/purpose';
	import type { FormEventHandler } from 'svelte/elements';
	import type { Visit } from '$lib/models/visit.js';
	import EditOutline from '~icons/mdi/edit-outline';
	import QuestionMark from '~icons/mdi/question-mark';
	import Exclamation from '~icons/mdi/exclamation';

	export let data;

	let selectedPurpose: Purpose;
	let activeMember: Member | undefined;
	let activeVisit: Visit | undefined;

	let isOpen: boolean;
	let isEditingMember: boolean = false;

	let showList: boolean;
	let filteredMemeberList: Member[];
	let searchElement: HTMLInputElement;

	const getDisplayName = (member: Member | undefined): string => {
		if (!member) {
			return '';
		}

		return member?.preferredName ? `${member.name} [${member.preferredName}]` : `${member?.name}`;
	};

	const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
		const filterText = event.currentTarget?.value.toLocaleLowerCase();

		filteredMemeberList = data.members.filter((member) => {
			const memberName = member.name.toLocaleLowerCase();
			const perferredName = member.preferredName?.toLocaleLowerCase();

			return memberName.match(filterText) || perferredName?.match(filterText);
		});

		showList = filterText.length > 1 && filteredMemeberList.length > 0;
	};

	$: signedInMembers = new Set(data.visits.map((visit) => visit.member.id));

	const handleMemberSelect = (event: MouseEvent, member: Member, visitId?: string) => {
		activeMember = member;
		isOpen = true;
	};

	const handleVisitUpdate = (event: MouseEvent, visit: Visit) => {
		activeMember = visit.member;
		activeVisit = visit;
		isOpen = true;
	};

	const handleEditMember = (event: MouseEvent, member: Member) => {
		activeMember = member;
		isEditingMember = true;
	};

	const handleClose = () => {
		isOpen = false;
		isEditingMember = false;
		activeMember = undefined;
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Workstand - A shop application for Bicycle Co-ops" />
</svelte:head>

<div class="signin">
	<div class="members-search">
		<label for="filter">Members: Sign In</label>
		<input on:input={handleInput} name="filter" type="text" bind:this={searchElement} />
	</div>

	<div class="search-results">
		{#if showList}
			{#each filteredMemeberList as member}
				<div class="button-column">
					<button class="status-button" disabled={signedInMembers.has(member.id)}>
						{#if member.status === 'suspended'}
							<QuestionMark />
						{:else if member.status === 'banned'}
							<Exclamation />
						{/if}
					</button>
					<button
						class="signin-button"
						on:click={(event) => handleMemberSelect(event, member)}
						disabled={signedInMembers.has(member.id)}
					>
						{getDisplayName(member)}
					</button>

					<button
						class="edit-button"
						class:button-greyed-out={signedInMembers.has(member.id)}
						on:click={(event) => handleEditMember(event, member)}
					>
						Edit Member
						<EditOutline />
					</button>
				</div>
			{/each}
		{/if}
	</div>

	<div class="currently-signed-in">
		<h3>Signed in today</h3>
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
				<p>No members signed in</p>
			{/if}
		</div>
	</div>
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
			searchElement.value = '';
			searchElement.dispatchEvent(new Event('input', { bubbles: true }));
		}}
	/>
	<div slot="buttons">
		<button on:click={handleClose}>Cancel</button>
	</div>
</Modal>

<Modal bind:open={isEditingMember}>
	<EditMember
		formId="edit-member"
		formData={data.memberUpdateForm}
		displayName={getDisplayName(activeMember)}
		{activeMember}
		onSuccess={() => {
			handleClose();
			searchElement.value = '';
			searchElement.dispatchEvent(new Event('input', { bubbles: true }));
		}}
	/>
	<div slot="buttons" class="log-visit-buttons">
		<button value="cancel-edit" on:click={handleClose}>Cancel</button>
		<button type="submit" form="edit-member" value="confirm-edit">Confirm</button>
	</div>
</Modal>

<style>
	.signin {
		display: grid;
		grid-template-areas:
			'members-search members-search members-search'
			'. search-results .'
			'activity activity activity';
		grid-template-columns: min-content auto min-content;
		grid-template-rows: auto 1fr auto;
		row-gap: 1rem;
		min-height: 100%;
		max-width: 48rem;
		padding-top: 3rem;
		margin: 0 auto;
	}

	.members-search {
		grid-area: members-search;
	}
	.members-search label {
		display: block;
		margin: 30px 0px;
	}
	.members-search input {
		width: 100%;
	}

	.search-results {
		grid-area: search-results;
		display: flex;
		flex-direction: column;
	}

	button {
		min-height: 40px;
		margin: 5px 0px;
	}

	.button-column {
		display: grid;
		grid-template-columns: 0.5fr 10fr 2.5fr;
	}

	.button-column button:not(:last-child) {
		border-right: none; /* Prevent double borders */
	}

	.button-column button:not(:first-child) {
		border-left: none; /* Prevent double borders */
	}

	/* Clear floats (clearfix hack) */
	.button-column:after {
		content: '';
		clear: both;
		display: table;
	}

	/* Add a background color on hover */
	.button-column button:hover {
		background-color: #c4c4c4;
	}

	.button-greyed-out {
		background-color: light-dark(rgba(239, 239, 239, 0.3), rgba(19, 1, 1, 0.3));
		color: light-dark(rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3));
		border-color: light-dark(rgba(118, 118, 118, 0.3), rgba(195, 195, 195, 0.3));
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

	/* Set a fixed scrollable wrapper */
	.tableWrap {
		height: 9em;
		border: 2px solid black;
		overflow: auto;
	}

	/* Set header to stick to the top of the container. */
	thead tr th {
		position: sticky;
		top: 0;
	}

	.edit-profile {
		appearance: unset;
		background-color: transparent;
		border: none;
		color: var(--color-theme-1);
		cursor: pointer;
	}
</style>

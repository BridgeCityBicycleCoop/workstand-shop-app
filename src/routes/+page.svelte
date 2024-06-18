<script lang="ts">
	import { formatDistance } from 'date-fns';
	import { ActivitySelect, EditMember, Modal, Badge } from '$lib/ui';
	import EditOutline from '~icons/mdi/edit-outline';
	import type { FormEventHandler } from 'svelte/elements';
	import type { Member, Purpose, Visit } from '$lib/models';

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

		return member?.preferredName ? `${member.name} [ ${member.preferredName} ]` : `${member?.name}`;
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
		<input type="search" on:input={handleInput} name="filter" bind:this={searchElement} />
	</div>

	<div class="search-results">
		{#if showList}
			{#each filteredMemeberList as member}
				<div role="group">
					{#if member.status === 'suspended'}
						<button class="badge-button">
							<Badge type="suspended" />
						</button>
					{:else if member.status === 'banned'}
						<button class="badge-button">
							<Badge type="banned" />
						</button>
					{/if}
					<button
						class="member-sign-in-button"
						class:suspended={member.status === 'suspended'}
						class:banned={member.status === 'banned'}
						disabled={signedInMembers.has(member.id)}
						on:click={(event) => handleMemberSelect(event, member)}
					>
						{getDisplayName(member)}
					</button>

					<button
						class="edit-button"
						class:button-greyed-out={signedInMembers.has(member.id)}
						on:click={(event) => handleEditMember(event, member)}
					>
						<span class="visually-hidden">Edit Member</span>
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
	<div slot="title">Select <b>{getDisplayName(activeMember)}'s</b> Activity</div>
	<ActivitySelect
		formId="log-visit"
		formData={data.logVisitForm}
		bind:selectedPurpose
		purposes={data.purposes}
		{activeMember}
		{activeVisit}
		onSuccess={() => {
			handleClose();
			searchElement.value = '';
			searchElement.dispatchEvent(new Event('input', { bubbles: true }));
		}}
	/>
	<div slot="buttons">
		<button class="secondary" on:click={handleClose}>Cancel</button>
	</div>
</Modal>

<Modal bind:open={isEditingMember}>
	<div slot="title">Edit <b>{getDisplayName(activeMember)}'s</b> Info</div>
	<EditMember
		formId="edit-member"
		formData={data.memberUpdateForm}
		{activeMember}
		onSuccess={() => {
			handleClose();
			searchElement.value = '';
			searchElement.dispatchEvent(new Event('input', { bubbles: true }));
		}}
	/>
	<div slot="buttons" class="log-visit-buttons">
		<button class="secondary" on:click={handleClose} value="cancel-edit">Cancel</button>
		<button form="edit-member" value="confirm-edit">Confirm</button>
	</div>
</Modal>

<style>
	.signin {
		display: grid;
		grid-template-areas:
			'members-search'
			'search-results'
			'activity';
		grid-template-columns: auto;
		grid-template-rows: auto 1fr auto;
		row-gap: 1rem;
		min-height: 100%;
		padding-top: 3rem;
		margin: 0 auto;
	}

	.members-search {
		grid-area: members-search;
	}

	.search-results {
		grid-area: search-results;
		display: flex;
		flex-direction: column;
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

	.edit-button,
	.badge-button {
		display: flex;
		align-items: center;
		max-width: fit-content;
		--pico-form-element-spacing-horizontal: 1rem;
	}

	.member-sign-in-button {
		text-align: left;
		padding-left: 3.2rem;
	}

	.badge-button + .member-sign-in-button {
		padding-left: 0;
	}
</style>

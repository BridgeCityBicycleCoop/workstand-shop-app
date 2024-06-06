<script lang="ts">
	import ActivitySelect from '$lib/ui/ActivitySelect.svelte';
	import EditMember from '$lib/ui/EditMember.svelte';
	import Modal from '$lib/ui/Modal.svelte';
	import EditOutline from '~icons/mdi/edit-outline';
	import type { Member } from '$lib/models/member.js';
	import type { Purpose } from '$lib/models/purpose';
	import type { FormEventHandler } from 'svelte/elements';
	import { formatDistance } from 'date-fns';

	export let data;

	let selectedPurpose: Purpose;
	let activeMember: Member | undefined;

	let isOpen: boolean;
	let isEditingMember: boolean = false;

	let filterText: string;
	let showList: boolean;
	let filteredMemeberList: Member[];

	const getDisplayName = (member: Member | undefined): string => {
		if (!member) {
			return '';
		}

		return member?.preferredName ? `${member.name} [${member.preferredName}]` : `${member?.name}`;
	};

	const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
		filterText = event.currentTarget?.value.toLocaleLowerCase();

		filteredMemeberList = data.members.filter((member) => {
			const memberName = member.name.toLocaleLowerCase();
			const perferredName = member.preferredName?.toLocaleLowerCase();

			return memberName.match(filterText) || perferredName?.match(filterText);
		});

		showList = filterText.length > 1 && filteredMemeberList.length > 0;
	};

	const handleMemberSelect = (event: MouseEvent, member: Member) => {
		const element = event.target as HTMLButtonElement;
		activeMember = member;
		isOpen = true;
	};

	const handleEditMember = (event: MouseEvent, member: Member) => {
		const element = event.target as HTMLButtonElement;
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
		<input on:input={handleInput} name="filter" type="text" />
	</div>

	<div class="search-results">
		{#if showList}
			{#each filteredMemeberList as member}
				<div class="button-column">
					<button on:click={(event) => handleMemberSelect(event, member)} class="signin-button"
						>{getDisplayName(member)}</button
					>

					<button on:click={(event) => handleEditMember(event, member)} class="edit-button"
						><EditOutline /> Edit Member</button
					>
				</div>
			{/each}
		{/if}
	</div>

	<div class="currently-signed-in">
		<h3>Signed in today</h3>
		{#if data.visits.length > 0}
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Purpose</th>
						<th>Signed-in At</th>
					</tr>
				</thead>
				<tbody>
					{#each data.visits as visit}
						<tr>
							<td>
								<button
									class="edit-profile"
									on:click={(event) => handleEditMember(event, visit.member)}
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

<Modal bind:open={isOpen} onClose={handleClose}>
	<ActivitySelect
		bind:selectedPurpose
		purposes={data.purposes}
		displayName={getDisplayName(activeMember)}
		{activeMember}
	></ActivitySelect>
</Modal>

<Modal bind:open={isEditingMember} onClose={handleClose}>
	<EditMember {activeMember}></EditMember>
</Modal>

<small class="remove-me this-is-just-for-debuggin">
	{#if activeMember}
		<p>Current Member: {getDisplayName(activeMember)}</p>
	{/if}
</small>

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
	}

	.members-search {
		grid-area: members-search;
	}
	.members-search label {
		display: block;
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
		grid-template-columns: 5fr 1fr;
		grid-gap: 5px;
	}

	.currently-signed-in {
		grid-area: activity;
	}

	.edit-profile {
		appearance: unset;
		background-color: transparent;
		border: none;
		color: var(--color-theme-1);
		cursor: pointer;
	}
</style>

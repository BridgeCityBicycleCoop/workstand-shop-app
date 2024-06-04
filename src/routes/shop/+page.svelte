<script lang="ts">
	import { type Member } from '$lib/models/member.js';
	import { type Purpose } from '$lib/models/purpose';
	import ActivitySelect from '$lib/ui/ActivitySelect.svelte';
	import EditMember from '$lib/ui/EditMember.svelte';
	import Modal from '$lib/ui/Modal.svelte';
	import EditOutline from '~icons/mdi/edit-outline';

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

	const handleInput = (event: InputEvent) => {
		const element = event.target as HTMLInputElement;

		filterText = element?.value.toLocaleLowerCase();

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

	const onClose = () => {
		isOpen = false;
		isEditingMember = false;
		activeMember = undefined;
	};
</script>

<svelte:head>
	<title>Shop SignIn</title>
	<meta name="description" content="Shop SignIn" />
</svelte:head>

<div class="text-column">
	<h1>Shop SignIn</h1>
	<label for="filter">Search</label>
	<input on:input={handleInput} name="filter" type="text" />

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
</div>

<Modal bind:open={isOpen}>
	<ActivitySelect
		bind:selectedPurpose
		purposes={data.purposes}
		displayName={getDisplayName(activeMember)}
		{activeMember}
	></ActivitySelect>
</Modal>

<Modal bind:open={isEditingMember}>
	<EditMember {activeMember}></EditMember>
</Modal>

<style>
	.text-column {
		display: flex;
		width: 100%;
		max-width: 48rem;
		flex: 0.2;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
	}

	.search-results {
		display: flex;
		flex-direction: column;
		margin: 20px 0px;
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
</style>

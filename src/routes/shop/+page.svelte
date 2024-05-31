<script lang="ts">
	import { type Member } from '$lib/models/member.js';
	import ActivitySelect from '$lib/ui/ActivitySelect.svelte';
	import Modal from '$lib/ui/Modal.svelte';

	export let data;

	let activeMember: Member;
	let isOpen: boolean;

	let filterText: string;
	let showList: boolean;
	let filteredMemeberList: Member[];

	let memberName: string;
	let perferredName: string | undefined;

	const handleInput = (event: InputEvent) => {
		const element = event.target as HTMLInputElement;

		filterText = element?.value.toLocaleLowerCase();

		filteredMemeberList = data.members.filter((member) => {
			memberName = member.name.toLocaleLowerCase();
			perferredName = member.preferredName?.toLocaleLowerCase();

			return memberName.match(filterText) || perferredName?.toLocaleLowerCase().match(filterText);
		});

		showList = filterText.length > 1 && filteredMemeberList.length > 0;
	};

	const handleClick = (event: MouseEvent, member: Member) => {
		const element = event.target as HTMLButtonElement;
		activeMember = member;
		isOpen = true;
	};

	const closeModal = () => {
		isOpen = false;
	};
</script>

<svelte:head>
	<title>Shop Signin</title>
	<meta name="description" content="Shop Signin" />
</svelte:head>

<div class="text-column">
	<h1>Shop Signin</h1>
	<label for="filter">Search</label>
	<input on:input={handleInput} name="filter" type="text" />

	<div class="search-results">
		{#if showList}
			{#each filteredMemeberList as member}
				<button on:click={(event) => handleClick(event, member)} class="signin-button"
					>{member.name} [{member.preferredName}]</button
				>
			{/each}
		{/if}
	</div>
</div>

<Modal bind:open={isOpen} closeCallback={closeModal} data={{ activeMember }}>
	<ActivitySelect {activeMember}></ActivitySelect>
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

	.signin-button {
		min-height: 40px;
		margin: 5px 0px;
	}
</style>

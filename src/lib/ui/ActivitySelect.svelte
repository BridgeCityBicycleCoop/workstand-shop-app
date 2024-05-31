<script lang="ts">
	import { type Member } from '$lib/models/member';
	import Modal from './Modal.svelte';
	import EditMember from '$lib/ui/EditMember.svelte';

	export let activeMember: Member;
	let isEditingMember: boolean;

	$: getDisplayName = () => {
		let displayName = '';

		if (activeMember.id) {
			displayName = activeMember?.preferredName
				? `${activeMember?.name}  [${activeMember?.preferredName}]`
				: activeMember?.name;
		}

		return displayName;
	};

	function addActivity(activityId: string, activeMember: Member) {
		console.log('addActivity', activityId, activeMember);
	}

	// TODO: pull from DB or config file
	const fetchActivities = () => {
		return [
			{ activityId: 'Volunteer' },
			{ activityId: 'Fix' },
			{ activityId: 'Cleanup' },
			{ activityId: 'Build' }
		];
	};

	const switchToEdit = (event: MouseEvent) => {
		const element = event.target as HTMLButtonElement;
		isEditingMember = true;
	};

	const closeModal = () => {
		isEditingMember = false;
	};

	console.log('mem', activeMember);
</script>

{#if activeMember?.id && !isEditingMember}
	<button on:click={switchToEdit}>Edit Member</button>
	<div class="activity-title">Select {getDisplayName()}'s Activities</div>
	<div class="activity-container">
		{#each fetchActivities() as activity}
			<button
				on:click={(event) => {
					addActivity(activity.activityId, activeMember);
				}}
				>{activity.activityId}
			</button>
		{/each}
	</div>
{:else if activeMember?.id && isEditingMember}
	<Modal bind:open={isEditingMember} closeCallback={closeModal}>
		<EditMember {activeMember}></EditMember>
	</Modal>
{:else}
	<div>Please select a Member</div>
{/if}

<style>
	.activity-title {
		margin: 40px 0px;
	}

	.activity-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 48rem;
		flex: 0.2;
		justify-content: center;
		margin: 0 auto;
	}

	button {
		min-height: 40px;
		margin: 5px 0px;
	}
</style>

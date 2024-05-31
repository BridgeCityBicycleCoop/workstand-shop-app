<script lang="ts">
	import { type Member } from '$lib/models/member';
	import Modal from './Modal.svelte';
	import EditMember from '$lib/ui/EditMember.svelte';

	export let activeMember: Member | null = null;
	let editingMember: boolean;

	const displayName: string | undefined = activeMember?.preferredName
		? `${activeMember?.name}  [${activeMember?.preferredName}]`
		: activeMember?.name;

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

	const switchToEdit = (event: MouseEvent, member: Member) => {
		const element = event.target as HTMLButtonElement;
		activeMember = member;
		editingMember = true;
	};

	const closeModal = () => {
		activeMember = null;
		editingMember = false;
	};

	console.log('mem', activeMember);
</script>

{#if activeMember && !editingMember}
	<button on:click={switchToEdit}>Edit Member</button>
	<div class="activity-title">Select {displayName}'s Activities</div>
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
{:else}
	<Modal bind:open={editingMember} closeCallback={closeModal} data={{ activeMember }}>
		<EditMember bind:activeMember></EditMember>
	</Modal>
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

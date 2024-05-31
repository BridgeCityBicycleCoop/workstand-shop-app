<script lang="ts">
	import { type Member } from '$lib/models/member';
	import Modal from './Modal.svelte';
	import EditMember from '$lib/ui/EditMember.svelte';

	export let activeMember: Member;
	let isEditingMember: boolean;
	let selectedActivity: string;

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

	const setSelectedActivity = (activityId: string): void => {
		selectedActivity = activityId;
	};
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
	<div class="activity-title">Select {getDisplayName()}'s Activity</div>
	<div class="activity-container">
		{#each fetchActivities() as activity}
			<button
				on:click={(event) => {
					setSelectedActivity(activity.activityId);
				}}
				>{activity.activityId}
			</button>
		{/each}
	</div>
	{#if selectedActivity}
		<div class="selected-activity">
			<div>You've selected: <span class="highlight">{selectedActivity}</span></div>
			<div>for {getDisplayName()}</div>
		</div>
	{/if}
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

	.selected-activity {
		display: flex;
		flex-direction: column;
		margin: 30px 0px;
	}

	.highlight {
		margin-left: 0.5em;
		font-size: larger;
		font-weight: bold;
	}
</style>

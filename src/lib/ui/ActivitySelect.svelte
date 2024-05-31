<script lang="ts">
	import { type Member } from '$lib/models/member';
	// import { add } from '$lib/server/db/pocketbase/members';

	export let activeMember: Member | null = null;

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

	console.log('mem', activeMember);
</script>

{#if activeMember}
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

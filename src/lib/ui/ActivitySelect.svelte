<script lang="ts">
	import { type Member } from '$lib/models/member';
	import { type Purpose } from '$lib/models/purpose';

	export let activeMember: Member | undefined;
	export let selectedPurpose: Purpose;
	export let purposes: Purpose[];
	export let displayName: string;
</script>

{#if activeMember?.id}
	<div class="activity-title">Select {displayName}'s Activity</div>
	<div class="activity-container">
		{#each purposes as purpose}
			<button
				on:click={(event) => {
					selectedPurpose = purpose;
				}}
				>{purpose.name}
			</button>
		{/each}
	</div>

	<div class="selected-activity">
		<div>
			You've selected: <span class="highlight">{selectedPurpose ? selectedPurpose.name : ''}</span>
		</div>
		<div>for {displayName}</div>
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

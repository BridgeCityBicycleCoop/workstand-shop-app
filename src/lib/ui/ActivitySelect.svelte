<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { type Member } from '$lib/models/member';
	import { type Visit } from '$lib/models/visit';
	import { type Purpose } from '$lib/models/purpose';

	export let formId: string;
	export let activeMember: Member | undefined;
	export let selectedPurpose: Purpose | undefined;
	export let activeVisit: Visit | undefined;
	export let purposes: Purpose[];
	export let displayName: string;
	export let onSuccess = () => {};
	export let formData: SuperValidated<
		{
			memberId: string;
			purposeId: string;
		},
		unknown,
		{
			memberId: string;
			purposeId: string;
		}
	>;

	const { enhance } = superForm(formData, {
		onUpdated: onSuccess
	});
</script>

{#if activeMember?.id}
	<form id={formId} method="post" action="?/logVisit" use:enhance>
		<div class="activity-title">Select {displayName}'s Activity</div>
		<div class="activity-container">
			{#each purposes as purpose}
				<button
					class="btn btn-primary"
					on:click={() => {
						selectedPurpose = purpose;
					}}
					>{purpose.name}
				</button>
			{/each}
		</div>

		<div class="selected-activity">
			<div>
				You've selected: <span class="highlight">{activeVisit ? activeVisit.purpose.name : ''}</span
				>
			</div>
			<div>for {displayName}</div>
		</div>
		<input type="hidden" name="memberId" value={activeMember.id} />
		<input type="hidden" name="purposeId" value={selectedPurpose ? selectedPurpose.id : ''} />
		<input type="hidden" name="visitId" value={activeVisit ? activeVisit.id : ''} />
	</form>
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

<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import type { Member, Visit, Purpose } from '$lib/models';

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
		<div class="activity-title">Select <b>{displayName}</b>'s activity for today</div>
		<div class="activity-container">
			{#each purposes as purpose}
				<button
					class="primary option"
					on:click={() => {
						selectedPurpose = purpose;
					}}
					>{purpose.name}
				</button>
			{/each}
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
		margin-bottom: 40px;
	}

	.activity-container {
		display: flex;
		flex-direction: column;
		max-width: 100%;
		gap: 0.5rem;
	}

	.option {
		/* makes the option buttons slightly smaller than usual */
		min-height: 40px;
	}
</style>

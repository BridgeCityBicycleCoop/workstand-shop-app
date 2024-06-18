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
	export let onSuccess = (result: any) => {};
	export let formData: SuperValidated<
		{
			memberId: string;
			purposeId: string;
		},
		any,
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
		<div class="activity-container">
			{#each purposes as purpose}
				<button
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
	.activity-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 48rem;
		flex: 0.2;
		justify-content: center;
		margin: 0 auto;
	}
</style>

<script lang="ts">
	import { getContext } from 'svelte';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import type { Member, Visit, Purpose } from '$lib/models';
	import type { Writable } from 'svelte/store';

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

	const { enhance, delayed, submitting } = superForm(formData, {
		onUpdated: onSuccess
	});

	const loading = getContext<Writable<boolean>>('loading-store');
	$: $loading = $delayed;
</script>

{#if activeMember?.id}
	<form id={formId} method="post" action="?/logVisit" use:enhance>
		<div class="activity-title">Select <b>{displayName}</b>'s activity for today</div>
		<slot />
		<div class="activity-container">
			{#each purposes as purpose}
				<button
					class="primary option"
					on:click={() => {
						selectedPurpose = purpose;
					}}
					data-loading={$submitting && selectedPurpose === purpose}
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
		margin-bottom: 1rem;
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

<script lang="ts">
	import { run } from 'svelte/legacy';

	import { getContext } from 'svelte';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import type { Member, Visit, Purpose } from '$lib/models';
	import type { Writable } from 'svelte/store';

	interface Props {
		formId: string;
		activeMember: Member | undefined;
		selectedPurpose: Purpose | undefined;
		activeVisit: Visit | undefined;
		purposes: Purpose[];
		displayName: string;
		onSuccess?: any;
		formData: SuperValidated<
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
		children?: import('svelte').Snippet;
	}

	let {
		formId,
		activeMember,
		selectedPurpose = $bindable(),
		activeVisit,
		purposes,
		displayName,
		onSuccess = () => {},
		formData,
		children
	}: Props = $props();

	const { enhance, delayed, submitting } = superForm(formData, {
		onUpdated: onSuccess
	});

	const loading = getContext<Writable<boolean>>('loading-store');
	run(() => {
		$loading = $delayed;
	});
</script>

{#if activeMember?.id}
	<form id={formId} method="post" action="?/logVisit" use:enhance>
		<div class="activity-title">Select <b>{displayName}</b>'s activity for today</div>
		{@render children?.()}
		<div class="activity-container">
			{#each purposes as purpose}
				<button
					class="primary option"
					onclick={() => {
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

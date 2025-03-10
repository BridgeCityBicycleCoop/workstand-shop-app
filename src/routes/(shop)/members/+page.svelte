<script lang="ts">
	import { run } from 'svelte/legacy';

	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import {
		LiabilityWaiver,
		MemberEditFields,
		addToast,
		ActivitySelect,
		Modal,
		getDisplayName
	} from '$lib/ui';
	import type { Writable } from 'svelte/store';
	import MemberRightsAndGuidelines from '$lib/ui/MemberRightsAndGuidelines.svelte';
	import type { Member, Purpose, Visit } from '$lib/models';

	let { data } = $props();

	let selectedPurpose: Purpose | undefined = $state();
	let activeMember: Member | undefined = $state();
	let activeVisit: Visit | undefined;
	let isOpen: boolean = $state(false);

	const { form, errors, enhance, message, delayed, submitting } = superForm(
		data.registerMemberForm,
		{
			onUpdated(event) {
				if ($message) {
					addToast({
						type: event.form.valid ? 'success' : 'error',
						message: $message.text,
						timeout: 3000
					});
				}
				if ($errors._errors?.length) {
					$errors._errors.forEach((message) => {
						addToast({
							type: 'error',
							message,
							timeout: 3000
						});
					});
				}
				if (event.form.valid && event.form.message.member) {
					activeMember = event.form.message.member;
					isOpen = true;
				}
			}
		}
	);

	const handleClose = () => {
		isOpen = false;
		activeMember = undefined;
	};

	const loading = getContext<Writable<boolean>>('loading-store');
	run(() => {
		$loading = $delayed;
	});
</script>

<section class="register-member">
	<h1>Register New Member</h1>

	<form id="register-member" method="POST" action="?/registerMember" use:enhance>
		<MemberEditFields memberForm={form} {errors} />
	</form>

	<LiabilityWaiver
		name={$form.name}
		requiresGuardian={$form.requiresGuardian}
		guardianName={$form.guardianName}
	/>

	<MemberRightsAndGuidelines
		name={$form.name}
		requiresGuardian={$form.requiresGuardian}
		guardianName={$form.guardianName}
	/>

	<div class="register-member-buttons">
		<button class="primary" onclick={() => goto('/')}>Cancel Registration</button>
		<button class="primary" data-loading={$submitting} type="submit" form="register-member">
			Click to Agree to Waiver
		</button>
	</div>
</section>

<Modal bind:open={isOpen}>
	<ActivitySelect
		formId="log-visit"
		formData={data.logVisitForm}
		bind:selectedPurpose
		purposes={data.purposes}
		displayName={getDisplayName(activeMember)}
		{activeMember}
		{activeVisit}
		onSuccess={handleClose}
	></ActivitySelect>
	{#snippet buttons()}
		<div>
			<button class="primary" onclick={handleClose}>Cancel</button>
		</div>
	{/snippet}
</Modal>

<style>
	h1 {
		margin-bottom: 0;
	}
	.register-member {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2em;
		min-width: 50%;
		max-width: 80%;
		margin: auto;
	}
</style>

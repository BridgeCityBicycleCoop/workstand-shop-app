<script lang="ts">
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { LiabilityWaiver, MemberEditFields, addToast } from '$lib/ui';
	import type { Writable } from 'svelte/store';

	export let data;

	const { form, errors, enhance, message, delayed, submitting } = superForm(data.form, {
		onUpdated(event) {
			if ($message) {
				addToast({
					type: event.form.valid ? 'success' : 'error',
					message: $message,
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
			if (event.form.valid) {
				goto('/');
			}
		}
	});

	const loading = getContext<Writable<boolean>>('loading-store');
	$: $loading = $delayed;
</script>

<section class="register-member">
	<h1>Register New Member</h1>

	<form id="register-member" method="POST" use:enhance>
		<MemberEditFields memberForm={form} {errors} />
	</form>

	<LiabilityWaiver
		name={$form.name}
		requiresGuardian={$form.requiresGuardian}
		guardianName={$form.guardianName}
	/>

	<div class="register-member-buttons">
		<button class="primary" on:click={() => goto('/')}>Cancel Registration</button>
		<button class="primary" data-loading={$submitting} type="submit" form="register-member">
			Click to Agree to Waiver
		</button>
	</div>
</section>

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

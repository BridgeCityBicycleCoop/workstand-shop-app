<script lang="ts">
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { LiabilityWaiver, MemberEditFields, addToast } from '$lib/ui';

	export let data;

	const { form, errors, enhance, message } = superForm(data.form, {
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
		}
	});
</script>

<section class="register-member">
	<div>
		<h1>Register New Member</h1>
	</div>

	<div class="form-container">
		<form id="register-member" method="POST" use:enhance>
			<MemberEditFields memberForm={form} {errors} />
		</form>
	</div>

	<LiabilityWaiver
		name={$form.name}
		requiresGuardian={$form.requiresGuardian}
		guardianName={$form.guardianName}
	></LiabilityWaiver>
	<div class="register-member-buttons">
		<button class="btn btn-primary" on:click={() => goto('/')}>Cancel Registration</button>
		<button class="btn btn-primary" type="submit" form="register-member"
			>Click to Agree to Waiver</button
		>
	</div>
</section>

<style>
	.register-member {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 50%;
		max-width: 80%;
		margin: auto;
	}
</style>

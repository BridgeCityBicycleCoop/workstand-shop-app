<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import LiabilityWaiver from '$lib/ui/LiabilityWaiver.svelte';

	export let data;

	const { form, errors, enhance, message } = superForm(data.form);
</script>

<div>
	<div>
		<h1>Register New Member</h1>
	</div>
	<div class="form-container">
		<form id="register-member" method="POST" use:enhance>
			<label for="name">Name</label>
			<input type="text" name="name" bind:value={$form.name} />

			<label for="preferredName">Preferred Name</label>
			<input type="text" name="preferredName" bind:value={$form.preferredName} />

			<label for="pronouns">Pronouns</label>
			<input type="text" name="pronouns" bind:value={$form.pronouns} />

			<label for="email">Email</label>
			<input type="email" name="email" bind:value={$form.email} />

			<label for="emailConsent"> Email Consent </label>
			<input type="checkbox" name="emailConsent" bind:checked={$form.emailConsent} />

			<label for="phone">Phone</label>
			<input type="tel" name="phone" bind:value={$form.phone} />

			<label for="requiresGuardian">Under 18 ?</label>
			<input type="checkbox" name="requiresGuardian" bind:checked={$form.requiresGuardian} />

			{#if $form.requiresGuardian}
				<label for="guardianName">Guardian Name</label>
				<input type="text" name="guardianName" bind:value={$form.guardianName} />
			{/if}

			<label for="postalCode">Postal Code</label>
			<input type="text" name="postalCode" bind:value={$form.postalCode} />

			<label for="notes">Notes</label>
			<textarea rows="4" name="notes" bind:value={$form.notes}></textarea>

			{#if $message}
				<div class="message">{$message}</div>
			{/if}
			{#if $errors.name}
				<div class="errors">{$errors.name}</div>
			{/if}
		</form>
	</div>

	<br />
	<LiabilityWaiver
		name={$form.name}
		requiresGuardian={$form.requiresGuardian}
		guardianName={$form.guardianName}
	></LiabilityWaiver>
	<div class="register-member-buttons">
		<button type="submit" form="register-member">Click to Agree to Waiver</button>
		<button>Cancel Member Registration</button>
	</div>
</div>

<style>
	.form-container {
		display: flex;
		justify-content: center;
		min-width: 50%;
	}

	.message {
		font-weight: bold;
		color: rebeccapurple;
	}

	form {
		display: grid;
		grid-template-columns: max-content max-content;
		grid-gap: 5px;
	}

	form label {
		text-align: left;
	}

	form label:after {
		content: ':';
	}

	input {
		padding: 12px 20px;
		margin: 4px 0px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}

	textarea {
		padding: 12px 20px;
		margin: 4px 0px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}

	button {
		min-height: 40px;
		margin: 25px 10px;
	}
</style>

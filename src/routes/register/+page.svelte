<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import LiabilityWaiver from '$lib/ui/LiabilityWaiver.svelte';
	import ToggleSwitch from '$lib/ui/ToggleSwitch.svelte';

	export let data;

	const { form, errors, enhance, message } = superForm(data.form);
</script>

<div class="register-page">
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
			<input type="text" name="pronouns" list="common-pronouns" bind:value={$form.pronouns} />
			<datalist id="common-pronouns">
				<option value="he/him/his" />
				<option value="she/her/hers" />
				<option value="they/them/theirs" />
			</datalist>

			<label for="email">Email</label>
			<input type="email" name="email" bind:value={$form.email} />

			{#if $errors.email}
				<div class="errors">{$errors.email}</div>
			{/if}

			<ToggleSwitch
				labelText="Email Consent"
				inputName="emailConsent"
				bind:checked={$form.emailConsent}
			/>

			<label for="phone">Phone</label>
			<input type="tel" name="phone" bind:value={$form.phone} />

			<ToggleSwitch
				labelText="Requires Guardian"
				inputName="requiresGuardian"
				bind:checked={$form.requiresGuardian}
			/>

			{#if $form.requiresGuardian}
				<label for="guardianName">Guardian Name</label>
				<input type="text" name="guardianName" bind:value={$form.guardianName} />
			{/if}

			<label for="postalCode">Postal Code</label>
			<input type="text" name="postalCode" bind:value={$form.postalCode} />

			<label for="notes">Notes</label>
			<textarea rows="4" name="notes" bind:value={$form.notes}></textarea>

			<input type="hidden" name="status" value="active" />
		</form>
	</div>

	<br />
	{#if $message}
		<div class="message-container">
			{#if typeof $message === 'string'}
				<div class="message">{$message}</div>
			{:else}
				{#each Object.entries($message) as [key, val]}
					<div class="message">ERROR: {val}</div>
				{/each}
			{/if}
		</div>
	{/if}

	<br />
	<LiabilityWaiver
		name={$form.name}
		requiresGuardian={$form.requiresGuardian}
		guardianName={$form.guardianName}
	></LiabilityWaiver>
	<div class="register-member-buttons">
		<button class="btn btn-primary" type="reset" form="register-member">Cancel Registration</button>
		<button class="btn btn-primary" type="submit" form="register-member"
			>Click to Agree to Waiver</button
		>
	</div>
</div>

<style>
	.register-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 50%;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	form {
		display: grid;
		grid-template-columns: max-content max-content;
		grid-gap: 5px;
	}

	.message-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.message {
		font-weight: bold;
		color: rebeccapurple;
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
		padding: 10px 30px;
	}
</style>

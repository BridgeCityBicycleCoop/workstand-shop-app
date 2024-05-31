<script lang="ts">
	import SuperDebug, { superForm, dateProxy } from 'sveltekit-superforms';

	export let data;

	const { form, errors, enhance, message } = superForm(data.form);
	const proxyDate = dateProxy(form, 'waiver', { format: 'date' });
</script>

{#if import.meta.env.MODE === 'developmen'}
	<SuperDebug data={$form} />
{/if}

<div>
	<div>
		<h1>Register New Member</h1>
	</div>
	<div class="form-container">
		<form method="POST">
			<label for="name">Name</label>
			<input type="text" name="name" bind:value={$form.name} />

			<label for="preferredName">Preferred Name</label>
			<input type="text" name="preferredName" bind:value={$form.preferredName} />

			<label for="email">Email</label>
			<input type="email" name="email" bind:value={$form.email} />

			<label for="emailConsent">
				Email Consent
				<input type="checkbox" name="emailConsent" bind:checked={$form.emailConsent} />
			</label>

			<label for="phone">Phone</label>
			<input type="tel" name="phone" bind:value={$form.phone} />

			<label for="requiresGuardian">
				Requires Guardian
				<input type="checkbox" name="requiresGuardian" bind:checked={$form.requiresGuardian} />
			</label>

			<label for="guardianName">Guardian Name</label>
			<input type="text" name="guardianName" bind:value={$form.guardianName} />

			<label for="postalCode">Postal Code</label>
			<input type="text" name="postalCode" bind:value={$form.postalCode} />

			<label for="active">
				Active
				<input type="checkbox" name="active" bind:checked={$form.active} />
			</label>

			<label for="banned">
				Banned
				<input type="checkbox" name="banned" bind:checked={$form.banned} />
			</label>

			<label for="suspended">
				Suspended
				<input type="checkbox" name="suspended" bind:checked={$form.suspended} />
			</label>

			<label for="waiver">Waiver Date <small>(05/20/2024)</small></label>
			<input type="date" name="waiver" bind:value={$proxyDate} />

			<label for="notes">Notes</label>
			<textarea name="notes" bind:value={$form.notes}></textarea>

			{#if $message}
				<div class="message">{$message}</div>
			{/if}
			<button>Register</button>
		</form>
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
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	small {
		margin: 4px 4px;
	}

	input {
		padding: 12px 20px;
		margin: 4px 0px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}
</style>

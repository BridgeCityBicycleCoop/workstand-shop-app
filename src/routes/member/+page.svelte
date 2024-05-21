<script lang="ts">
	/** @type {import('./$types').PageData} */
	import SuperDebug, { superForm, dateProxy } from 'sveltekit-superforms';

	const mode = import.meta.env.MODE;

	export let data;

	const { form, errors, enhance } = superForm(data.form);

	const proxyDate = dateProxy(form, 'dateOfBirth', { format: 'date' });
</script>

<!-- {#if mode === 'development'}
	<SuperDebug data={$form} />
{/if} -->

<div>
	<div>
		<h1>Update Member</h1>
	</div>
	<div class="form-container">
		<form method="POST" action="?/update" use:enhance>
			<label for="name">Name</label>
			<input type="text" name="name" bind:value={$form.name} />
			{#if $errors.name}
				<small>{$errors.name}</small>
			{:else}
				<small></small>
			{/if}

			<label for="preferredName">Preferred Name</label>
			<input type="text" name="preferredName" bind:value={$form.preferredName} />
			{#if $errors.name}
				<small>{$errors.name}</small>
			{:else}
				<small></small>
			{/if}

			<label for="email">Email</label>
			<input type="email" name="email" bind:value={$form.email} />
			{#if $errors.email}
				<small>{$errors.email}</small>
			{:else}
				<small></small>
			{/if}

			<label for="emailConsent">
				Email Consent
				<input type="checkbox" name="emailConsent" bind:value={$form.emailConsent} />
			</label>
			{#if $errors.emailConsent}
				<small>{$errors.emailConsent}</small>
			{:else}
				<small></small>
			{/if}

			<label for="phone">Phone</label>
			<input type="tel" name="phone" bind:value={$form.phone} />
			{#if $errors.phone}
				<small>{$errors.phone}</small>
			{:else}
				<small></small>
			{/if}

			<label for="dateOfBirth">Date of Birth</label>
			<input type="date" name="dateOfBirth" bind:value={$proxyDate} />
			{#if $errors.dateOfBirth}
				<small>{$errors.dateOfBirth}</small>
			{:else}
				<small></small>
			{/if}

			<label for="guardianName">Guardian Name</label>
			<input type="text" name="guardianName" bind:value={$form.guardianName} />
			{#if $errors.guardianName}
				<small>{$errors.guardianName}</small>
			{:else}
				<small></small>
			{/if}

			<label for="postalCode">Postal Code</label>
			<input type="text" name="postalCode" bind:value={$form.postalCode} />
			{#if $errors.postalCode}
				<small>{$errors.postalCode}</small>
			{:else}
				<small></small>
			{/if}

			<label for="notes">Notes</label>
			<input type="text" name="notes" bind:value={$form.notes} />
			{#if $errors.notes}
				<small>{$errors.notes}</small>
			{:else}
				<small></small>
			{/if}

			<button>Update</button>
		</form>
	</div>
</div>

<style>
	.form-container {
		display: flex;
		justify-content: center;
		min-width: 50%;
	}

	form {
		display: flex;
		flex-direction: column;
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

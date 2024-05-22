<script lang="ts">
	/** @type {import('./$types').PageData} */
	import SuperDebug, { superForm, dateProxy } from 'sveltekit-superforms';

	const mode = import.meta.env.MODE;

	export let data;

	const { form, errors, enhance } = superForm(data.form);
	const proxyDate = dateProxy(form, 'waiver', { format: 'date' });

	async function register(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		console.log('register data', data);

		await fetch('/api/members', {
			method: 'POST',
			body: data
		});
	}
</script>

{#if mode === 'development'}
	<SuperDebug data={$form} />
{/if}

<div>
	<div>
		<h1>Register New Member</h1>
	</div>
	<div class="form-container">
		<form method="POST">
			<label for="name">Name</label>
			<input type="text" name="name" />

			<label for="preferredName">Preferred Name</label>
			<input type="text" name="preferredName" bind:value={$form.preferredName} />
			{#if $errors.name}
				<small>{$errors.name}</small>
			{:else}
				<small></small>
			{/if}

			<label for="email">Email</label>
			<input type="email" name="email" />
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

			<label for="requiresGuardian">
				Requires Guardian
				<input type="checkbox" name="requiresGuardian" bind:value={$form.requiresGuardian} />
			</label>
			{#if $errors.requiresGuardian}
				<small>{$errors.requiresGuardian}</small>
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

			<label for="active">
				Active
				<input type="checkbox" name="active" bind:value={$form.active} />
			</label>
			{#if $errors.active}
				<small>{$errors.active}</small>
			{:else}
				<small></small>
			{/if}

			<label for="banned">
				Banned
				<input type="checkbox" name="banned" bind:value={$form.banned} />
			</label>
			{#if $errors.banned}
				<small>{$errors.banned}</small>
			{:else}
				<small></small>
			{/if}

			<label for="suspended">
				Suspended
				<input type="checkbox" name="suspended" bind:value={$form.suspended} />
			</label>
			{#if $errors.suspended}
				<small>{$errors.suspended}</small>
			{:else}
				<small></small>
			{/if}

			<label for="waiver">Waiver Date</label>
			<input type="date" name="waiver" bind:value={$proxyDate} />
			{#if $errors.waiver}
				<small>{$errors.waiver}</small>
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

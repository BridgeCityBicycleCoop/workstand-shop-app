<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { type Member } from '$lib/models/member';

	export let formId: string;
	export let activeMember: Member | undefined;
	export let displayName: string;
	export let onSuccess = (result: any) => {};
	export let formData: SuperValidated<{ id: string }, any, { id: string }>;

	const { enhance } = superForm(formData, {
		onUpdated: onSuccess
	});
</script>

{#if activeMember?.id}<div>Edit {displayName}'s Info</div>
	<br />
	<div class="form-container">
		<form id={formId} method="post" action="?/updateMember" use:enhance>
			<label for="name">Name</label>
			<input type="text" name="name" bind:value={activeMember.name} />

			<label for="preferredName">Preferred Name</label>
			<input type="text" name="preferredName" bind:value={activeMember.preferredName} />

			<label for="pronouns">Pronouns</label>
			<input type="text" name="pronouns" bind:value={activeMember.pronouns} />

			<label for="email">Email</label>
			<input type="email" name="email" bind:value={activeMember.email} />

			<label for="emailConsent"> Email Consent </label>
			<input type="checkbox" name="emailConsent" bind:checked={activeMember.emailConsent} />

			<label for="phone">Phone</label>
			<input type="tel" name="phone" bind:value={activeMember.phone} />

			<label for="requiresGuardian"> Requires Guardian </label>
			<input type="checkbox" name="requiresGuardian" bind:checked={activeMember.requiresGuardian} />

			<label for="guardianName">Guardian Name</label>
			<input type="text" name="guardianName" bind:value={activeMember.guardianName} />

			<label for="postalCode">Postal Code</label>
			<input type="text" name="postalCode" bind:value={activeMember.postalCode} />

			<label for="status"> Status </label>
			<select name="status" bind:value={activeMember.status}>
				{#each Object.entries(memberSchema.shape.status.enum) as [label, value]}
					<option {value}>{label}</option>
				{/each}
			</select>

			<label for="notes">Notes</label>
			<textarea rows="8" name="notes" bind:value={activeMember.notes}></textarea>

			<input type="hidden" name="id" value={activeMember.id} />
		</form>
	</div>
{:else}
	<div>Please select a Member</div>
{/if}

<style>
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
</style>

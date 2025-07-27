<script lang="ts">
	import { type MemberUpdate, type MemberCreate, memberSchema } from '$lib/models/member';
	import type { SuperForm } from 'sveltekit-superforms';
	import Field from './Field.svelte';

	type MemberForm = Omit<MemberUpdate, 'waiver'> | (MemberCreate & { id?: string });

	interface Props {
		memberForm: SuperForm<MemberForm>['form'];
		errors: SuperForm<MemberForm>['errors'];
	}

	let { memberForm, errors }: Props = $props();
</script>

<fieldset>
	<Field name="name" errors={$errors.name} bind:value={$memberForm.name}>Full Name</Field>
	<Field name="preferredName" errors={$errors.preferredName} bind:value={$memberForm.preferredName}
		>Preferred Name</Field
	>
	<Field
		name="pronouns"
		list="common-pronouns"
		errors={$errors.pronouns}
		bind:value={$memberForm.pronouns}>Pronouns</Field
	>
	<datalist id="common-pronouns">
		<option value="he/him/his"></option>
		<option value="she/her/hers"></option>
		<option value="they/them/theirs"></option>
	</datalist>
	<Field name="email" type="email" errors={$errors.email} bind:value={$memberForm.email}
		>Email</Field
	>
	<Field name="emailConsent" type="toggle" bind:checked={$memberForm.emailConsent}>
		Email Consent
	</Field>
	<Field name="volunteerConsent" type="toggle" bind:checked={$memberForm.volunteerConsent}>
		Open to Volunteer
	</Field>
	<Field name="phone" errors={$errors.phone} bind:value={$memberForm.phone}>Phone</Field>
	<Field name="requiresGuardian" type="toggle" bind:checked={$memberForm.requiresGuardian}>
		Requires Guardian
	</Field>
	{#if $memberForm.requiresGuardian}
		<Field name="guardianName" errors={$errors.guardianName} bind:value={$memberForm.guardianName}
			>Guardian Name</Field
		>
	{/if}
	<Field name="postalCode" errors={$errors.postalCode} bind:value={$memberForm.postalCode}
		>Postal Code</Field
	>
	{#if $memberForm.id}
		<Field
			name="status"
			type="select"
			options={Object.entries(memberSchema.shape.status.enum)}
			errors={$errors.status}
			bind:value={$memberForm.status}
		>
			Status
		</Field>
	{/if}
	<Field name="notes" type="textarea" rows={4} errors={$errors.notes} bind:value={$memberForm.notes}
		>Notes</Field
	>
	{#if $memberForm.id}
		<input type="hidden" name="id" bind:value={$memberForm.id} />
	{/if}
</fieldset>

<style>
	fieldset {
		all: unset;
		display: grid;
		grid-template-columns: max-content minmax(100px, 1fr);
		grid-gap: 5px;
	}
</style>

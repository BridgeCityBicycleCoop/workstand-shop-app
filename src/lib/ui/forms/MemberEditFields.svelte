<script lang="ts">
	import { type MemberUpdate, type MemberCreate, memberSchema } from '$lib/models/member';
	import type { SuperForm } from 'sveltekit-superforms';
	import Field from './Field.svelte';

	type MemberForm = MemberUpdate | (MemberCreate & { id?: string });

	export let memberForm: SuperForm<MemberForm>['form'];
	export let errors: SuperForm<MemberForm>['errors'];
</script>

<fieldset>
	<Field name="name" bind:value={$memberForm.name}>Name</Field>
	<Field name="preferredName" bind:value={$memberForm.preferredName}>Preferred Name</Field>
	<Field name="pronouns" list="common-pronouns" bind:value={$memberForm.pronouns}>Pronouns</Field>
	<datalist id="common-pronouns">
		<option value="he/him/his" />
		<option value="she/her/hers" />
		<option value="they/them/theirs" />
	</datalist>
	<Field name="email" type="email" bind:value={$memberForm.email}>Email</Field>
	{#if $errors?.email}
		<div class="errors">{$errors?.email}</div>
	{/if}
	<Field name="emailConsent" type="toggle" bind:checked={$memberForm.emailConsent}>
		Email Consent
	</Field>
	<Field name="phone" bind:value={$memberForm.phone}>Phone</Field>
	<Field name="requiresGuardian" type="toggle" bind:checked={$memberForm.requiresGuardian}>
		Requires Guardian
	</Field>
	{#if $memberForm.requiresGuardian}
		<Field name="guardianName" bind:value={$memberForm.guardianName}>Guardian Name</Field>
	{/if}
	<Field name="postalCode" bind:value={$memberForm.postalCode}>Postal Code</Field>
	{#if $memberForm.id}
		<Field
			name="status"
			type="select"
			options={Object.entries(memberSchema.shape.status.enum)}
			bind:value={$memberForm.status}
		>
			Status
		</Field>
	{/if}
	<Field name="notes" type="textarea" rows="4" bind:value={$memberForm.notes}>Notes</Field>
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

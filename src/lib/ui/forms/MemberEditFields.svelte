<script lang="ts">
	import { type Member, memberSchema } from '$lib/models/member';
	import Field from './Field.svelte';

	export let member: Omit<Member, 'id'> & { id?: Member['id'] };
	export let errors: Record<string, unknown> | undefined = undefined;
</script>

<fieldset>
	<Field name="name" bind:value={member.name}>Name</Field>
	<Field name="preferredName" bind:value={member.preferredName}>Preferred Name</Field>
	<Field name="pronouns" list="common-pronouns" bind:value={member.pronouns}>Pronouns</Field>
	<datalist id="common-pronouns">
		<option value="he/him/his" />
		<option value="she/her/hers" />
		<option value="they/them/theirs" />
	</datalist>
	<Field name="email" type="email" bind:value={member.email}>Email</Field>
	{#if errors?.email}
		<div class="errors">{errors?.email}</div>
	{/if}
	<Field name="emailConsent" type="toggle" bind:checked={member.emailConsent}>Email Consent</Field>
	<Field name="phone" bind:value={member.phone}>Phone</Field>
	<Field name="requiresGuardian" type="toggle" bind:checked={member.requiresGuardian}>
		Requires Guardian
	</Field>
	{#if member.requiresGuardian}
		<Field name="guardianName" bind:value={member.guardianName}>Guardian Name</Field>
	{/if}
	<Field name="postalCode" bind:value={member.postalCode}>Postal Code</Field>
	{#if member.id}
		<Field
			name="status"
			type="select"
			options={Object.entries(memberSchema.shape.status.enum)}
			bind:value={member.status}
		>
			Status
		</Field>
	{/if}
	<Field name="notes" type="textarea" rows="4" bind:value={member.notes}>Notes</Field>
	{#if member.id}
		<input type="hidden" name="id" value={member.id} />
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

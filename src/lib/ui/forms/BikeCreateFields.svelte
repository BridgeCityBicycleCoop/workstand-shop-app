<script lang="ts">
	import type { BikeCreate } from '$lib/models';
	import type { SuperForm } from 'sveltekit-superforms';
	import Field from './Field.svelte';

	type BikeForm = BikeCreate & { id?: string };

	export let bikeForm: SuperForm<BikeForm>['form'];
	export let errors: SuperForm<BikeForm>['errors'];
</script>

<fieldset>
	<Field name="serialNumber" bind:value={$bikeForm.serialNumber}>Serial Number</Field>
	<Field name="make" bind:value={$bikeForm.make}>Make</Field>
	<Field name="colour" bind:value={$bikeForm.colour}>Colour</Field>
	<Field name="donatedBy" list="donated-sources" bind:value={$bikeForm.donatedBy}>Donated By</Field>
	<datalist id="donated-sources">
		<option value="Public" />
		<option value="Landfill" />
	</datalist>
	<Field name="email" type="email" bind:value={$bikeForm.email} errors={$errors.email}>Email</Field>
	<Field name="donationDate" type="date" bind:value={$bikeForm.donationDate}>Donation Date</Field>
	<Field name="suggestedDonation" step="0.01" type="number" bind:value={$bikeForm.suggestedDonation}
		>Suggested Donation</Field
	>
	<Field name="cpicDate" type="date" bind:value={$bikeForm.cpicDate}>CPIC Date</Field>
	<Field name="notes" type="textarea" rows="4" bind:value={$bikeForm.notes}>Notes</Field>
	{#if $bikeForm.id}
		<input type="hidden" name="id" bind:value={$bikeForm.id} />
	{/if}
</fieldset>

<style>
	fieldset {
		all: unset;
		display: grid;
		grid-template-columns: max-content max-content;
		grid-gap: 0.4rem;
	}
</style>

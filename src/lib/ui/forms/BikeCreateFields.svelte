<script lang="ts">
	import type { BikeCreate } from '$lib/models';
	import type { SuperForm } from 'sveltekit-superforms';
	import Field from './Field.svelte';

	type BikeForm = BikeCreate & { id?: string };

	interface Props {
		bikeForm: SuperForm<BikeForm>['form'];
		errors: SuperForm<BikeForm>['errors'];
	}

	let { bikeForm, errors }: Props = $props();
</script>

<fieldset>
	<Field name="serialNumber" errors={$errors.serialNumber} bind:value={$bikeForm.serialNumber}
		>Serial Number</Field
	>
	<Field name="make" errors={$errors.make} bind:value={$bikeForm.make}>Make and Model</Field>
	<Field name="colour" errors={$errors.colour} bind:value={$bikeForm.colour}>Colour</Field>
	<Field
		name="donatedBy"
		errors={$errors.donatedBy}
		list="donated-sources"
		bind:value={$bikeForm.donatedBy}>Donated By</Field
	>
	<datalist id="donated-sources">
		<option value="Public"></option>
		<option value="Landfill"></option>
	</datalist>
	<Field name="email" type="email" errors={$errors.email} bind:value={$bikeForm.email}>Email</Field>
	<Field
		name="suggestedDonation"
		errors={$errors.suggestedDonation}
		step="0.01"
		type="number"
		bind:value={$bikeForm.suggestedDonation}>Suggested Donation</Field
	>
	<Field name="notes" type="textarea" errors={$errors.notes} rows={4} bind:value={$bikeForm.notes}
		>Notes</Field
	>
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

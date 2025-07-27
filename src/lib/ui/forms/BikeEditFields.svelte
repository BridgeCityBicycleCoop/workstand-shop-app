<script lang="ts">
	import type { BikeUpdate, BikeCreate } from '$lib/models';
	import type { SuperForm } from 'sveltekit-superforms';
	import Field from './Field.svelte';

	type BikeForm = BikeUpdate;

	interface Props {
		bikeForm: SuperForm<BikeForm>['form'];
		errors: SuperForm<BikeForm>['errors'];
	}

	let { bikeForm, errors }: Props = $props();
</script>

<fieldset>
	<Field name="serialNumber" bind:value={$bikeForm.serialNumber}>Serial Number</Field>
	<Field name="make" bind:value={$bikeForm.make}>Make and Model</Field>
	<Field name="colour" bind:value={$bikeForm.colour}>Colour</Field>
	<Field name="donatedBy" list="donated-sources" bind:value={$bikeForm.donatedBy}>Donated By</Field>
	<datalist id="donated-sources">
		<option value="Public"></option>
		<option value="Landfill"></option>
	</datalist>
	<Field name="email" type="email" bind:value={$bikeForm.email} errors={$errors.email}>Email</Field>
	<Field name="donationDate" type="date" bind:value={$bikeForm.donationDate}>Donation Date</Field>
	<Field name="suggestedDonation" step="0.01" type="number" bind:value={$bikeForm.suggestedDonation}
		>Suggested Donation</Field
	>
	<Field name="cpicDate" type="date" bind:value={$bikeForm.cpicDate}>CPIC Date</Field>
	<Field name="recipientName" bind:value={$bikeForm.recipientName}>Recipient Full Name</Field>
	<Field name="recipientAge" list="recipient-ages" bind:value={$bikeForm.recipientAge}
		>Recipient Age</Field
	>
	<datalist id="recipient-ages">
		<option value="Adult"></option>
		<option value="Youth"></option>
	</datalist>
	<Field name="recipientPhoneNumber" bind:value={$bikeForm.recipientPhoneNumber}
		>Recipient Phone Number</Field
	>
	<Field name="outOfShopDate" type="date" bind:value={$bikeForm.outOfShopDate}
		>Out of Shop Date</Field
	>
	<Field name="pricePaid" step="0.01" type="number" bind:value={$bikeForm.pricePaid}
		>Price Paid</Field
	>
	<Field name="bikeDestiny" list="bike-destinies" bind:value={$bikeForm.bikeDestiny}
		>Bike Destiny</Field
	>
	<datalist id="bike-destinies">
		<option value="Sold"></option>
		<option value="Parts"></option>
		<option value="Scrap"></option>
		<option value="Unknown"></option>
	</datalist>
	<Field name="bcbcProgram" list="bcbc-programs" bind:value={$bikeForm.bcbcProgram}
		>BCBC Program</Field
	>
	<datalist id="bcbc-programs">
		<option value="Bike Sale"></option>
		<option value="Kids Bike Giveaway"></option>
		<option value="Open Hours"></option>
		<option value="Women and Queer Program"></option>
		<option value="Youth Build-a-Bicycle Workshops"></option>
	</datalist>
	<Field name="notes" type="textarea" rows={4} bind:value={$bikeForm.notes}>Notes</Field>
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

<script lang="ts">
	import type { BikeUpdate, BikeCreate } from '$lib/models';
	import type { SuperForm } from 'sveltekit-superforms';
	import Field from './Field.svelte';

	type BikeForm = BikeUpdate | (BikeCreate & { id?: string });

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
	<Field name="email" type="email" bind:value={$bikeForm.email}>Email Address</Field>
	{#if $errors?.email}
		<div class="errors">{$errors?.email}</div>
	{/if}
	<Field name="donationDate" type="date" bind:value={$bikeForm.donationDate}>Donation Date</Field>
	<Field name="suggestedDonation" step="0.01" type="number" bind:value={$bikeForm.suggestedDonation}
		>Suggested Donation</Field
	>
	<Field name="cpicDate" type="date" bind:value={$bikeForm.cpicDate}>CPIC Date</Field>
	<Field name="recipientName" bind:value={$bikeForm.recipientName}>Recipient Name</Field>
	<Field name="recipientAge" list="recipient-ages" bind:value={$bikeForm.recipientAge}
		>Recipient Age</Field
	>
	<datalist id="recipient-ages">
		<option value="Adult" />
		<option value="Youth" />
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
		<option value="Sold" />
		<option value="Parts" />
		<option value="Scrap" />
		<option value="Unknown" />
	</datalist>
	<Field name="bcbcProgram" list="bcbc-programs" bind:value={$bikeForm.bcbcProgram}
		>BCBC Program</Field
	>
	<datalist id="bcbc-programs">
		<option value="Bike Sale Fundraiser" />
		<option value="Kids Bike Giveaway" />
		<option value="ODS" />
		<option value="Online Sale" />
		<option value="Open Hours" />
		<option value="The Bridge Workshop" />
		<option value="Women and Queer Program" />
		<option value="Youth Build-a-Bicycle Workshops" />
	</datalist>
	<Field name="notes" type="textarea" rows="4" bind:value={$bikeForm.notes}>Notes</Field>
	{#if $bikeForm.id}
		<input type="hidden" name="id" bind:value={$bikeForm.id} />
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

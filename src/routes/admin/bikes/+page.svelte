<script lang="ts">
	import { convertAndDownloadCsv, type Prettify } from '$lib/utils';
	import { getLocaleDisplayDate } from '$lib/ui/utils';
	import type { Bike } from '$lib/models';

	export let data;

	let startDate = data.startDate;
	let endDate = data.endDate;

	const downloadCSV = (_event: MouseEvent) => {
		if (data.bikes.length) {
			const firstBike: Bike = data.bikes[0];
			const headers = (Object.keys(firstBike) as (keyof Bike)[]).filter((key) => key !== 'id');
			const csvSource = data.bikes.map((bike: Bike) => {
				return headers.map((key) => {
					const bikeValue = bike[key] ?? '';

					if (bikeValue instanceof Date) {
						return getLocaleDisplayDate(bikeValue);
					} else {
						return `${bikeValue}`;
					}
				});
			});

			csvSource.unshift(headers);

			convertAndDownloadCsv(csvSource, 'Bikes');
		}
	};
</script>

<pre>[Under Construction]</pre>
<h2>Bike Reporting</h2>

<p>We will put reports and csv downloads here in the future</p>

<section class="bikes-list">
	<h3>Bikes List</h3>

	<form id="filter-bikes">
		<label for="startDate">Start (optional)</label>
		<input type="date" name="startDate" max={endDate} bind:value={startDate} />

		<label for="endDate">End (optional)</label>
		<input type="date" name="endDate" min={startDate} bind:value={endDate} />

		<button class="btn btn-primary" type="submit">Filter Bikes</button>
	</form>

	<br />
	<button class="csv btn-primary" on:click={downloadCSV}>Download Bikes as CSV</button>

	<br />
	<br />

	<div class="tableWrap">
		{#if data.bikes.length > 0}
			<table>
				<thead>
					<tr>
						<th class="sticky-header">Donation Date</th>
						<th class="sticky-header">Colour</th>
						<th class="sticky-header">Make</th>
						<th class="sticky-header">Serial #</th>
						<th class="sticky-header">Donated By</th>
						<th class="sticky-header">Email Address</th>
						<th class="sticky-header">Suggested Donation</th>
						<th class="sticky-header">CPIC Date</th>
						<th class="sticky-header">Recipent Name</th>
						<th class="sticky-header">Recipent Age</th>
						<th class="sticky-header">Recipent Phone Number</th>
						<th class="sticky-header">Out of Shop Date</th>
						<th class="sticky-header">Price Paid</th>
						<th class="sticky-header">Bike Destiny</th>
						<th class="sticky-header">BCBC Program</th>
						<th class="sticky-header">Notes</th>
					</tr>
				</thead>
				<tbody>
					{#each data.bikes as bike}
						<tr>
							<td>{getLocaleDisplayDate(bike.donationDate)}</td>
							<td>{bike.colour}</td>
							<td>{bike.make}</td>
							<td>{bike.serialNumber}</td>
							<td>{bike.donatedBy}</td>
							<td>{bike.email}</td>
							<td>{bike.suggestedDonation}</td>
							<td>{getLocaleDisplayDate(bike.cpicDate)}</td>
							<td>{bike.recipientName}</td>
							<td>{bike.recipientAge}</td>
							<td>{bike.recipientPhoneNumber}</td>
							<td>{getLocaleDisplayDate(bike.outOfShopDate)}</td>
							<td>{bike.pricePaid}</td>
							<td>{bike.bikeDestiny}</td>
							<td>{bike.bcbcProgram}</td>
							<td>{bike.notes}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No Bikes Logged</p>
		{/if}
	</div>
</section>

<style>
	h2 {
		font-weight: bold;
	}
</style>

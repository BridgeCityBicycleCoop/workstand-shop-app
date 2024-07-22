<script lang="ts">
	import { convertAndDownloadCsv } from '$lib/utils';
	import { getLocaleDisplayDate, camelCaseToWords } from '$lib/ui/utils';
	import { bikeSchema } from '$lib/models';

	export let data;

	let startDate = data.startDate;
	let endDate = data.endDate;

	const bikeProps = bikeSchema.shape;
	type BikePropKeys = keyof typeof bikeProps;
	const headers = (Object.keys(bikeProps) as BikePropKeys[]).filter((key) => key !== 'id');

	const downloadCSV = (_event: MouseEvent) => {
		if (data.bikes.length) {
			const csvSource = data.bikes.map((bike) => {
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

<section class="bikes-list">
	<form id="filter-bikes">
		<label for="startDate">Start (optional)</label>
		<input type="date" name="startDate" max={endDate} bind:value={startDate} />

		<label for="endDate">End (optional)</label>
		<input type="date" name="endDate" min={startDate} bind:value={endDate} />

		<button class="btn btn-primary" type="submit">Filter Bikes</button>
	</form>

	<button class="csv btn-primary" on:click={downloadCSV}>Download Bikes as CSV</button>

	<div class="tableWrap">
		{#if data.bikes.length > 0}
			<table>
				<thead>
					<tr>
						{#each headers as header}
							<th class="sticky-header">{camelCaseToWords(header)}</th>
						{/each}
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
</style>

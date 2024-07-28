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
	<form class="filter-bikes">
		<ul class="wrapper">
			<li class="form-row">
				<span>
					<label for="startDate">Start (optional)</label>
					<input type="date" name="startDate" max={endDate} bind:value={startDate} />
				</span>
				<span>
					<label for="endDate">End (optional)</label>
					<input type="date" name="endDate" min={startDate} bind:value={endDate} />
				</span>
				<span>
					<button class="btn btn-primary" type="submit">Filter Bikes</button>
					<button class="btn btn-secondary" type="reset">Clear Filter</button>
				</span>
			</li>
		</ul>
	</form>

	<button class="btn-primary download-csv" on:click={downloadCSV}> Download Bikes as CSV </button>

	<div class="tableWrap search-result">
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
	.wrapper {
		list-style-type: none;
		padding: 0;
		border-radius: 3px;
	}
	.form-row {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 0.5em;
	}
	.form-row > span {
		padding: 0.5em 1em 0.5em 0;
	}

	.bikes-list {
		margin-top: 1rem;
		display: grid;
		grid-template-areas:
			'filter-bikes'
			'download-csv'
			'search-result';
		row-gap: 2rem;
	}

	.filter-bikes {
		grid-area: filter-bikes;
	}

	.download-csv {
		grid-area: download-csv;
		justify-self: start;
	}

	.search-result {
		grid-area: search-result;
	}
</style>

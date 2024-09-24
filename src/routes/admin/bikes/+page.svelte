<script lang="ts">
	import { FilterDataList, getLocaleDisplayDate, camelCaseToWords } from '$lib/ui';
	import { bikeSchema } from '$lib/models';

	export let data;
	let startDate = data.startDate;
	let endDate = data.endDate;
	$: page = data.page;
	$: totalPages = data.totalPages;
	$: urlString = data.urlString;

	const name = 'Bikes';

	const bikeProps = bikeSchema.shape;
	type BikePropKeys = keyof typeof bikeProps;
	const bikeKeys = (Object.keys(bikeProps) as BikePropKeys[]).filter((key) => key !== 'id');
	const headers = bikeKeys.map(camelCaseToWords);

	$: list = data.bikesList.map((bike) => {
		return bikeKeys.map((key) => {
			const value = bike[key];

			if (!value) {
				return '';
			} else if (value instanceof Date) {
				return getLocaleDisplayDate(value);
			} else {
				return value.toString();
			}
		});
	});
</script>

<FilterDataList {startDate} {endDate} {name} {headers} {list} {page} {totalPages} {urlString} />

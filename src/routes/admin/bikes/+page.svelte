<script lang="ts">
	import { FilterDataList, getLocaleDisplayDateAndTime, camelCaseToWords } from '$lib/ui';
	import { bikeSchema } from '$lib/models';

	let { data } = $props();
	let startDate = data.startDate;
	let endDate = data.endDate;
	let page = $derived(data.page);
	let totalPages = $derived(data.totalPages);
	let urlString = $derived(data.urlString);

	const name = 'Bikes';

	const bikeProps = bikeSchema.shape;
	type BikePropKeys = keyof typeof bikeProps;
	const bikeKeys = (Object.keys(bikeProps) as BikePropKeys[]).filter((key) => key !== 'id');
	const headers = bikeKeys.map(camelCaseToWords);

	let list = $derived(data.bikesList.map((bike) => {
		return bikeKeys.map((key) => {
			const value = bike[key];

			if (!value) {
				return '';
			} else if (value instanceof Date) {
				return getLocaleDisplayDateAndTime(value).displayDate;
			} else {
				return value.toString();
			}
		});
	}));
</script>

<FilterDataList {startDate} {endDate} {name} {headers} {list} {page} {totalPages} {urlString} />

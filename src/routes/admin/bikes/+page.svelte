<script lang="ts">
	import { FilterDataList, getLocaleDisplayDate, camelCaseToWords } from '$lib/ui';
	import { bikeSchema } from '$lib/models';

	export let data;
	const name = 'Bikes';

	const bikeProps = bikeSchema.shape;
	type BikePropKeys = keyof typeof bikeProps;
	const bikeKeys = (Object.keys(bikeProps) as BikePropKeys[]).filter((key) => key !== 'id');
	const headers = bikeKeys.map(camelCaseToWords);
	$: list = data.bikes.map((bike) => {
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

	let startDate = data.startDate;
	let endDate = data.endDate;
</script>

<FilterDataList {startDate} {endDate} {name} {headers} {list} />

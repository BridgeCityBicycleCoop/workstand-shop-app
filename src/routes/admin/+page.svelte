<script lang="ts">
	import { FilterDataList, getLocaleDisplayDateAndTime, camelCaseToWords } from '$lib/ui';
	import { memberSchema } from '$lib/models';

	export let data;
	let startDate = data.startDate;
	let endDate = data.endDate;
	$: page = data.page;
	$: totalPages = data.totalPages;
	$: urlString = data.urlString;

	const name = 'Members';

	const memberProps = memberSchema.shape;
	type MemberPropKeys = keyof typeof memberProps;
	const memberKeys = (Object.keys(memberProps) as MemberPropKeys[]).filter((key) => key !== 'id');
	const headers = memberKeys.map(camelCaseToWords);

	$: list = data.membersList.map((member) => {
		return memberKeys.map((key) => {
			const value = member[key];

			if (!value) {
				return '';
			} else if (value instanceof Date) {
				return getLocaleDisplayDateAndTime(value).display;
			} else {
				return value.toString();
			}
		});
	});
</script>

<FilterDataList {startDate} {endDate} {name} {headers} {list} {page} {totalPages} {urlString} />

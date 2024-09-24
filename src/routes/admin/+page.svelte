<script lang="ts">
	import { FilterDataList, Pagination, getLocaleDisplayDate, camelCaseToWords } from '$lib/ui';
	import { memberSchema } from '$lib/models';

	export let data;
	let startDate = data.startDate;
	let endDate = data.endDate;
	let page = data.page;
	let totalPages = data.totalPages;
	let urlString = data.urlString;

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
				return getLocaleDisplayDate(value);
			} else {
				return value.toString();
			}
		});
	});
</script>

<FilterDataList {startDate} {endDate} {name} {headers} {list} />
<Pagination {urlString} {page} {totalPages} />

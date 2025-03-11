<script lang="ts">
	import { FilterDataList, getLocaleDisplayDateAndTime, camelCaseToWords } from '$lib/ui';
	import { memberSchema } from '$lib/models';

	let { data } = $props();
	let startDate = data.startDate;
	let endDate = data.endDate;
	let page = $derived(data.page);
	let totalPages = $derived(data.totalPages);
	let urlString = $derived(data.urlString);

	const name = 'Members';

	const memberProps = memberSchema.shape;
	type MemberPropKeys = keyof typeof memberProps;
	const memberKeys = (Object.keys(memberProps) as MemberPropKeys[]).filter((key) => key !== 'id');
	const headers = memberKeys.map(camelCaseToWords);

	let list = $derived(
		data.membersList.map((member) => {
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
		})
	);
</script>

<FilterDataList
	{startDate}
	{endDate}
	{name}
	{headers}
	{list}
	{page}
	{totalPages}
	{urlString}
	downloadPath="/admin/members/download"
/>

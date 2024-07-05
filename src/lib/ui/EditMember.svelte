<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import type { Member } from '$lib/models/member';
	import MemberEditFields from './forms/MemberEditFields.svelte';

	export let formId: string;
	export let activeMember: Member | undefined;
	export let displayName: string;
	export let onSuccess = (result: any) => {};
	export let formData: SuperValidated<{ id: string }, any, { id: string }>;

	const { enhance } = superForm(formData, {
		onUpdated: onSuccess
	});
</script>

{#if activeMember?.id}<div>Edit {displayName}'s Info</div>
	<br />
	<div class="form-container">
		<form id={formId} method="post" action="?/updateMember" use:enhance>
			<MemberEditFields member={activeMember} />
		</form>
	</div>
{:else}
	<div>Please select a Member</div>
{/if}

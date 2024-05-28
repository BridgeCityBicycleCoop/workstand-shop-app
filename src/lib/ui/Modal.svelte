<script lang="ts">
	import { type Member } from '$lib/models/member';

	export let dialog: HTMLDialogElement | null = null;
	export let member: Member | null = null;

	$: member ? dialog?.showModal() : dialog?.close();
</script>

<dialog bind:this={dialog}>
	<div class="content">
		{#if member}
			<slot {member} />
		{:else}
			<p>No member selected</p>
		{/if}
	</div>
</dialog>

<style>
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.4);
	}

	.content {
		background-color: white;
		width: 20em;
		height: fit-content;
	}
</style>

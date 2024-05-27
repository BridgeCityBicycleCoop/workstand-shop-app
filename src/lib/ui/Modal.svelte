<script lang="ts">
	import { type Member } from '$lib/models/member';

	export let dialog: HTMLDialogElement | null = null;
	export let member: Member | null = null;

	$: member ? dialog?.showModal() : dialog?.close();

	function handleClose(event: HTMLElementEventMap['click']) {
		console.log('close ev', dialog, event);
		member = null;
	}
</script>

<dialog bind:this={dialog}>
	<div class="content">
		<slot />
		{#if member}
			<p>{member.name}</p>
		{:else}
			<p>No member selected</p>
		{/if}
	</div>
	<button on:click={handleClose}>Close</button>
</dialog>

<style>
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.4);
	}

	.content {
		background-color: white;
		width: 20em;
		height: 20em;
	}
</style>

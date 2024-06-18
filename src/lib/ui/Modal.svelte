<script lang="ts">
	export let data: any = null;
	export let open = false;
	export let onCloseCallback: { (): void } | undefined = undefined;

	let dialog: HTMLDialogElement;

	$: {
		if (open && !dialog?.open) {
			dialog.showModal();
		}
		if (!open && dialog?.open) {
			dialog.close();
		}
	}

	function handleClose() {
		dialog.close();
		open = false;
		onCloseCallback?.();
	}
</script>

<dialog bind:this={dialog} on:close={handleClose}>
	<article>
		{#if $$slots.title}
			<header>
				<button class="close" aria-label="Close" on:click={handleClose}></button>
				<slot name="title">&nbsp;</slot>
			</header>
		{/if}

		<slot {data} />

		<footer>
			<slot name="buttons">
				<button class="secondary">Cancel</button>
				<button>Confirm</button>
			</slot>
		</footer>
	</article>
</dialog>

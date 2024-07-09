<script lang="ts">
	export let open: boolean = false;
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

<div class="modal-container">
	<dialog bind:this={dialog} on:close={handleClose}>
		<div class="close-x"><button on:click={handleClose}> X </button></div>
		<div class="content">
			<slot />
		</div>

		<span class="button-container">
			<slot name="buttons">
				<button class="btn btn-primary">Cancel</button>
				<button class="btn btn-primary" on:click={handleClose}>Confirm</button>
			</slot>
		</span>
	</dialog>
</div>

<style>
	dialog {
		background: var(--color-bg-light);
	}

	.close-x {
		display: flex;
		justify-content: flex-end;
	}

	.close-x button {
		padding: 6px 12px;
		min-height: 40px;
	}

	.content {
		background-color: var(--color-bg-light);
		width: 25em;
		height: fit-content;
	}

	.button-container {
		display: flex;
		justify-content: flex-end;
		min-width: 50%;
		margin-top: 30px;
	}

	.button-container button {
		min-height: 40px;
		margin: 20px 10px;
		padding: 5px;
	}
</style>

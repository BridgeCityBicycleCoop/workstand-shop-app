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
		console.log('return value', dialog.returnValue);
		dialog.close();
		open = false;
		onCloseCallback?.();
	}
</script>

<div class="modal-container">
	<dialog bind:this={dialog} on:close={handleClose}>
		<div class="content">
			<slot {data} />
		</div>

		<span class="button-container">
			<slot name="buttons">
				<button value="cancel" on:click={handleClose}>Cancel</button>
				<button value="confirm" on:click={handleClose}>Confirm</button>
			</slot>
		</span>
	</dialog>
</div>

<style>
	.content {
		background-color: white;
		width: 25em;
		height: fit-content;
	}

	.button-container {
		display: flex;
		justify-content: flex-end;
		min-width: 50%;
	}

	.button-container button {
		min-height: 40px;
		margin: 20px 10px;
	}
</style>

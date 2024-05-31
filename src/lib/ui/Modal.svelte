<script lang="ts">
	export let data: any = null;
	export let open = false;
	export let closeCallback: { (): void } | undefined = undefined;

	let dialog: HTMLDialogElement;

	$: {
		if (open && !dialog?.open) {
			if (dialog) {
				dialog.showModal();
			}
		}
	}

	function onClose() {
		if (closeCallback) {
			console.log('callback fired');
			closeCallback();
		}
		open = false;
		dialog.close();
	}
</script>

<div class="modal-container">
	<dialog bind:this={dialog}>
		<div class="content">
			<slot {data} />
		</div>

		<span class="button-container">
			<button value="cancel" on:click={onClose}>Cancel</button>
			<button value="confirm" on:click={onClose}>Confirm</button>
		</span>
	</dialog>
</div>

<style>
	.content {
		background-color: white;
		width: 20em;
		height: fit-content;
	}

	button {
		min-height: 40px;
		margin: 20px;
	}

	.button-container {
		display: flex;
		justify-content: space-around;
		min-width: 50%;
	}
</style>

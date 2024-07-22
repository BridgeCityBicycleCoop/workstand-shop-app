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
		<button class="close" on:click={handleClose}>&times;</button>
		<div class="content">
			<slot />
		</div>

		<span class="button-container">
			<slot name="buttons">
				<button class="primary">Cancel</button>
				<button class="primary" on:click={handleClose}>Confirm</button>
			</slot>
		</span>
	</dialog>
</div>

<style>
	dialog {
		position: relative;
		background: var(--color-bg-light);
		border: 0 none;
		border-radius: var(--border-radius, 6px);
		padding: 1rem;

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.5);
		}
	}

	.close {
		position: absolute;
		z-index: 1;
		right: 1rem;
		top: 0.5rem;
		min-height: 40px;
		min-width: 40px;
		padding: 0;
		background-color: transparent;
		font-size: 1.5em;
		transform: translate(1rem, -0.25rem);
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

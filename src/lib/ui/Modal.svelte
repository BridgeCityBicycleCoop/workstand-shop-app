<script lang="ts">
	import { run } from 'svelte/legacy';

	interface Props {
		open?: boolean;
		onCloseCallback?: { (): void } | undefined;
		children?: import('svelte').Snippet;
		buttons?: import('svelte').Snippet;
	}

	let { open = $bindable(false), onCloseCallback = undefined, children, buttons }: Props = $props();

	let dialog: HTMLDialogElement | undefined = $state();

	run(() => {
		if (open && !dialog?.open) {
			dialog?.showModal();
		}
		if (!open && dialog?.open) {
			dialog?.close();
		}
	});

	function handleClose() {
		dialog?.close();
		open = false;
		onCloseCallback?.();
	}
</script>

<div class="modal-container">
	<dialog bind:this={dialog} onclose={handleClose}>
		<button class="close" onclick={handleClose}>&times;</button>
		<div class="content">
			{@render children?.()}
		</div>

		<span class="button-container">
			{#if buttons}{@render buttons()}{:else}
				<button class="primary">Cancel</button>
				<button class="primary" onclick={handleClose}>Confirm</button>
			{/if}
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

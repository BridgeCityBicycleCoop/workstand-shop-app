<script>
	export let modalContent;

	function handleClose(event) {
		const dialog = document.getElementById('modalDialog');
		console.log('close ev', event);
		dialog?.close();
	}
</script>

<dialog id="modalDialog" class="modal">
	<div class="content">
		<svelte:component this={modalContent} />
	</div>
	<button on:click={handleClose}>Close</button>
</dialog>

<style>
	.modal {
		background-color: rgba(0, 0, 0, 0.4);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content {
		background-color: white;
		width: 20em;
		height: 20em;
	}
</style>

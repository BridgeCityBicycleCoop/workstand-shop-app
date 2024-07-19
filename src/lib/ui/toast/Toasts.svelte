<script context="module">
	import { dismissToast, toasts, addToast } from './store';
	export { addToast };
</script>

<script lang="ts">
	import Toast from './Toast.svelte';
</script>

{#if $toasts}
	<section>
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
			>
		{/each}
	</section>
{/if}

<style lang="postcss">
	section {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		display: flex;
		margin: 1rem;
		justify-content: center;
		align-items: flex-end;
		flex-direction: column;
		gap: 0.5rem;
		z-index: 1;
	}
</style>

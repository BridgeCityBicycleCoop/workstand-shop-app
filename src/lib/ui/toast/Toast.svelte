<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import SuccessIcon from '~icons/mdi/check-circle-outline';
	import ErrorIcon from '~icons/mdi/alert-circle-outline';
	import InfoIcon from '~icons/mdi/information-outline';
	import CloseIcon from '~icons/mdi/close-thick';

	const dispatch = createEventDispatcher();

	interface Props {
		type?: 'success' | 'error' | 'info';
		dismissible?: boolean;
		children?: import('svelte').Snippet;
	}

	let { type = 'info', dismissible = true, children }: Props = $props();
</script>

<article class={type} role="alert" transition:fade>
	{#if type === 'success'}
		<SuccessIcon width="1.1em" />
	{:else if type === 'error'}
		<ErrorIcon width="1.1em" />
	{:else}
		<InfoIcon width="1.1em" />
	{/if}

	<div class="text">
		{@render children?.()}
	</div>

	{#if dismissible}
		<button class="close" onclick={() => dispatch('dismiss')}>
			<CloseIcon width="0.8em" />
		</button>
	{/if}
</article>

<style lang="postcss">
	article {
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 0.2rem;
		display: flex;
		align-items: center;
		width: 20rem;
	}
	.error {
		background: IndianRed;
	}
	.success {
		background: MediumSeaGreen;
	}
	.info {
		background: SkyBlue;
	}
	.text {
		margin-left: 1rem;
	}
	button {
		color: white;
		background: transparent;
		border: 0 none;
		padding: 0;
		margin: 0 0 0 auto;
		line-height: 1;
		font-size: 1rem;
		cursor: pointer;
	}
</style>

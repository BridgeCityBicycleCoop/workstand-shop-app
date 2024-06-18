<script lang="ts">
	import EditOutline from '~icons/mdi/edit-outline';
	import QuestionMark from '~icons/mdi/question-mark';
	import Exclamation from '~icons/mdi/exclamation';

	export let type: 'banned' | 'suspended' | 'notes' | 'text' = 'text';
</script>

<span class={`badge badge_${type}`}>
	{#if type === 'banned'}
		<Exclamation />
	{:else if type === 'suspended'}
		<QuestionMark />
	{:else if type === 'notes'}
		<EditOutline />
	{:else}
		<slot />
	{/if}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		height: 1.2rem;
		width: 1.2rem;
		color: white;
		background-color: rgb(238, 64, 46);
		border: 2px solid white;
		border-radius: 100%;
		overflow: hidden;
		font-weight: bold;
		margin: 0;
	}

	.badge_notes {
		color: var(--pico-background-color);
		background-color: rgb(224, 225, 250);
		border: 2px solid var(--pico-background-color);
	}

	.badge_suspended {
		color: white;
		background-color: rgb(0, 166, 110);
		border: 2px solid white;
	}
</style>

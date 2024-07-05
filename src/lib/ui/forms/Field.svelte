<script lang="ts">
	import ToggleSwitch from './ToggleSwitch.svelte';

	export let type:
		| 'text'
		| 'toggle'
		| 'textarea'
		| 'select'
		| 'button'
		| 'checkbox'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'reset'
		| 'search'
		| 'submit'
		| 'time'
		| 'week'
		| 'url' = 'text';
	export let id: string = $$props.name;
	export let options: [key: string, value: string][] = [];
</script>

<label for={id}><slot /></label>
{#if type === 'toggle'}
	<ToggleSwitch {id} {...$$props} />
{:else if type === 'textarea'}
	<textarea {id} {...$$props}></textarea>
{:else if type === 'select'}
	<select {id} {...$$props}>
		{#if $$slots.option}
			{#each options as entry}
				<slot name="option" {entry} />
			{/each}
		{:else}
			{#each options as entry}
				<option value={entry[1]}>{entry[0]}</option>
			{/each}
		{/if}
	</select>
{:else}
	<input {type} {id} {...$$props} />
{/if}

<style>
	label {
		text-align: left;
	}
	label:after {
		content: ':';
	}

	input {
		padding: 12px 20px;
		margin: 4px 0px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}

	textarea {
		padding: 12px 20px;
		margin: 4px 0px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}
</style>

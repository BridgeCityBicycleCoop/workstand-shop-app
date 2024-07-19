<script lang="ts">
	import { format, parse } from 'date-fns';
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
	export let value: string | Date | null | number | undefined = undefined;
	export let checked = false;
	export let errors: string[] | undefined = undefined;

	$: dateString = value instanceof Date ? format(value, 'yyyy-MM-dd') : '';
	const onDateChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		value = parse(target.value, 'yyyy-MM-dd', new Date());
	};
</script>

<label for={id}><slot /></label>
<div class="field">
	{#if type === 'toggle'}
		<ToggleSwitch {id} {...$$props} aria-invalid={errors ? 'true' : undefined} bind:checked />
	{:else if type === 'textarea'}
		<textarea {id} {...$$props} aria-invalid={errors ? 'true' : undefined} bind:value></textarea>
	{:else if type === 'select'}
		<select {id} {...$$props} aria-invalid={errors ? 'true' : undefined} bind:value>
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
	{:else if type === 'date'}
		<input
			{id}
			{...$$props}
			aria-invalid={errors ? 'true' : undefined}
			value={dateString}
			on:input={onDateChange}
		/>
	{:else}
		<input {id} {...$$props} aria-invalid={errors ? 'true' : undefined} bind:value />
	{/if}
	{#if errors}<span class="invalid">{errors}</span>{/if}
</div>

<style>
	label {
		text-align: left;
	}
	label:after {
		content: ':';
	}

	.field {
		display: flex;
		margin: 4px 0px;
		flex-direction: column;
		align-items: stretch;
		justify-content: stretch;
	}

	input {
		padding: 12px 20px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}

	input[aria-invalid='true'] {
		border-color: red;
		border-width: 3px;
	}

	.invalid {
		color: red;
	}

	textarea {
		padding: 12px 20px;
		margin: 4px 0px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}
</style>

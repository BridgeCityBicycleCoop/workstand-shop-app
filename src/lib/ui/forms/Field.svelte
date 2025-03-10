<script lang="ts">
	import { format, parse } from 'date-fns';
	import ToggleSwitch from './ToggleSwitch.svelte';
	import type {
		HTMLInputAttributes,
		HTMLTextareaAttributes,
		HTMLSelectAttributes,
		HTMLInputTypeAttribute
	} from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type FieldProps = {
		type?: HTMLInputTypeAttribute | 'toggle' | 'textarea' | 'select';
		errors?: string[];
		children?: Snippet;
		checked?: boolean;
		options?: [key: string, value: string][];
		option?: Snippet<[[key: string, value: string]]>;
	};

	type Props =
		| ({
				type: 'textarea';
		  } & FieldProps &
				HTMLTextareaAttributes)
		| ({ type: 'select' } & FieldProps & HTMLSelectAttributes)
		| ({ type: 'toggle' } & FieldProps & HTMLInputAttributes)
		| (FieldProps & HTMLInputAttributes);

	const generatedId = $props.id();

	let {
		children,
		value = $bindable(),
		checked = $bindable(),
		id = generatedId,
		type,
		errors,
		options = [],
		option,
		...rest
	}: Props = $props();

	let dateString = $derived(value instanceof Date ? format(value, 'yyyy-MM-dd') : '');
	const onDateChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		value = parse(target.value, 'yyyy-MM-dd', new Date());
	};
</script>

<label for={id}>{@render children?.()}</label>
<div class="field">
	{#if type === 'toggle'}
		<ToggleSwitch {id} {...rest as HTMLInputAttributes} bind:checked />
	{:else if type === 'textarea'}
		<textarea
			{id}
			{...rest as HTMLTextareaAttributes}
			aria-invalid={errors ? true : undefined}
			bind:value
		></textarea>
	{:else if type === 'select'}
		<select
			{id}
			{...rest as HTMLSelectAttributes}
			aria-invalid={errors ? 'true' : undefined}
			bind:value
		>
			{#if option}
				{#each options as entry}
					{@render option(entry)}
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
			{...rest as HTMLInputAttributes}
			aria-invalid={errors ? 'true' : undefined}
			value={dateString}
			oninput={onDateChange}
		/>
	{:else}
		<input
			{id}
			{...rest as HTMLInputAttributes}
			aria-invalid={errors ? 'true' : undefined}
			bind:value
		/>
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

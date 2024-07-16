<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { MemberEditFields, getDisplayName, Message, Toasts, addToast } from '$lib/ui';

	export let data;
	$: member = data.member;

	const { form, errors, enhance, message } = superForm(data.form, {
		resetForm: false,
		onUpdated(event) {
			if (event.form.message) {
				addToast({
					type: event.form.valid ? 'success' : 'error',
					message: event.form.message,
					timeout: 3000
				});
			}
		}
	});
</script>

<section>
	<div>
		<h1>{getDisplayName(member)}</h1>
	</div>

	<form id="update-member" method="POST" use:enhance>
		<MemberEditFields memberForm={form} {errors} />
	</form>

	<div class="buttons">
		<button class="btn btn-neutral" on:click={() => history.back()}>Back</button>
		<button class="btn btn-primary" type="submit" form="update-member">Update</button>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 50%;
		max-width: 80%;
		margin: auto;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
	}

	button {
		min-height: 40px;
		margin: 25px 10px;
		padding: 10px 30px;
	}
</style>

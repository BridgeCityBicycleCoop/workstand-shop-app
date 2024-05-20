import { memberSchema, getMember } from '$lib/models/member';
import { superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const superformMemberSchema = zod(memberSchema);

export async function load(event) {
	// const member = await getMember(1001);
	const form = await superValidate(event, superformMemberSchema);

	return { form };
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, superformMemberSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		return form;
	}
};

import z from 'zod';

export const memberSchema = z.object({
	name: z.string(),
	preferredName: z.string().optional(),
	email: z.string().email(),
	emailConsent: z.boolean(),
	phone: z.string(),
	dateOfBirth: z.coerce.date(),
	// guardianName: z.string(),
	// active: z.boolean(),
	// banned: z.boolean(),
	// suspended: z.boolean(),
	// waiver: z.coerce.date().optional(),
	// notes: z.string().optional(),
	// activities: z.array(z.string()),
	// logins: z.array(z.coerce.date()),
	id: z.number()
	// user_id: z.string(),
	// created_at: z.date().optional(),
	// modified_at: z.date().optional()
});

const testMember = {
	id: 1001,
	username: 'kungfu_panda',
	phone: '3554255555',
	email: 'frank@beans.com',
	emailConsent: true,
	name: 'Frankfurter N Beans',
	preferredName: 'Frank',
	dateOfBirth: new Date('1980-01-01'),
	guardianName: 'H.D. Bunns',
	active: true,
	banned: false,
	suspended: false,
	waiver: new Date('2016-01-09 00:00:00+00'),
	notes: '',
	activities: ['21cd9799b6', '3a5a719017', '0ebb0b5468', '84309225e7', 'c96d389517'],
	logins: [
		new Date('2018-02-07 02:36:31.766+00'),
		new Date('2018-02-11 02:53:24.334+00'),
		new Date('2018-02-27 04:21:18.658+00')
	],
	created: new Date('2017-05-18 04:27:09.503+00'),
	updated: new Date('2018-02-07 02:36:31.766+00')
};

export const getMember = async (id: number) => {
	// test data
	if (id === 1001) {
		return memberSchema.parse(testMember);
	}
};

export const updateMember = async (form: any) => {
	if (form.id) {
		console.log('update current member at id:', form.id);
	} else {
		console.log('register new member', form);
	}
};

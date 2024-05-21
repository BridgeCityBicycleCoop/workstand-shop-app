import z from 'zod';

export const memberSchema = z.object({
	id: z.number(),
	username: z.string(),
	name: z.string(),
	preferredName: z.string().optional(),
	email: z.string().email(),
	emailConsent: z.boolean(),
	phone: z.string(),
	dateOfBirth: z.coerce.date(),
	guardianName: z.string(),
	postalCode: z.string().optional(),
	active: z.boolean(),
	banned: z.boolean(),
	suspended: z.boolean(),
	waiver: z.coerce.date().optional(),
	notes: z.string().optional(),
	created: z.date().optional(),
	updated: z.date().optional()
});

export const testMember = {
	id: 1001,
	username: 'kungfu_panda',
	name: 'Frankfurter N Beans',
	preferredName: 'Frank',
	email: 'frank@beans.com',
	emailConsent: true,
	phone: '3554255555',
	dateOfBirth: new Date('1980-01-01'),
	guardianName: 'H.D. Bunns',
	postalCode: 'S7L 0L8',
	active: true,
	banned: false,
	suspended: false,
	waiver: new Date('2016-01-09 00:00:00+00'),
	notes: '',
	created: new Date('2017-05-18 04:27:09.503+00'),
	updated: new Date('2018-02-07 02:36:31.766+00')
};
// TODO: move activities and logins to their own tables for reporting

// activities: ['21cd9799b6', '3a5a719017', '0ebb0b5468', '84309225e7', 'c96d389517'],
// logins: [
// 	new Date('2018-02-07 02:36:31.766+00'),
// 	new Date('2018-02-11 02:53:24.334+00'),
// 	new Date('2018-02-27 04:21:18.658+00')
// ],

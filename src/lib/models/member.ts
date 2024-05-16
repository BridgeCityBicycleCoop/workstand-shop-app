import z from 'zod';

export const Member = z.object({
	id: z.number(),
	phone: z.string(),
	email: z.string(),
	email_consent: z.boolean(),
	name: z.string(),
	preferred_name: z.string(),
	date_of_birth: z.date(),
	guardian_name: z.string(),
	is_active: z.boolean(),
	user_id: z.number(),
	banned: z.boolean(),
	suspended: z.boolean(),
	wavier: z.date(),
	created_at: z.date(),
	modified_at: z.date(),
	notes: z.string(),
	activities: z.string(),
	logins: z.date()
});

const testMember = {
	id: 1001,
	phone: '3554255555',
	email: 'frank@beans.com',
	email_consent: true,
	name: 'Frankfurter N Beans',
	preferred_name: 'Frank',
	date_of_birth: '1980-01-01',
	guardian_name: '',
	waiver: '2016-01-09 00:00:00+00',
	is_active: true,
	banned: false,
	suspended: false,
	created_at: '2017-05-18 04:27:09.503+00',
	modified_at: '2018-02-07 02:36:31.766+00',
	notes: '',
	activities: ['21cd9799b6', '3a5a719017', '0ebb0b5468', '84309225e7', 'c96d389517'],
	logins: ['2018-02-07 02:36:31.766+00', '2018-02-11 02:53:24.334+00', '2018-02-27 04:21:18.658+00']
};

export const getMember = async (id: number) => {
	// test data
	if (id === 1001) {
		return Member.parse(testMember);
	}
};

import type { RequestHandler } from '@sveltejs/kit';

// get all members
export const GET: RequestHandler = async (event) => {
	// const options: Response:init = {

	// }
	return new Response('hello');
};

// GET single member with id

// POST new member data
export const POST: RequestHandler = async (event) => {
	const data = event.request.formData();
	// cast form data to member schema and validate
	console.log('POST data', data);
	const email = (await data).get('email');
	const name = (await data).get('name');

	console.log('any data', name, email);

	// try {
	// 	event.locals.pb.collection('users').create(data);
	// } catch (e) {
	// 	console.log('creation failed', e);
	// }

	return new Response(JSON.stringify({ success: true }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

// PATCH to update current member by id

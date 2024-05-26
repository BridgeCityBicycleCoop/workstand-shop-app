import { json } from '@sveltejs/kit';
import { members as membersService } from '$lib/server/db';

export const GET = async () => {
	const members = await membersService.find();
	return json({ data: members });
};

export const POST = async ({ request }) => {
	const memberData = await request.json();
	const member = await membersService.add(memberData);
	return json(member);
};

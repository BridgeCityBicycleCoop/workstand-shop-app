/* eslint-disable */
const axios = require('axios');
const fs = require('fs');

const pocketbaseUrl = 'http://localhost:8090';
const adminEmail = 'admin@example.com';
const adminPassword = 'your-admin-password';

async function importCollections() {
	// Read the collections JSON file
	const collections = JSON.parse(fs.readFileSync('pb_schema.json', 'utf8'));

	// Authenticate as admin
	const authResponse = await axios.post(`${pocketbaseUrl}/api/admins/auth-with-password`, {
		email: adminEmail,
		password: adminPassword
	});

	const token = authResponse.data.token;

	// Import collections
	for (const collection of collections) {
		await axios.post(`${pocketbaseUrl}/api/collections`, collection, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	}

	console.log('Collections imported successfully!');
}

importCollections().catch(console.error);

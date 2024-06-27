import 'dotenv/config';
console.log('PB TARGET', process.env.POCKETBASE_URL);
console.log('ORIGIN', process.env.ORIGIN);
import { handler } from './build/handler.js';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import { createTerminus } from '@godaddy/terminus';

const app = express();

app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				...helmet.contentSecurityPolicy.getDefaultDirectives(),
				'script-src': ["'self'", "'unsafe-inline'"]
			}
		},
		referrerPolicy: {
			policy: ['same-origin']
		}
	})
);

app.use(handler);

const server = http.createServer(app);

createTerminus(server, {
	signals: ['SIGTERM', 'SIGINT'],
	onSignal: async () => {
		// Call your cleanup functions below. For example:
		// db.shutdown()
	}
});

server.listen(3000, () => {
	console.log('Listening on port 3000');
});

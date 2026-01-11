import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

console.log(process.env.NODE_ENV)

config({ path: process.env.NODE_ENV == 'production' ? '.env.production' : '.env.local' })

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: process.env.NODE_ENV == 'production' ? 'turso' : 'sqlite',

	dbCredentials: {
		authToken: process.env.DATABASE_AUTH_TOKEN,
		url: process.env.DATABASE_URL
	},

	verbose: true,
	strict: true
});

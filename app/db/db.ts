import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import dotenv from 'dotenv';
import postgres from 'postgres';
import * as schema from './schema';

dotenv.config();

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL environment variable is required.');

if (!process.env.DATABASE_PORT) throw new Error('DATABASE_PORT environment variable is required.');

if (!process.env.DATABASE_USER) throw new Error('DATABASE_USER environment variable is required.');

if (!process.env.DATABASE_PASSWORD) throw new Error('DATABASE_PASSWORD environment variable is required.');

if (!process.env.DATABASE_DBNAME) throw new Error('DATABASE_DBNAME environment variable is required.');

const dbCredentials: { [key: string]: string } = {
  host: process.env.DATABASE_URL,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DBNAME,
};

const connection_string: string = `postgres://${dbCredentials.user}:${dbCredentials.password}@${dbCredentials.host}:${dbCredentials.port}/${dbCredentials.database}`;
export const db: PostgresJsDatabase<typeof schema> = drizzle(postgres(connection_string), {
  schema,
});

import type { Config } from 'drizzle-kit'
import 'dotenv/config'

if (!process.env.DATABASE_URL)
    throw new Error('DATABASE_URL environment variable is required.')

if (!process.env.DATABASE_PORT)
    throw new Error('DATABASE_PORT environment variable is required.')

if (!process.env.DATABASE_USER)
    throw new Error('DATABASE_USER environment variable is required.')

if (!process.env.DATABASE_PASSWORD)
    throw new Error('DATABASE_PASSWORD environment variable is required.')

if (!process.env.DATABASE_DBNAME)
    throw new Error('DATABASE_DBNAME environment variable is required.')

export default {
    schema: './app/db/schema.ts',
    driver: 'pg',
    dbCredentials: {
        host: process.env.DATABASE_URL,
        port: parseInt(process.env.DATABASE_PORT, 10),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DBNAME,
        ssl: false,
    },
    verbose: true,
    strict: true,
} satisfies Config

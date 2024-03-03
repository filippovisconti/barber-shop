import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { db } from './db'

async function main() {
    console.log('Migrating database...')
    await migrate(db, { migrationsFolder: './drizzle' })
    console.log('Database migrated.')
    process.exit(0)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})

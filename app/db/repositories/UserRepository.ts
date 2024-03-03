import { eq } from 'drizzle-orm'

import { db } from '../db'
import { NewUser, User, users } from '../schema'

export default class UserRepository {
    public static async getAll(): Promise<User[]> {
        const result: Promise<User[]> = db.query.users.findMany()
        return result
    }

    public static async insert(data: NewUser): Promise<void> {
        if (data) await db.insert(users).values(data)
        else throw new Error('No user data provided')
    }

    public static async updateById(id: string, data: User): Promise<void> {
        if (id) await db.update(users).set(data).where(eq(users.id, id))
        else if (data.id) db.update(users).set(data).where(eq(users.id, data.id))
        else throw new Error('No id or data.id provided')
    }

    public static async delete(id: string): Promise<void> {
        if (id) await db.delete(users).where(eq(users.id, id))
        else throw new Error('No id provided')
    }

    public static async getById(id: string): Promise<User> {
        if (id) {
            const result: Promise<User | undefined> = db.query.users
                .findFirst({ where: eq(users.id, id) })
                .execute()

            // if type of result is not undefined, return result
            if (result) return result as Promise<User>
            throw new Error(`No user found with id ${id}`)
        } else throw new Error('No id provided')
    }

    public static async getByField(field: string, value: string): Promise<User[]> {
        if (field && value) {
            const result: Promise<User[]> = db.query.users
                .findMany({ where: eq(users[field as keyof User], value) })
                .execute()
            return result
        }
        throw new Error('No field or value provided')
    }
}

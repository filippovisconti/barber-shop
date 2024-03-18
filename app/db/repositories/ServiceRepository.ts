import { eq } from 'drizzle-orm'

import { db } from '../db'
import { NewService, Service, services } from '../schema'

export default class ServiceRepository {
    public static async getAll(): Promise<Service[]> {
        const result: Promise<Service[]> = db.query.services.findMany()
        return result
    }

    public static async insert(data: NewService): Promise<{ id: string }[]> {
        if (data) {
            try {
                return await db.insert(services).values(data).returning({ id: services.id })
            } catch (error) {
                throw new Error(`Error inserting service: ${error}`)
            }
        } else throw new Error('No service data provided')
    }

    public static async updateById(id: string, data: Service): Promise<{ id: string }[]> {
        if (id) {
            try {
                return await db
                    .update(services)
                    .set(data)
                    .where(eq(services.id, id))
                    .returning({ id: services.id })
            } catch (error) {
                throw new Error(`Error updating service: ${error}`)
            }
        } else if (data.id) {
            try {
                return await db
                    .update(services)
                    .set(data)
                    .where(eq(services.id, data.id))
                    .returning({ id: services.id })
            } catch (error) {
                throw new Error(`Error updating service: ${error}`)
            }
        }
        else throw new Error('No id or data.id provided')
    }

    public static async delete(id: string): Promise<{ deletedId: string }[]> {
        // if (id) db.delete(services).where(eq(services.id, id))
        // else throw new Error('No id provided')
        if (id) {
            try {
                return await db
                    .delete(services)
                    .where(eq(services.id, id))
                    .returning({ deletedId: services.id })
            } catch (error) {
                throw new Error(`Error deleting service: ${error}`)
            }
        } else throw new Error('No id provided')
    }

    public static async getById(id: string): Promise<Service> {
        if (id) {
            const result: Promise<Service | undefined> = db.query.services
                .findFirst({ where: eq(services.id, id) })
                .execute()

            // if type of result is not undefined, return result
            if (result) return result as Promise<Service>
            throw new Error(`No service found with id ${id}`)
        } else throw new Error('No id provided')
    }

    public static async getByField(field: string, value: string): Promise<Service[]> {
        if (field && value) {
            const result: Promise<Service[]> = db.query.services
                .findMany({
                    where: eq(services[field as keyof Service], value),
                })
                .execute()
            return result
        }
        throw new Error('No field or value provided')
    }
}

import { eq } from 'drizzle-orm'

import { db } from '../db'
import {
    Appointment,
    JoinAppointment,
    NewAppointment,
    appointments,
    locations,
    services,
} from '../schema'

export default class AppointmentRepository {
    public static async getAppointmentsJoin(): Promise<JoinAppointment[]> {
        // inner join: no null values allowed
        const result: JoinAppointment[] = await db
            .select({
                id: appointments.id,
                userEmail: appointments.userEmail,
                serviceName: services.name,
                locationName: locations.name,
                date: appointments.date,
                notes: appointments.notes,
                createdAt: appointments.createdAt,
                status: appointments.status,
            })
            .from(appointments)
            .innerJoin(services, eq(appointments.serviceId, services.id))
            .innerJoin(locations, eq(appointments.locationId, locations.id))

        return Promise.resolve(result)
    }

    public static async getAll(): Promise<Appointment[]> {
        const result: Promise<Appointment[]> = db.query.appointments.findMany()
        return result
    }

    public static async insert(data: NewAppointment): Promise<{ id: string }[]> {
        if (data) {
            try {
                return await db.insert(appointments).values(data).returning({ id: appointments.id })
            } catch (error) {
                throw new Error(`Error inserting appointment: ${error}`)
            }
        } else throw new Error('No appointment data provided')
    }

    public static async updateById(id: string, data: Appointment): Promise<void> {
        if (id) await db.update(appointments).set(data).where(eq(appointments.id, id))
        else if (data.id) db.update(appointments).set(data).where(eq(appointments.id, data.id))
        else throw new Error('No id or data.id provided')
    }

    public static async delete(id: string): Promise<{ deletedId: string }[]> {
        if (id)
            try {
                return await db
                    .delete(appointments)
                    .where(eq(appointments.id, id))
                    .returning({ deletedId: appointments.id })
            } catch (error) {
                throw new Error(`Error deleting appointment: ${error}`)
            }
        else throw new Error('No id provided')
    }

    public static async getById(id: string): Promise<Appointment> {
        if (id) {
            const result: Promise<Appointment | undefined> = db.query.appointments
                .findFirst({ where: eq(appointments.id, id) })
                .execute()

            // if type of result is not undefined, return result
            if (result) return result as Promise<Appointment>
            throw new Error(`No appointment found with id ${id}`)
        } else throw new Error('No id provided')
    }

    public static async getByField(field: string, value: string): Promise<Appointment[]> {
        if (field && value) {
            const result: Promise<Appointment[]> = db.query.appointments
                .findMany({
                    where: eq(appointments[field as keyof Appointment], value),
                })
                .execute()
            return result
        }
        throw new Error('No field or value provided')
    }

    public static async getByDate(date: Date): Promise<Appointment[]> {
        if (date) {
            const result: Promise<Appointment[]> = db.query.appointments
                .findMany({ where: eq(appointments.date, date) })
                .execute()
            return result
        }
        throw new Error('No date provided')
    }

    public static async getByUserId(userId: string): Promise<Appointment[]> {
        if (userId) {
            const result: Promise<Appointment[]> = db.query.appointments
                .findMany({ where: eq(appointments.userEmail, userId) })
                .execute()
            return result
        }
        throw new Error('No userId provided')
    }
}

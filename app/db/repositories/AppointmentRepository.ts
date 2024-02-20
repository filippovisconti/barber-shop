import { eq } from "drizzle-orm";
import RepositoryInterface from "./RepositoryInterface";
import { appointments, Appointment, NewAppointment } from "../schema";

import { db } from "../db";

export default class AppointmentRepository implements RepositoryInterface<Appointment>{

    async getAll(): Promise<Appointment[]> {
        const result: Promise<Appointment[]> = db.query.appointments.findMany();
        return result;
    }

    async insert(data: NewAppointment): Promise<void> {
        if (data)
            db.insert(appointments).values(data);
        else
            throw new Error("No appointment data provided");
    }

    async updateById(id: string, data: Appointment): Promise<void> {
        if (id)
            db.update(appointments).set(data).where(eq(appointments.id, id));
        else if (data.id)
            db.update(appointments).set(data).where(eq(appointments.id, data.id));
        else
            throw new Error("No id or data.id provided");
    }

    async delete(id: string): Promise<void> {
        if (id)
            db.delete(appointments).where(eq(appointments.id, id));
        else
            throw new Error("No id provided");
    }

    async getById(id: string): Promise<Appointment> {
        if (id) {
            const result: Promise<Appointment | undefined> = db.query.appointments.findFirst({ where: eq(appointments.id, id) }).execute();

            // if type of result is not undefined, return result
            if (result)
                return result as Promise<Appointment>;
            else
                throw new Error("No appointment found with id " + id);
        }
        else
            throw new Error("No id provided");
    }

    async getByField(field: string, value: string): Promise<Appointment[]> {
        if (field && value) {
            const result: Promise<Appointment[]> = db.query.appointments.findMany({ where: eq(appointments[field as keyof Appointment], value) }).execute();
            return result;
        }
        else
            throw new Error("No field or value provided");
    }

    async getByDate(date: Date): Promise<Appointment[]> {
        if (date) {
            const result: Promise<Appointment[]> = db.query.appointments.findMany({ where: eq(appointments.date, date) }).execute();
            return result;
        }
        else
            throw new Error("No date provided");
    }

    async getByUserId(userId: string): Promise<Appointment[]> {
        if (userId) {
            const result: Promise<Appointment[]> = db.query.appointments.findMany({ where: eq(appointments.userId, userId) }).execute();
            return result;
        }
        else
            throw new Error("No userId provided");
    }
}

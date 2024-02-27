import { eq } from 'drizzle-orm';
import { Appointment, NewAppointment, appointments } from '../schema';

import { db } from '../db';

export default class AppointmentRepository {
	public static async getAll(): Promise<Appointment[]> {
		const result: Promise<Appointment[]> = db.query.appointments.findMany();
		return result;
	}

	public static async insert(data: NewAppointment): Promise<void> {
		if (data) db.insert(appointments).values(data);
		else throw new Error('No appointment data provided');
	}

	public static async updateById(id: string, data: Appointment): Promise<void> {
		if (id) db.update(appointments).set(data).where(eq(appointments.id, id));
		else if (data.id) db.update(appointments).set(data).where(eq(appointments.id, data.id));
		else throw new Error('No id or data.id provided');
	}

	public static async delete(id: string): Promise<void> {
		if (id) db.delete(appointments).where(eq(appointments.id, id));
		else throw new Error('No id provided');
	}

	public static async getById(id: string): Promise<Appointment> {
		if (id) {
			const result: Promise<Appointment | undefined> = db.query.appointments
				.findFirst({ where: eq(appointments.id, id) })
				.execute();

			// if type of result is not undefined, return result
			if (result) return result as Promise<Appointment>;
			throw new Error(`No appointment found with id ${id}`);
		} else throw new Error('No id provided');
	}

	public static async getByField(field: string, value: string): Promise<Appointment[]> {
		if (field && value) {
			const result: Promise<Appointment[]> = db.query.appointments
				.findMany({ where: eq(appointments[field as keyof Appointment], value) })
				.execute();
			return result;
		}
		throw new Error('No field or value provided');
	}

	public static async getByDate(date: Date): Promise<Appointment[]> {
		if (date) {
			const result: Promise<Appointment[]> = db.query.appointments
				.findMany({ where: eq(appointments.date, date) })
				.execute();
			return result;
		}
		throw new Error('No date provided');
	}

	public static async getByUserId(userId: string): Promise<Appointment[]> {
		if (userId) {
			const result: Promise<Appointment[]> = db.query.appointments
				.findMany({ where: eq(appointments.userId, userId) })
				.execute();
			return result;
		}
		throw new Error('No userId provided');
	}
}

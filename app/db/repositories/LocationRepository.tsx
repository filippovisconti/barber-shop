import { eq } from 'drizzle-orm';
import { Location, NewLocation, locations } from '../schema';

import { db } from '../db';

export default class LocationRepository {
    public static async getAll(): Promise<Location[]> {
        const result: Promise<Location[]> = db.query.locations.findMany();
        return result;
    }

    public static async insert(data: NewLocation): Promise<void> {
        if (data) db.insert(locations).values(data);
        else throw new Error('No location data provided');
    }

    public static async updateById(id: string, data: Location): Promise<void> {
        if (id) db.update(locations).set(data).where(eq(locations.id, id));
        else if (data.id) db.update(locations).set(data).where(eq(locations.id, data.id));
        else throw new Error('No id or data.id provided');
    }

    public static async delete(id: string): Promise<void> {
        if (id) db.delete(locations).where(eq(locations.id, id));
        else throw new Error('No id provided');
    }

    public static async getById(id: string): Promise<Location> {
        if (id) {
            const result: Promise<Location | undefined> = db.query.locations
                .findFirst({ where: eq(locations.id, id) })
                .execute();

            // if type of result is not undefined, return result
            if (result) return result as Promise<Location>;
            throw new Error(`No location found with id ${id}`);
        } else throw new Error('No id provided');
    }

    public static async getByField(field: string, value: string): Promise<Location[]> {
        if (field && value) {
            const result: Promise<Location[]> = db.query.locations
                .findMany({ where: eq(locations[field as keyof Location], value) })
                .execute();
            return result;
        } throw new Error('No field or value provided');
    }
}

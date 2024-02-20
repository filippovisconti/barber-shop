import { eq } from "drizzle-orm";
import RepositoryInterface from "./RepositoryInterface";
import { users, User, NewUser } from "../schema";

import { db } from "../db";

export default class UserRepository implements RepositoryInterface<User>{
    async getAll(): Promise<User[]> {
        const result: Promise<User[]> = db.query.users.findMany();
        return result;
    }
    async insert(data: NewUser): Promise<void> {
        if (data)
            db.insert(users).values(data);
        else
            throw new Error("No user data provided");
    }
    async updateById(id: string, data: User): Promise<void> {
        if (id)
            db.update(users).set(data).where(eq(users.id, id));
        else if (data.id)
            db.update(users).set(data).where(eq(users.id, data.id));
        else
            throw new Error("No id or data.id provided");
    }

    async delete(id: string): Promise<void> {
        if (id)
            db.delete(users).where(eq(users.id, id));
        else
            throw new Error("No id provided");
    }

    async getById(id: string): Promise<User> {
        if (id) {
            const result: Promise<User | undefined> = db.query.users.findFirst({ where: eq(users.id, id) }).execute();

            // if type of result is not undefined, return result
            if (result)
                return result as Promise<User>;
            else
                throw new Error("No user found with id " + id);
        }
        else
            throw new Error("No id provided");
    }

    async getByField(field: string, value: string): Promise<User[]> {
        if (field && value) {
            const result: Promise<User[]> = db.query.users.findMany({ where: eq(users[field as keyof User], value) }).execute();
            return result;
        }
        else
            throw new Error("No field or value provided");
    }

}

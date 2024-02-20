import { eq } from 'drizzle-orm';
import RepositoryInterface from './RepositoryInterface';
import { NewService, Service, services } from '../schema';

import { db } from '../db';

export default class ServiceRepository implements RepositoryInterface<Service> {
  async getAll(): Promise<Service[]> {
    const result: Promise<Service[]> = db.query.services.findMany();
    return result;
  }

  async insert(data: NewService): Promise<void> {
    if (data) db.insert(services).values(data);
    else throw new Error('No service data provided');
  }

  async updateById(id: string, data: Service): Promise<void> {
    if (id) db.update(services).set(data).where(eq(services.id, id));
    else if (data.id) db.update(services).set(data).where(eq(services.id, data.id));
    else throw new Error('No id or data.id provided');
  }

  async delete(id: string): Promise<void> {
    if (id) db.delete(services).where(eq(services.id, id));
    else throw new Error('No id provided');
  }

  async getById(id: string): Promise<Service> {
    if (id) {
      const result: Promise<Service | undefined> = db.query.services
        .findFirst({ where: eq(services.id, id) })
        .execute();

      // if type of result is not undefined, return result
      if (result) return result as Promise<Service>;
      throw new Error(`No service found with id ${id}`);
    } else throw new Error('No id provided');
  }

  async getByField(field: string, value: string): Promise<Service[]> {
    if (field && value) {
      const result: Promise<Service[]> = db.query.services
        .findMany({ where: eq(services[field as keyof Service], value) })
        .execute();
      return result;
    } throw new Error('No field or value provided');
  }
}

import { relations } from 'drizzle-orm';
import {
    integer,
    pgEnum,
    pgTable,
    real,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', [
    'completed',
    'cancelled',
    'pending',
    'confirmed',
    'rescheduled',
    'no-show',
    'late',
    'early',
]);

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: varchar('email', { length: 128 }),
    phone: varchar('phone', { length: 32 }).notNull(),
    password: text('password').notNull(),
});

export const services = pgTable('services', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    price: real('price').notNull(),
    duration: integer('duration').notNull().default(30),
});

export const appointments = pgTable('appointments', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id),
    serviceId: uuid('service_id')
        .notNull()
        .references(() => services.id),
    locationId: uuid('location_id')
        .notNull()
        .references(() => locations.id),
    date: timestamp('date').notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    status: statusEnum('status'),
});

export const locations = pgTable('locations', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    address: text('address').notNull(),
    city: text('city').notNull(),
    openingAt: timestamp('opening_at').notNull(),
    closingAt: timestamp('closing_at').notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
    appointment: many(appointments),
}));

export const serviceRelations = relations(services, ({ many }) => ({
    appointment: many(appointments),
}));

export const appointmentRelations = relations(appointments, ({ one }) => ({
    user: one(users, {
        fields: [appointments.userId],
        references: [users.id],
    }),
    service: one(services, {
        fields: [appointments.serviceId],
        references: [services.id],
    }),
    location: one(locations, {
        fields: [appointments.locationId],
        references: [locations.id],
    }),
}));

export const locationRelations = relations(locations, ({ many }) => ({
    appointment: many(appointments),
}));

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type

export type Service = typeof services.$inferSelect; // return type when queried
export type NewService = typeof services.$inferInsert; // insert type

export type Appointment = typeof appointments.$inferSelect; // return type when queried
export type NewAppointment = typeof appointments.$inferInsert; // insert type

export type Location = typeof locations.$inferSelect; // return type when queried
export type NewLocation = typeof locations.$inferInsert; // insert type

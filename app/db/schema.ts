import type { AdapterAccount } from '@auth/core/adapters';
import { relations } from 'drizzle-orm';
import {
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    real,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
    id: text('id').notNull().primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
});

export const accounts = pgTable(
    'account',
    {
        userId: text('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        type: text('type').$type<AdapterAccount['type']>().notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('providerAccountId').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    (account) => ({
        compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    })
);

export const sessions = pgTable('session', {
    sessionToken: text('sessionToken').notNull().primaryKey(),
    userId: text('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
    'verificationToken',
    {
        identifier: text('identifier').notNull(),
        token: text('token').notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);
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

export const services = pgTable('services', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    price: real('price').notNull(),
    duration: integer('duration').notNull().default(30),
});

export const locations = pgTable('locations', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    address: text('address').notNull(),
    city: text('city').notNull(),
    openingAt: timestamp('opening_at').notNull(),
    closingAt: timestamp('closing_at').notNull(),
});

export const appointments = pgTable('appointments', {
    id: uuid('id').primaryKey().defaultRandom(),
    userEmail: text('user_email')
        .notNull(),
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

export const userRelations = relations(users, ({ many }) => ({
    appointment: many(appointments),
}));

export const serviceRelations = relations(services, ({ many }) => ({
    appointment: many(appointments),
}));

export const appointmentRelations = relations(appointments, ({ one }) => ({
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

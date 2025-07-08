import { timestamp, mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const admins = mysqlTable('Admins', {
    id: int('id').autoincrement().primaryKey(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});


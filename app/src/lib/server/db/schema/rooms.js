import { timestamp, mysqlTable, int, varchar, boolean } from "drizzle-orm/mysql-core";
import { admins } from "./admins";

export const rooms = mysqlTable('Rooms', {
    id: int('id').autoincrement().primaryKey(),
    adminId: int('admin_id').notNull().references(() => admins.id),
    roomSlug: varchar('room_slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    status: varchar('status', { length: 255 }).notNull(), // 'active', 'archived'
    showRespondentNames: boolean('show_respondent_names').notNull().default(false),
    currentPollId: int('current_poll_id'), // Nullable, references polls.id
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});
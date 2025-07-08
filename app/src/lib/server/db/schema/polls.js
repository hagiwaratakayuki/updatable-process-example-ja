
import { boolean, timestamp, mysqlTable, int, varchar, text } from "drizzle-orm/mysql-core";

import { rooms } from "./rooms";

export const polls = mysqlTable('Polls', {
    id: int('id').autoincrement().primaryKey(),
    roomId: int('room_id').notNull().references(() => rooms.id),
    question: text('question').notNull(),
    type: varchar('type', { length: 255 }).notNull(), // 'choice', 'scale', 'text'
    allowMultipleAnswers: boolean('allow_multiple_answers').notNull().default(false),
    displayOrder: int('display_order').notNull().default(0),
    status: varchar('status', { length: 255 }).notNull(), // 'waiting', 'active', 'closed'
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";
import { polls } from "./polls";

export const pollOptions = mysqlTable('PollOptions', {
    id: int('id').autoincrement().primaryKey(),
    pollId: int('poll_id').notNull().references(() => polls.id),
    label: varchar('label', { length: 255 }).notNull(),
    scaleValue: int('scale_value'), // Nullable
    displayOrder: int('display_order').notNull().default(0),
});
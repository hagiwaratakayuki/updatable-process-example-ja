import { timestamp, mysqlTable, int, varchar, text, } from "drizzle-orm/mysql-core";
import { polls } from "./polls";

const pollOptionsStats = mysqlTable('PollOPtionStats', {
    id: int('id').autoincrement().primaryKey(),
    pollId: int('poll_id').notNull().references(() => polls.id),
    result: text('text_answer').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
})
import { mysqlTable, bigint, int, varchar, timestamp, index, text } from 'drizzle-orm/mysql-core';
import { polls } from './polls';


export const textAnswers = mysqlTable(
    'TextAnswers',
    {
        id: bigint('id', {
            mode: 'number'
        }).autoincrement().primaryKey(),
        pollId: int('poll_id').notNull().references(() => polls.id),
        participantId: varchar('participant_id', {
            length: 255
        }).notNull(),
        participantName: varchar('participant_name', {
            length: 255
        }),
        textAnswer: text('text_answer').notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
    }
);


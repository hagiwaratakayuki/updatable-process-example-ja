import { mysqlTable, bigint, int, varchar, timestamp, index } from 'drizzle-orm/mysql-core';
import { pollOptions } from './poll_options';
import { polls } from './polls';

export const optionAnswers = mysqlTable(
    'OptionAnswers',
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
        optionId: int('option_id').notNull().references(() => pollOptions.id),
        createdAt: timestamp('created_at').notNull().defaultNow(),
    }

);
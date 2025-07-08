```javascript
import {
  mysqlTable,
  bigint,
  int,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/mysql-core';
import {
  polls
} from './polls';
import {
  pollOptions
} from './poll_options';

export const textAnswers = mysqlTable(
  'TextAnswers', {
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
  },
  (table) => ({
    pollIdIdx: int('poll_id').notNull().references(() => polls.id).index(),
  })
);

export const optionAnswers = mysqlTable(
  'OptionAnswers', {
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
  },
  (table) => ({
    pollIdIdx: int('poll_id').notNull().references(() => polls.id).index(),
  })
);
```
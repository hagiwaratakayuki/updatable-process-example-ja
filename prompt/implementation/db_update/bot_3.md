```javascript
import {
  mysqlTable,
  bigint,
  int,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/mysql-core';

export const textAnswers = mysqlTable('text_answers', {
  id: bigint('id', {
    mode: 'number'
  }).autoincrement().primaryKey(),
  pollId: int('poll_id').notNull(),
  participantId: varchar('participant_id', {
    length: 255
  }).notNull(),
  participantName: varchar('participant_name', {
    length: 255
  }),
  textAnswer: text('text_answer').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const optionAnswers = mysqlTable('option_answers', {
  id: bigint('id', {
    mode: 'number'
  }).autoincrement().primaryKey(),
  pollId: int('poll_id').notNull(),
  participantId: varchar('participant_id', {
    length: 255
  }).notNull(),
  participantName: varchar('participant_name', {
    length: 255
  }),
  optionId: int('option_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```
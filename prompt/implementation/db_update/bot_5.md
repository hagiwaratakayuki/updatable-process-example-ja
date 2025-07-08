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
} from './polls'; // pollsテーブルの定義をインポート
import {
  pollOptions
} from './poll_options'; // pollOptionsテーブルの定義をインポート

export const textAnswers = mysqlTable('TextAnswers', {
  id: bigint('id', {
    mode: 'number'
  }).autoincrement().primaryKey(),
  pollId: int('poll_id').notNull().references(() => polls.id), // 外部キー制約を追加
  participantId: varchar('participant_id', {
    length: 255
  }).notNull(),
  participantName: varchar('participant_name', {
    length: 255
  }),
  textAnswer: text('text_answer').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const optionAnswers = mysqlTable('OptionAnswers', {
  id: bigint('id', {
    mode: 'number'
  }).autoincrement().primaryKey(),
  pollId: int('poll_id').notNull().references(() => polls.id), // 外部キー制約を追加
  participantId: varchar('participant_id', {
    length: 255
  }).notNull(),
  participantName: varchar('participant_name', {
    length: 255
  }),
  optionId: int('option_id').notNull().references(() => pollOptions.id), // 外部キー制約を追加
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```
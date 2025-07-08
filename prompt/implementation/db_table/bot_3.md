```typescript
import { mysqlTable, int, varchar, text, boolean, timestamp, bigint } from 'drizzle-orm/mysql-core';

export const admins = mysqlTable('Admins', {
  id: int('id').autoincrement().primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

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

export const pollOptions = mysqlTable('PollOptions', {
  id: int('id').autoincrement().primaryKey(),
  pollId: int('poll_id').notNull().references(() => polls.id),
  label: varchar('label', { length: 255 }).notNull(),
  scaleValue: int('scale_value'), // Nullable
  displayOrder: int('display_order').notNull().default(0),
});

export const answers = mysqlTable('Answers', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  pollId: int('poll_id').notNull().references(() => polls.id),
  participantId: varchar('participant_id', { length: 255 }).notNull(),
  participantName: varchar('participant_name', { length: 255 }), // Nullable
  optionId: int('option_id').references(() => pollOptions.id), // Nullable
  textAnswer: text('text_answer'), // Nullable
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```
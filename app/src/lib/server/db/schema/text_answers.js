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
export const textAnswersSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "TextAnswer",
    "description": "自由記述回答のスキーマ",
    "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "format": "int64",
            "description": "主キー (PK)。回答の一意なID。"
        },
        "poll_id": {
            "type": "integer",
            "description": "外部キー (FK)。回答対象のPolls(id)。"
        },
        "participant_id": {
            "type": "string",
            "maxLength": 255,
            "description": "回答者の一時的な識別子。クライアント側で生成・保持するUUIDなど。"
        },
        "participant_name": {
            "type": "string",
            "maxLength": 255,
            "nullable": true,
            "description": "回答者が任意で入力した名前。"
        },
        "text_answer": {
            "type": "string",
            "description": "自由記述の回答内容。"
        },
        "created_at": {
            "type": "string",
            "format": "date-time",
            "description": "回答日時。"
        }
    },
    "required": [
        "id",
        "poll_id",
        "participant_id",
        "text_answer",
        "created_at"
    ]
}

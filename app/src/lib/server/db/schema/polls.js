
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

export const pollsSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Poll",
    "description": "部屋の中で作成される個々のアンケート（質問）",
    "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "description": "アンケートの一意なID",
            "readOnly": true
        },
        "roomId": {
            "type": "integer",
            "description": "このアンケートが属する部屋のID"
        },
        "question": {
            "type": "string",
            "description": "アンケートの質問文"
        },
        "type": {
            "type": "string",
            "description": "アンケートの種類",
            "enum": [
                "choice",
                "scale",
                "text"
            ]
        },
        "allowMultipleAnswers": {
            "type": "boolean",
            "description": "複数回答を許可するかどうか",
            "default": false
        },
        "displayOrder": {
            "type": "integer",
            "description": "部屋の中でのアンケートの表示順",
            "default": 0
        },
        "status": {
            "type": "string",
            "description": "アンケートの進行状態",
            "enum": [
                "waiting",
                "active",
                "closed"
            ]
        },
        "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "アンケート作成日時",
            "readOnly": true
        }
    },
    "required": [
        "roomId",
        "question",
        "type",
        "status"
    ]
}
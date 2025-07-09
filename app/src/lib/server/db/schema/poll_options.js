
import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";
import { polls } from "./polls";

export const pollOptions = mysqlTable('PollOptions', {
    id: int('id').autoincrement().primaryKey(),
    pollId: int('poll_id').notNull().references(() => polls.id),
    label: varchar('label', { length: 255 }).notNull(),
    scaleValue: int('scale_value'), // Nullable
    displayOrder: int('display_order').notNull().default(0),
});

export const pollOptionsScema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "PollOption",
    "description": "選択式・段階式アンケートの「選択肢」や「段階ラベル」",
    "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "description": "選択肢の一意なID",
            "readOnly": true
        },
        "pollId": {
            "type": "integer",
            "description": "この選択肢が属するアンケートのID"
        },
        "label": {
            "type": "string",
            "description": "選択肢のテキスト、または段階式のラベル",
            "maxLength": 255
        },
        "scaleValue": {
            "type": [
                "integer",
                "null"
            ],
            "description": "段階式の場合の段階値（1〜10）"
        },
        "displayOrder": {
            "type": "integer",
            "description": "選択肢の表示順",
            "default": 0
        }
    },
    "required": [
        "pollId",
        "label"
    ]
}
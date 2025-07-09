import { timestamp, mysqlTable, int, varchar, boolean } from "drizzle-orm/mysql-core";
import { admins } from "./admins";

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

export const roomsSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Room",
    "description": "各オンラインイベントのコンテナとなる「部屋」",
    "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "description": "部屋の一意なID",
            "readOnly": true
        },
        "adminId": {
            "type": "integer",
            "description": "この部屋を作成した管理者のID"
        },
        "roomSlug": {
            "type": "string",
            "description": "URL共有用の文字列",
            "maxLength": 255
        },
        "title": {
            "type": "string",
            "description": "イベントのタイトル",
            "maxLength": 255
        },
        "status": {
            "type": "string",
            "description": "部屋の状態",
            "enum": [
                "active",
                "archived"
            ]
        },
        "showRespondentNames": {
            "type": "boolean",
            "description": "回答者名の表示/非表示設定",
            "default": false
        },
        "currentPollId": {
            "type": [
                "integer",
                "null"
            ],
            "description": "現在進行中のアンケートID"
        },
        "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "部屋の作成日時",
            "readOnly": true
        },
        "updatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "最終更新日時",
            "readOnly": true
        }
    },
    "required": [
        "adminId",
        "roomSlug",
        "title",
        "status"
    ]
}

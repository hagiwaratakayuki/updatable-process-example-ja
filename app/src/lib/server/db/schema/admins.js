import { timestamp, mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const admins = mysqlTable('Admins', {
    id: int('id').autoincrement().primaryKey(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const adminsSchema =
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Admin",
    "description": "システムにログインし、イベント（部屋）を作成・管理するユーザー",
    "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "description": "管理者の一意なID",
            "readOnly": true
        },
        "username": {
            "type": "string",
            "description": "ログインに使用するユーザー名",
            "maxLength": 255
        },
        "passwordHash": {
            "type": "string",
            "description": "ハッシュ化されたパスワード",
            "maxLength": 255,
            "writeOnly": true
        },
        "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "アカウント作成日時",
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
        "username",
        "passwordHash"
    ]
}

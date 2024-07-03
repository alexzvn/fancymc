import { mysqlTable, varchar, mediumint, datetime, text, bigint } from 'drizzle-orm/mysql-core'
import { nanoid, customAlphabet } from 'nanoid'

export const sessions = mysqlTable('fancy_sessions', {
  id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  user_id: mediumint('user_id').notNull(),
  updated_at: datetime('updated_at', { mode: 'date' }).$default(() => new Date).$onUpdate(() => new Date)
})

export const forgot = mysqlTable('fancy_forgot_passwords', {
  id: varchar('id', { length: 255 }).primaryKey().$default(() => nanoid()),
  user_id: mediumint('user_id').notNull(),
  token: text('token').$default(() => customAlphabet('abcdef1234567890', 50)())
})

export const attends = mysqlTable('fancy_attends', {
  user_id: mediumint('id').primaryKey().notNull(),
  vote_ip: varchar('ip', { length: 255 }),
  updated_at: datetime('updated_at', { mode: 'date' }).$default(() => new Date()).$onUpdate(() => new Date)
})
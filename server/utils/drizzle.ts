
import { drizzle } from 'drizzle-orm/mysql2'
export { sql, eq, and, or } from 'drizzle-orm'
import mysql from 'mysql2/promise'
import { mysqlTable, varchar, mediumint, bigint, double, float, smallint } from 'drizzle-orm/mysql-core'

const users = mysqlTable('authme', {
  id: mediumint('id').primaryKey().autoincrement().notNull(),
  username: varchar('username', { length: 255 }).unique().notNull(),
  realname: varchar('realname', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).unique().notNull(),
  ip: varchar('ip', { length: 40 }),
  last_login: bigint('lastlogin', { mode: 'number', unsigned: true }),
  x: double('x').default(0),
  y: double('y').default(0),
  z: double('z').default(0),
  world: varchar('world', { length: 255 }).default('world'),
  reg_date: bigint('regdate', { mode: 'number', unsigned: true }).$defaultFn(() => Date.now()),
  reg_ip: varchar('regip', { length: 40 }),
  yaw: float('yaw'),
  pitch: float('pitch'),
  email: varchar('email', { length: 255 }),
  is_logged: smallint('isLogged', { unsigned: true }).default(0),
  has_session: smallint('hasSession', { unsigned: true }).default(0),
  totp: varchar('totp', { length: 32 })

})

export const schema = { users }

const database = () => {
  const { database } = useRuntimeConfig()

  return mysql.createConnection({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.pass,
  })
}

export const useDrizzle = async () => drizzle(await database(), { mode: 'default' })

export type User = typeof schema.users.$inferSelect
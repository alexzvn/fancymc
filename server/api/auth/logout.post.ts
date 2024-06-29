import { obtainUser } from "./session.get"

export default defineEventHandler(async (event) => {
  const { session, drizzle } = await obtainUser(event)

  const [result] = await drizzle.delete(schema.sessions).where(eq(schema.sessions.id, session.id))

  return !!result.affectedRows
})
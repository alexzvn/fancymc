import dayjs from 'dayjs'
import { getIP } from '~/server/utils/ip'


export default defineEventHandler(async event => {
  const { user, drizzle } = await event.context.auth()
  const vote = useVote()
  const ip = getIP(event)

  const attend = await drizzle.query.attends.findFirst({
    where: ({ user_id }, { eq }) => eq(user_id, user.id)
  })

  if (! attend) {
    await drizzle.insert(schema.attends).values({
      user_id: user.id
    })

    vote(user.realname, ip)

    return { success: true }
  }

  const now = dayjs()
  const timestamp = dayjs(attend.updated_at).add(16, 'hours')

  if (timestamp.isAfter(now)) {
    return { success: false }
  }

  await drizzle.update(schema.attends)
    .set({ updated_at: new Date })
    .where(eq(schema.attends.user_id, user.id))

  vote(user.realname, ip)

  return { success: true }
})
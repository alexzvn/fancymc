import dayjs from 'dayjs'
import { getIP } from '~/server/utils/ip'
import { checkEligible } from './vote.get'


export default defineEventHandler(async event => {
  const { user, drizzle } = await event.context.auth()
  const vote = useVote()
  const ip = getIP(event)

  const latest = await checkEligible(drizzle, user.id, ip)

  if (latest && latest.available == false) {
    return { success: false }
  }

  const attend = await drizzle.query.attends.findFirst({
    where: ({ user_id, vote_ip }, { eq, or }) => or(
      eq(user_id, user.id), eq(vote_ip, ip)
    )
  })

  if (! attend) {
    await drizzle.insert(schema.attends).values({
      user_id: user.id,
      vote_ip: ip
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
    .set({ updated_at: new Date, vote_ip: ip })
    .where(eq(schema.attends.user_id, user.id))

  vote(user.realname, ip)

  return { success: true }
})
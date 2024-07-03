import dayjs from 'dayjs'

export default defineEventHandler(async (event) => {
  const { user, drizzle } = await event.context.auth()
  const ip = getIP(event)

  const attend = await drizzle.query.attends.findFirst({
    where: ({ user_id, vote_ip }, { eq, or }) => or(
      eq(user_id, user.id), eq(vote_ip, ip)
    )
  })

  if (! attend) {
    return { available: true, duration: 0 }
  }

  const timestamp = dayjs(attend?.updated_at).add(16, 'hours')

  return {
    available: timestamp.isBefore(dayjs()),
    duration: timestamp.diff(dayjs(), 's')
  }
})

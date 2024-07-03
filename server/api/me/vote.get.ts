import dayjs from 'dayjs'

export default defineEventHandler(async (event) => {
  const { user, drizzle } = await event.context.auth()

  const attend = await drizzle.query.attends.findFirst({
    where: ({ user_id }, { eq }) => eq(user_id, user.id)
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

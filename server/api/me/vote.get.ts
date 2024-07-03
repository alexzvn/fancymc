import dayjs from 'dayjs'

export const checkEligible = async (drizzle: Awaited<ReturnType<typeof useDrizzle>>, id: number, ip: string) => {
  const attends = await drizzle.query.attends.findMany({
    where: ({ user_id, vote_ip }, { eq, or }) => or(
      eq(user_id, id), eq(vote_ip, ip)
    )
  })

  return attends.map(it => {
    const timestamp = dayjs(it.updated_at).add(16, 'hours')
    const duration = timestamp.diff(dayjs(), 's')

    return { ...it, duration, available: timestamp.isBefore(dayjs()) }
  })
  .sort((a, b) => b.duration - a.duration)
  .at(0)
}


export default defineEventHandler(async (event) => {
  const { user, drizzle } = await event.context.auth()
  const ip = getIP(event)

  const attend = await checkEligible(drizzle, user.id, ip)

  if (! attend) {
    return { available: true, duration: 0 }
  }

  return {
    available: attend.available,
    duration: attend.duration
  }
})

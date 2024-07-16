import { type H3Event } from 'h3'
import { type JWTPayload } from './login.post'
import { Misc } from '@amber.js/core'

const TOKEN_TYPE = 'Bearer'

const extractToken = (authHeaderValue: string) => {
  const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `)
  return token
}

export const ensureAuth = (event: H3Event) => {
  const authHeaderValue = getRequestHeader(event, 'authorization')
  if (typeof authHeaderValue === 'undefined') {
    throw createError({ statusCode: 403, statusMessage: 'Need to pass valid Bearer-authorization header to access this endpoint' })
  }

  const jwt = useJWT()

  const extractedToken = extractToken(authHeaderValue)
  try {
    return jwt.verify(extractedToken) as JWTPayload
  } catch (error) {
    throw createError({ statusCode: 403, statusMessage: 'You must be logged in to use this endpoint' })
  }
}

export const obtainUser = async (event: H3Event) => {
  const payload = ensureAuth(event)

  const drizzle = await useDrizzle()

  const session = await drizzle.query.sessions.findFirst({
    where: ({ id }, { eq }) => eq(id, payload.id)
  })

  if (!session) {
    throw createError({ statusCode: 403, statusMessage: 'User appear to be invalid' })
  }

  const user = await drizzle.query.users.findFirst({
    where: ({ id }, { eq }) => eq(id, session.user_id)
  })

  if (!user) {
    throw createError({ statusCode: 403, statusMessage: 'User appear to be invalid' })
  }

  return { user, session, drizzle }
}

export default defineEventHandler(async (event) => {
  const { user } = await obtainUser(event)

  return { ...Misc.pick(user, 'id', 'email', 'username', 'realname') }
})
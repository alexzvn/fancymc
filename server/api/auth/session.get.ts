import { type H3Event } from 'h3'
import { type JWTPayload } from './login.post'
import { Misc } from '@amber.js/core'

const TOKEN_TYPE = 'Bearer'

const extractToken = (authHeaderValue: string) => {
  const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `)
  return token
}


const ensureAuth = (event: H3Event) => {
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

export default defineEventHandler(async (event) => {
  const payload = ensureAuth(event)

  const drizzle = await useDrizzle()

  const [user] = await drizzle.select().from(schema.users).where(eq(schema.users.id, payload.id))

  if (!user) {
    throw createError({ statusCode: 403, statusMessage: 'User appear to be invalid' })
  }

  return { ...Misc.pick(user, 'id', 'email', 'username', 'realname') }
})
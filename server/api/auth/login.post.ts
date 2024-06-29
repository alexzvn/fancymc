import { createError, eventHandler } from 'h3'
import { useValidatedBody, z } from 'h3-zod'
import { Misc } from '@amber.js/core'

const falseError = createError({
  statusCode: 400,
  message: 'Tài khoản hoặc mật khẩu không đúng'
})

export type JWTPayload = {
  id: number
  mode: 'access'|'refresh'
  iat: number
  exp: number
}


export default eventHandler(async event => {
  const body = await useValidatedBody(event, z.object({
    username: z.string().min(1).max(255),
    password: z.string().min(1).max(255)
  }))

  const drizzle = await useDrizzle()
  const jwt = useJWT()

  const user = await drizzle.query.users.findFirst({
    where: eq(schema.users.username, body.username.toLowerCase())
  })

  if (!user || !jwt.password.check(body.password, user.password)) {
    throw falseError
  }

  const [session] = await drizzle.insert(schema.sessions).values({
    user_id: user.id
  })


  return {
    ... Misc.pick(user, 'id', 'email', 'username', 'realname'),
    token: jwt.sign({ id: session.insertId, mode: 'access' }, {
      algorithm: 'HS256' as 'none',
      expiresIn: '3d'
    })  
  }
})
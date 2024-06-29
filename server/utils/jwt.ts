import type { sign, verify } from 'jsonwebtoken'
import JWT from 'jsonwebtoken'
import sha256 from 'crypto-js/sha256.js'
import { timingSafeEqual, randomBytes } from 'node:crypto'

export const useJWT = () => {
  const { app } = useRuntimeConfig()

  type SignParam = Parameters<typeof sign>

  /** implementation of SHA256 password hash */
  const password = Object.seal({
    check: (plain: string, hashed: string) => {
      const [salt, password] = hashed.split('$').slice(-2)
      const computed = sha256(sha256(plain) + salt).toString()

      return timingSafeEqual(Buffer.from(password), Buffer.from(computed))
    },

    hash: (plain: string) => {
      const salt = randomBytes(8).toString('hex')
      const hashed = sha256(sha256(plain) + salt)

      return `$SHA$${salt}$${hashed}`
    }
  })

  return {
    sign: (payload: SignParam[0], options?: SignParam[2]) => JWT.sign(payload, app.secret, options),
    verify: (token: string, options?: Parameters<typeof verify>[2]) => JWT.verify(token, app.secret, options),
    decode: JWT.decode,
    password
  }
}
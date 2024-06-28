import { createPublicKey, publicEncrypt, constants } from 'node:crypto'
import { connect } from 'node:net'

export const useVote = (site = 'FancyMC') => {
  const { votifier } = useRuntimeConfig()

  const key = createPublicKey(votifier.publicKey)

  return (username: string, ip: string) => {
    const payload = Buffer.from([
      'VOTE', site, username, ip, new Date().getTime()
    ].join('\n'))

    const buffer = publicEncrypt({ key, padding: constants.RSA_PKCS1_PADDING }, payload)
    const socket = connect({ host: votifier.host, port: votifier.port })

    return new Promise<void>((ok, reject) => {
      const callback = (error?: any) => error ? reject(error) : ok()

      socket.on('close', callback)
      socket.on('connect', () => {
        socket.write(buffer, callback)
        socket.end(callback)
      })
    })
  }
}
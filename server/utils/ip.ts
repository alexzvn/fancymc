import { type H3Event } from 'h3'

export const getIP = (event: H3Event) => {
  return event.headers.get('cf-connecting-ip') ?? getRequestIP(event) ?? '127.0.0.1'
}
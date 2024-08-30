import type { H3Event } from 'h3'

type TurnstileResponse = { success: boolean }


export const captcha = async (event: H3Event, challenge: string) => {
  const secret = useRuntimeConfig().turnstileSecret

  const ip = getHeader(event, 'cf-connecting-ip')
    || getHeader(event, 'x-forwarded-for')
    || event.node.req.socket.remoteAddress!

  const form = new FormData()
  form.append('secret', secret)
  form.append('remoteip', ip)
  form.append('response', challenge)

  const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form
  }).then(res => res.json())

  return check as TurnstileResponse
}
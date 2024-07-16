import { ensureAuth } from "../api/auth/session.get"

export default defineEventHandler(event => {
  event.context.verifyPaperApiCall = async () => {
    const identity = ensureAuth(event) as unknown as Partial<{ api: 'paper' }>

    if (identity.api !== 'paper') {
      throw createError({ statusCode: 401, message: "Invalid API Call" })
    }
  }
})

declare module 'h3' {
  interface H3EventContext {
    /**
     * Get auth session
     */
    verifyPaperApiCall: () => Promise<unknown>
  }
}
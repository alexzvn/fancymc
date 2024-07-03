import { obtainUser } from '../api/auth/session.get'


export default defineEventHandler((event) => {
  event.context.auth = () => obtainUser(event)
})

declare module 'h3' {
  interface H3EventContext {
    /**
     * Get auth session
     */
    auth: () => ReturnType<typeof obtainUser>
  }
}
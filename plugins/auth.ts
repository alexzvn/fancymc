import { useSessionStorage } from "@vueuse/core"

export default defineNuxtPlugin(async () => {
  const { auth, cookie, refresh, token } = useAuthState()

  if (import.meta.browser && import.meta.dev) {
    Object.assign(window, { useRequest })
  }

  if (!cookie.value) {
    return
  }

  if (import.meta.server) {
    auth.value = await $fetch('/api/auth/session', {
      headers: { Authorization: token.value! }
    })
  }

  const session = useSessionStorage<any>('auth.user', undefined, {
    serializer: {
      read: JSON.parse,
      write: JSON.stringify
    }
  })

  auth.value = session.value

  await refresh().finally(() => session.value = auth.value)
})
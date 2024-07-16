import { useSessionStorage } from "@vueuse/core"


export default defineNuxtPlugin({
  enforce: 'pre',

  hooks: {
    'app:created': async () => {
      const { auth, token } = useAuth()

      if (! import.meta.server || !token.value) {
        return
      }

      auth.value = await $fetch('/api/auth/session', {
        headers: { Authorization: token.value! }
      })
    }
  },

  async setup() {
    const { auth, cookie, refresh, token } = useAuthState()

    if (import.meta.browser && import.meta.dev) {
      Object.assign(window, { useRequest })
    }

    if (!cookie.value) {
      return
    }
  
    const session = useSessionStorage<any>('auth.user', undefined, {
      serializer: {
        read: JSON.parse,
        write: JSON.stringify
      }
    })

    auth.value = session.value

    await refresh().finally(() => session.value = auth.value)
  }
})
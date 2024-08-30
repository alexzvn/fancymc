import type { H3Error } from 'h3'

type Credential = {
  email?: string
  username?: string
  password: string,

  /**
   * Cloudflare challenge token
   */
  challenge: string
}

type User = {
  id: number
  email?: string
  username: string
  realname: string
}

const makeState = <T>() => {
  const cookie = useCookie('auth.token')
  const auth = ref<T>()
  const token = computed(() => cookie.value ? 'Bearer ' + cookie.value : undefined)

  const setAuth = (state?: T) => auth.value = state

  const clear = () => {
    cookie.value = undefined
    auth.value = undefined
  }

  const refresh = async () => {
    if (! cookie.value) {
      return
    }

    return $fetch('/api/auth/session', { headers: { Authorization: token.value! } })
      .catch((e: H3Error) => {
        if (e.statusCode >= 400 && e.statusCode < 500) {
          clear()
        }
      })
      .then(data => auth.value = data as T)
  }

  const signIn = async (credential: Credential) => {
    return $fetch('/api/auth/login', { method: 'POST', body: credential })
      .then(data => {
        cookie.value = data.token
        auth.value = data as T
      })
  }

  const signOut = async () => {
    return $fetch('/api/auth/logout', { method: 'POST', headers: { Authorization: token.value! } })
      .catch(() => {})
      .finally(clear)
      .then(() => { navigateTo('/') })
  }

  return { token, auth, cookie, setAuth, signIn, signOut, refresh }
}

export const useAuthState: typeof makeState = <T>() => {
  // @ts-ignore
  useAuthState.cache ??= makeState<T>()

   // @ts-ignore
  return useAuthState.cache
}

export const useAuth = <T extends User>() => {
  return useAuthState<T>()
}
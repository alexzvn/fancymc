
export default defineNuxtPlugin(async () => {
  const { data: state, loading, setToken, token } = useAuthState()

  if (import.meta.browser && import.meta.dev) {
    Object.assign(window, { useRequest })
  }

  const cookie = useCookie('auth.token')

  if (! token.value && cookie.value) {
    setToken(cookie.value)
  }

  if (state.value || !token.value) {
    return
  }

  await useAsyncData('custom.auth.user', async () => {
    loading.value = true

    return $fetch('/api/auth/session', { method: 'GET', headers: { Authorization: token.value! } })
      .then((user) => state.value = user)
      .finally(() => loading.value = false)
  })
})


export default defineNuxtRouteMiddleware((from, to) => {
  const { token } = useAuth()

  if (!token.value) {
    return navigateTo('/auth/login?redirect=' + encodeURIComponent(to.fullPath))
  }
})
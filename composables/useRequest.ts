

type Fetch = typeof $fetch

const request = (request: any, options?: any) => {
  const { token } = useAuth()

  options ??= {} as any
  options!.headers ??= {}

  Object.assign(options!.headers, { Authorization: token.value })

  return $fetch(request, options)
}

export const useRequest = request as Fetch

export type ServerStatus = {
  online: boolean
  host: string
  port: number
  ip_address: string
  eula_blocked: boolean

  retrieved_at: number
  expires_at: number

  version?: {
    name_raw: string
    name_clean: string
    name_html: string
    protocol: number
  }

  players: {
    online: number
    max: number

    list: Array<{
      uuid: string,
      name_raw: string
      name_clean: string
      name_html: string
    }>
  },

  motd: { raw: string, clean: string, html: string }
  mods: Array<{ name: string, version: string }>

  icon?: string
  software?: string

  plugins: Array<{ name: string, version: string }>
  srv_record: Array<{ host: string, port: number }>
}

export const useServerStatus = () => {
  const { data } = useAsyncData('fancy:status', () => $fetch<ServerStatus>('https://api.mcstatus.io/v2/status/java/play.fancymc.net'))

  return data as Ref<ServerStatus>
}
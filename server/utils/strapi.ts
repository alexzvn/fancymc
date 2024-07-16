import { mande } from 'mande'
import { type H3Event } from 'h3'

export const useStrapiMande = () => {
  const { strapi } = useRuntimeConfig()

  const api = mande(strapi.url)

  api.options.headers ??= {}
  api.options.headers.Authorization = 'Bearer ' + strapi.secret

  return api
}

export const obtainMultipartData = async (event: H3Event) => {
  const body = await readMultipartFormData(event)
  const fields: Record<string, File|string|undefined> = {}

  if (! body) {
    return fields
  }

  for (const { name, type, data, filename } of body) {
    if (! name) { continue }

    fields[name] = filename ? new File([data], filename, { type }) : data.toString()
  }

  return fields
}
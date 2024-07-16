import { z } from 'zod'
import omit from 'lodash/omit'
import { obtainMultipartData, useStrapiMande } from '~/server/utils/strapi'
import { Strapi4ResponseMany } from '@nuxtjs/strapi'

const schema =  z.object({
  name: z.string(),
  amount: z.coerce.number(),
  material: z.string(),
  server: z.string().or(z.number()),
  data: z.string(),
  sha1: z.string(),
  icon: z.any().refine(field => field instanceof File).optional(),
  preview: z.any().refine(field => field instanceof File).optional(),
})

export default defineEventHandler(async (event) => {
  const api = useStrapiMande()

  await event.context.verifyPaperApiCall()

  const body = await obtainMultipartData(event)
  body.server = getRequestHeader(event, 'Minecraft-Server')

  await api.get<Strapi4ResponseMany<{ name: string }>>(`/api/servers?filters[name]=${body.server}&publicationState=preview`)
    .then(response => {
      body.server = response.data[0]?.id as any
    })

  const attributes = schema.parse(body)

  await api.get<Strapi4ResponseMany<any>>(`/api/items?filters[sha1]=${attributes.sha1}&publicationState=preview`)
    .then(response => {
      if (response.data.length) {
        throw createError({ status: 403, message: "&4Item này đã tồn tại trong hệ thống" })
      }
    })


  const form = new FormData()

  for (const [key, value] of Object.entries(attributes)) {
    if (value instanceof File) {
      form.append(`files.${key}`, value)
    }
  }

  form.append("data", JSON.stringify(
    omit({ ...attributes, published_at: new Date().toISOString() }, ['icon', 'preview'])
  ))

  return api.post('/api/items', form)
    .then(() => ({ message: '&aItem uploaded successfully' }))
})
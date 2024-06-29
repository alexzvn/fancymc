import { useMigration } from '~/server/utils/drizzle'

export default defineNitroPlugin(async (ctx) => {
  import.meta.dev && await useMigration()
})
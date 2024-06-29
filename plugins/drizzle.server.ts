import { useMigration } from '~/server/utils/drizzle'

export default defineNuxtPlugin(async (ctx) => {
  import.meta.dev && await useMigration()
})
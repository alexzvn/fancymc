import { defineConfig } from 'drizzle-kit'


export default defineConfig({
  dialect: 'mysql',
  schema: './server/utils/schema/schema.ts',
  out: './server/utils/schema/migrations'
})
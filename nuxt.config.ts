// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['assets/style.css'],

  modules: [
    '@nuxt/content',
    '@nuxthq/studio',
    "@nuxt/image",
    '@nuxtjs/tailwindcss',
    "@nuxt/icon",
    "@sidebase/nuxt-auth"
  ],

  app: {
    rootAttrs: { 'data-theme': 'fancy' },

    head: {
      title: 'FancyMC - Server minecraft tại Việt Nam'
    }
  },

  runtimeConfig: {
    database: {
      host: 'localhost',
      name: 'paper_global',
      user: 'root',
      pass: 'abc@123'
    }
  },

  auth: {
    provider: {
      type: 'local'
    }
  }
})
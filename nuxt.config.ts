// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['assets/style.css'],

  modules: [
    '@nuxt/content',
    '@nuxthq/studio',
    "@nuxt/image",
    '@nuxtjs/tailwindcss',
    "@nuxt/icon"
  ],

  app: {
    rootAttrs: { 'data-theme': 'fancy' }
  }
})
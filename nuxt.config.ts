import fs from 'fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: { viewTransition: true },

  css: ['assets/style.css'],

  modules: [
    '@nuxt/content',
    '@nuxthq/studio',
    "@nuxt/image",
    '@nuxtjs/tailwindcss',
    "@nuxt/icon",
    '@nuxtjs/strapi'
  ],

  strapi: {
    url: process.env.NUXT_STRAPI_URL
  },

  app: {
    rootAttrs: { 'data-theme': 'fancy' },

    head: {
      title: 'FancyMC - Server minecraft tại Việt Nam'
    }
  },

  runtimeConfig: {
    app: {
      secret: '0x00x0x0x0x0x'
    },

    strapi: {
      secret: '0x0000000000'
    },

    votifier: {
      host: 'proxy.fancymc.net',
      port: 8192,
      publicKey: fs.readFileSync('./public.key').toString()
    },

    database: {
      host: 'localhost',
      name: 'paper_global',
      user: 'root',
      pass: 'abc@123'
    }
  },

  routeRules: {
    '/**': { prerender: false }
  }
})
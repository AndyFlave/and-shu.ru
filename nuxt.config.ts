// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],

  ssr: false,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: false,
      routes: ['/', '/timeline', '/privacy'],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Andrey Shushunov — Senior Frontend Developer | Personal website',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'yandex-verification', content: '557f48d6fd4c99e2' },
        {
          name: 'description',
          content:
            'Личный сайт Андрея Шушунова — Senior Frontend Developer из Тбилиси. Таймлайн, интересы, инженерные подходы и продуктовые эксперименты.',
        },
        { property: 'og:title', content: 'Andrey Shushunov — Senior Frontend Developer' },
        {
          property: 'og:description',
          content:
            'Личный сайт Андрея Шушунова — Senior Frontend Developer из Тбилиси.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://and-shu.ru/' },
        { property: 'og:locale', content: 'ru_RU' },
        { name: 'theme-color', content: '#0a0a0a' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'and-shu' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
        { rel: 'apple-touch-icon', href: '/icon.svg' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      yandexMetrikaId: '92329310',
      siteUrl: 'https://and-shu.ru',
      contactEmail: 'infinitumDevelopment@yandex.ru',
    },
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  icon: {
    serverBundle: {
      collections: ['lucide', 'simple-icons'],
    },
  },
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
    typeCheck: true,
  },

  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
})

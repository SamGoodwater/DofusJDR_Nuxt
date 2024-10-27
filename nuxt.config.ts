// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    "@prisma/nuxt",
    "@nuxt/image",
    '@nuxt/content'
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '//public/logos/logo.ico' },
        { rel: 'icon', type: 'image/png', href: '//public/logos/logo.png' }
      ],
      
    },
  },
  
    // Configuration du projet
    runtimeConfig: {
  
      // Authentification
      oauth_by:{
        github: true,
        google: false,
        microsoft: false,
        discord: false
      },
      oauth: {
        github: {
          clientId: '',
          clientSecret: ''
        },
        google: {
          clientId: '',
          clientSecret: '',
          redirectURL: '',
        },
        microsoft: {
          clientId: '',
          clientSecret: '',
          tenant: '',
          scope: [],
          authorizationURL: '',
          tokenURL: '',
          userURL: '',
          redirectURL: '',
        },
        discord: {
          clientId: '',
          clientSecret: '',
          redirectURL: '',
        }
      },
  
      // Public
      public: {
  
      }
    }
})

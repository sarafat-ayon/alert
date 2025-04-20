import path from 'path'
import fs from 'fs'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Social Media Monitoring Software',
    titleTemplate: '%s | Ediscovery Service | Sharp Archive',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: process.env.META_KEYWORDS },
      { property: 'og:type', content: 'website' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png',
      },
      {
        hid: 'canonical',
        rel: 'canonical',
        href: process.env.APP_URL,
      },
    ],
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}&libraries=places`,
        async: true,
      },
      // {
      //   src: `https://pay.google.com/gp/p/js/pay.js`,
      //   async: true,
      // }
    ],
  },

  loading: {
    color: '#E4801D',
    height: '3px',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.css'],

  // Default all routes are private
  router: {
    middleware: ['auth', 'color'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/vue-carousel.client.js',
    '~/plugins/lazy-load-images.client.js',
    '~/plugins/filters.js',
    '~/plugins/currency.js',
    '~/plugins/vuelidate.js',
    '~/plugins/vue-credit-card-validation.js',
    '~/plugins/tel-input.js',
    '~/plugins/vue-mask.js',
    '~/plugins/globals.js',
    '~/plugins/multi-select.js',
    '~/plugins/vue-stripe.client.js',
    '~/plugins/v-video-embed.client.js',
    '~/plugins/perfect-scrollbar.client.js',
    '~/plugins/axios.js',
    '~/plugins/vidle.js',
    '~/plugins/v-calendar.client.js',
    '~/plugins/gt.client.js',
    { src: '~plugins/vuedraggable.client.js', ssr: false },
    { src: '~/plugins/vue-apexchart.js', ssr: false },
    '~/plugins/vue-pdf-embed.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/composition-api/module',
    ['@pinia/nuxt', { disableVuex: false }],
    // ngrok for live server
    // '@nuxtjs/ngrok',
    '@nuxtjs/google-analytics',
  ],

  // Google Analytics
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },

  // Google Tag Manager
  gtm: {
    id: process.env.GOOGLE_TAG_MANAGER_ID,
  },

  device: {
    refreshOnResize: true,
    defaultUserAgent:
      'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Mobile Safari/537.36',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // auth
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
    // toast
    '@nuxtjs/toast',
    // '@nuxtjs/sentry',
    // stripe
    [
      'nuxt-stripe-module',
      {
        publishableKey: process.env.STRIPE_KEY,
      },
    ],
    // fontawesome
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas'],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab'],
          },
        ],
      },
    ],
    // social module
    '~/modules/social',
    // facebook pixel
    'nuxt-facebook-pixel-module',
    // google tag manager
    '@nuxtjs/gtm',
  ],

  // sentry: {
  //   // Additional Module Options go here
  //   // https://sentry.nuxtjs.org/sentry/options
  //   publishRelease: true,
  //   sourceMapStyle: 'hidden-source-map',
  //   config: {
  //     // Add native Sentry config here
  //     // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
  //     debug: process.env.NODE_ENV !== 'production',
  //     release: process.env.GIT_COMMIT_SHA,
  //   },
  // },

  facebook: {
    pixelId: process.env.FACEBOOK_PIXEL_ID,
    autoPageView: true,
  },

  toast: {
    position: 'top-center',
    duration: 5000,
    keepOnHover: true,
    register: [
      // Register custom toasts
      {
        name: 'default-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error',
        },
      },
    ],
  },
  /*
   ** Public runtime config variables
   */
  publicRuntimeConfig: {
    appName: process.env.NUXT_PUBLIC_APP_NAME,
    appURL: process.env.NUXT_PUBLIC_APP_URL,
    apiURL: process.env.NUXT_PUBLIC_API_URL,
    cdnURL: 'https://cdn.sharparchive.com',
    stripeKey: process.env.NUXT_PUBLIC_STRIPE_KEY,
    googleMapKey: process.env.GOOGLE_MAP_KEY,
    googleMeasurementId: process.env.GOOGLE_MEASUREMENT_ID,
    facebookPixelId: process.env.NUXT_PUBLIC_FACEBOOK_PIXEL_ID,
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    googleTagManagerId: process.env.GOOGLE_TAG_MANAGER_ID,
    workflow: process.env.NUXT_PUBLIC_WORKFLOW,
    googleAdsTagId1: process.env.GOOGLE_ADS_TAG_ID_1,
    googleAdsTagId2: process.env.GOOGLE_ADS_TAG_ID_2,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    debug: process.env.NODE_ENV !== 'production',
    proxy: true,
  },

  // Axios proxy: https://axios.nuxtjs.org/options#proxy
  proxy: {
    '/api/': {
      target: process.env.NUXT_PUBLIC_API_URL,
      secure: false,
    },
    '/api-fake/': {
      target: process.env.API_FAKE_URL,
      secure: process.env.NODE_ENV === 'production',
    },
    '/maps/': 'https://maps.googleapis.com',
  },

  /*
   ** Authentication options.
   */
  auth: {
    redirect: {
      login: '/?showLogin=true',
      logout: '/',
      callback: false,
      home: false,
    },
    resetOnError: true,
    strategies: {
      local1: {
        scheme: 'refresh',
        endpoints: {
          login: { url: 'api/security/login/', method: 'post' },
          refresh: { url: 'api/security/refresh/', method: 'post' },
          logout: { url: 'api/security/logout/', method: 'post' },
          user: { url: 'api/user/profile/', method: 'get' },
        },
        token: {
          property: 'access',
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
        },
        user: {
          property: 'data',
        },
      },
      local2: {
        scheme: 'refresh',
        endpoints: {
          login: { url: 'api/security/otp/', method: 'post' },
          refresh: { url: 'api/security/refresh/', method: 'post' },
          logout: { url: 'api/security/logout/', method: 'post' },
          user: { url: 'api/user/profile/', method: 'get' },
        },
        token: {
          property: 'access',
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
        },
        user: {
          property: 'data',
        },
      },
    },
    plugins: ['~/plugins/auth.js'],
  },

  social: {
    facebook: {
      clientId: process.env.NUXT_PUBLIC_SOCIAL_FACEBOOK_CLIENT_ID,
      authorization: 'https://www.facebook.com/v18.0/dialog/oauth',
      scope: process.env.NUXT_PUBLIC_SOCIAL_FACEBOOK_SCOPE,
      responseType: 'code',
      codeChallengeMethod: '',
      redirectUri: process.env.NUXT_PUBLIC_SOCIAL_FACEBOOK_REDIRECT_URL,
    },
    instagram: {
      clientId: process.env.NUXT_PUBLIC_SOCIAL_INSTAGRAM_CLIENT_ID,
      authorization: 'https://www.instagram.com/oauth/authorize',
      scope: process.env.NUXT_PUBLIC_SOCIAL_INSTAGRAM_SCOPE,
      responseType: 'code',
      // codeChallengeMethod: '',
      redirectUri: process.env.NUXT_PUBLIC_SOCIAL_INSTAGRAM_REDIRECT_URL,
      forceAuthentication: '1',
    },
    linkedin: {
      clientId: process.env.NUXT_PUBLIC_SOCIAL_LINKEDIN_CLIENT_ID,
      authorization: 'https://www.linkedin.com/oauth/v2/authorization',
      scope: process.env.NUXT_PUBLIC_SOCIAL_LINKEDIN_SCOPE,
      responseType: 'code',
      codeChallengeMethod: '',
      redirectUri: process.env.NUXT_PUBLIC_SOCIAL_LINKEDIN_REDIRECT_URL,
    },
    twitter: {
      clientId: process.env.NUXT_PUBLIC_SOCIAL_TWITTER_CLIENT_ID,
      authorization: 'https://twitter.com/i/oauth2/authorize',
      scope: process.env.NUXT_PUBLIC_SOCIAL_TWITTER_SCOPE,
      responseType: 'code',
      codeChallengeMethod: 'plain',
      redirectUri: process.env.NUXT_PUBLIC_SOCIAL_TWITTER_REDIRECT_URL,
    },
    pinterest: {
      clientId: process.env.NUXT_PUBLIC_SOCIAL_PINTEREST_CLIENT_ID,
      authorization: 'https://www.pinterest.com/oauth/',
      scope: process.env.NUXT_PUBLIC_SOCIAL_PINTEREST_SCOPE,
      responseType: 'code',
      redirectUri: process.env.NUXT_PUBLIC_SOCIAL_PINTEREST_REDIRECT_URL,
    },
    reddit: {
      clientId: process.env.NUXT_PUBLIC_SOCIAL_REDDIT_CLIENT_ID,
      authorization: 'https://www.reddit.com/api/v1/authorize',
      scope: process.env.NUXT_PUBLIC_SOCIAL_REDDIT_SCOPE,
      responseType: 'code',
      redirectUri: process.env.NUXT_PUBLIC_SOCIAL_REDDIT_REDIRECT_URL,
      duration: 'permanent',
    },
    tiktok: {
      clientKey: process.env.NUXT_PUBLIC_SOCIAL_TIKTOK_CLIENT_KEY,
      authorization: 'https://www.tiktok.com/v2/auth/authorize/',
      scope: process.env.NUXT_PUBLIC_SOCIAL_TIKTOK_SCOPE,
      responseType: 'code',
      redirectUri: process.env.NUXT_PUBLIC_SOCIAL_TIKTOK_REDIRECT_URL,
    },
    google: {
      clientId: process.env.NUXT_PUBLIC_SOCIAL_GOOGLE_CLIENT_ID,
      nonce: Math.floor(Math.random() * 100 + 10),
      prompt: 'consent',
      accessType: 'offline',
      authorization: 'https://accounts.google.com/o/oauth2/v2/auth',
      scope: process.env.NUXT_PUBLIC_SOCIAL_GOOGLE_SCOPE,
      responseType: 'code',
      redirectUri: process.env.NUXT_PUBLIC_SOCIAL_GOOGLE_REDIRECT_URL,
    },
    microsoft: {
      clientId: process.env.NUXT_PUBLIC_SOCIAL_MICROSOFT_CLIENT_ID,
      authorization:
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      scope: process.env.NUXT_PUBLIC_SOCIAL_MICROSOFT_SCOPE,
      responseType: 'code',
      redirectUri: process.env.NUXT_PUBLIC_SOCIAL_MICROSOFT_REDIRECT_URL,
    },
    youtube: {
      clientId: process.env.NUXT_PUBLIC_SOCIAL_YOUTUBE_CLIENT_ID,
      prompt: 'consent',
      accessType: 'offline',
      authorization: 'https://accounts.google.com/o/oauth2/v2/auth',
      scope: process.env.NUXT_PUBLIC_SOCIAL_YOUTUBE_SCOPE,
      responseType: 'code',
      redirectUri: process.env.NUXT_PUBLIC_SOCIAL_YOUTUBE_REDIRECT_URL,
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      purpose: 'any',
    },
    manifest: {
      lang: 'en',
      name: process.env.APP_NAME,
      short_name: process.env.APP_SHORT_NAME,
      background_color: '#393E46',
      useWebmanifestExtension: true,
      start_url: `${process.env.APP_URL}/home`,
      id: `${process.env.APP_URL}?showLogin=true`,
    },
    meta: {
      theme_color: '#E4801D',
    },
    workbox: {
      preCaching: [
        '/favicon.ico',
      ]
    }
  },
  // ngrok: {
  //   authtoken: process.env.NGROK_AUTHTOKEN,
  //   region: 'in',
  // },
  server:
    process.env.NODE_ENV !== 'production'
      ? {
          https: {
            key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
          },
        }
      : {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    publicPath: process.env.AWS_CDN,
    vendor: ['vue-apexchart'],
  },
}
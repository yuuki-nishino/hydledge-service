import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Hydledge',
    title: 'Hydledge',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '「水のチカラで現在から未来の全ての人と地球を健康にする」というパーパスで水に関するデータや情報を発信するサイト-Hydledge' },
      { hid: 'keywords', name: 'keywords', content: 'Hydledge, 水, 硬度, 水道料金'},
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:image', content: '/thumbnail.png' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Hydledge'},
      { hid: 'og:title', property: 'og:title', content: 'Hydledge'},
      { hid: 'og:description', property: 'og:description', content: '「水のチカラで現在から未来の全ての人と地球を健康にする」というパーパスで水に関するデータや情報を発信するサイト-Hydledge'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon_Hydledge.ico' },
      { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      { rel: 'preconnect', href: 'https://fonts.gstatic.com'},
      { href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;300;400;500;600;700;900&display=swap', rel: 'stylesheet' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
      {
        src: '~/plugins/amcharts.js',
        ssr: false
      },
      '~plugins/vue-scrollto',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
    "@nuxtjs/svg",
    // '@nuxtjs/sitemap',
    // '@nuxtjs/google-analytics',
    '@nuxtjs/google-gtag',
    // '@aceforth/nuxt-optimized-images',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // '@nuxtjs/sitemap',
    // '@nuxtjs/google-analytics',
    ['@nuxtjs/google-gtag', {
      id: 'G-8W51QZ329Y',
      debug: false,
    }
    ],
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-8359692100041294',
      pageLevelAds: true,
    }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // 'google-tag': {
  //   id: process.env.GOOGLE_ANALYTICS_ID,
  //   debug: false,
  // },
  
  // sitemap: {
  //   path: '/sitemap.xml',
  //   exclude: [
  //     '/static/404.html'
  //   ]
  // },

  // googleAnalytics: {
  //   id: process.env.GOOGLE_ANALYTICS_ID,
  // },

  // publicRuntimeConfig: {
  //   googleAnalytics: {
  //     id: process.env.GOOGLE_ANALYTICS_ID,
  //   }
  // },


  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#0E2997',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  // buildDir: 'nuxt-dist',
  target: 'static',
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  },
  svg: {
    vueSvgLoader: {
        // vue-svg-loader options
    },
    svgSpriteLoader: {
        // svg-sprite-loader options
    },
    fileLoader: {
        // file-loader options
    }
  },
  optimizedImages: {
    optimizeImages: false,
    optimizeImagesInDev: false,
  },
  generate: {
    fallback: true
  }
}

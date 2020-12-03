export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '猫九大大の小窝',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src:
          "https://cdn.jsdelivr.net/gh/jianchengwang/live2d_models@main/assets/js/live2dv3.init.js",
        mode: "client",
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~assets/main.scss', '~static/css/typo.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/common.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    "@nuxtjs/tailwindcss"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    liveEdit: false,
    markdown: {
      tocDepth: 5
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },

  generate: {
    // routes: [
    //   '/about/index',
    //   '/albums/bilibili',
    //   '/albums/blessing-on-this-wonderful-world',
    //   '/albums/chitong',
    //   '/albums/index',
    //   '/albums/wallpaper',
    //   '/books/index',
    //   '/girls/index',
    //   '/life/helloword',
    //   '/store/大荒',
    //   '/store/断刀残雪',
    //   '/store/明月泪',
    //   '/store/温柔刀',
    //   '/store/长安乱',
    //   '/tech/canal',
    //   '/tech/centos7',
    //   '/tech/curl',
    //   '/tech/debian',
    //   '/tech/docker',
    //   '/tech/electron-vue',
    //   '/tech/es6',
    //   '/tech/flask-todolist',
    //   '/tech/flink',
    //   '/tech/functional-programming-in-javascript',
    //   '/tech/git',
    //   '/tech/Gradle',
    //   '/tech/intro-to-serverless-functions',
    //   '/tech/intro-to-vue',
    //   '/tech/java8',
    //   '/tech/keep-async-await-from-blocking-execution',
    //   '/tech/live2d-web',
    //   '/tech/manjaro',
    //   '/tech/nacos',
    //   '/tech/pandas',
    //   '/tech/ssh',
    //   '/tech/this-in-javascript',
    //   '/tech/tlcl',
    //   '/tech/vps',
    //   '/tech/web-design-in-4-minutes',
    // ]
    // routes() {
    //   const deployUtils = require('./deploy/utils.js')
    //   return deployUtils.genRoutes('./content').map(path => {
    //     return {
    //       route: path,
    //     }
    //   })
    // }
  }
}

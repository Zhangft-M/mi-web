export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '觅社区',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,maximum-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel: 'stylesheet',href: '/layui/css/layui.css'},
      {rel: 'stylesheet',href: '/css/global.css'},
      {rel: 'stylesheet',href: '/css/hover.css'},
      {rel: 'stylesheet',href: '/font-awesome/css/font-awesome.min.css'},
      {
         rel:"stylesheet",
         href:"https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      }
    ],
    script: [
      {src: '/layui/layui.js'},
      {src: '/layui/layui.all.js'}
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/static/css/main.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'vue-sweetalert2/nuxt'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
  }
}

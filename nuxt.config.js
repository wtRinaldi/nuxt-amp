
const modifyHtml = (html) => {
  // Add amp-custom tag to added CSS
  html = html.replace(/<style data-vue-ssr/g, '<style amp-custom data-vue-ssr')
  // Remove every script tag from generated HTML
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  // Add AMP script before </head>
  const ampScript = '<script async src="https://cdn.ampproject.org/v0.js"></script>'
  html = html.replace('</head>', ampScript + '</head>')
  return html
}



export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-amp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/main.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  render: {
    // Disable resourceHints since we don't load any scripts for AMP
    resourceHints: false
  },

  hooks: {
    // This hook is called before generatic static html files for SPA mode
    'generate:page': (page) => {
      page.html = modifyHtml(page.html)
    },
    // This hook is called before rendering the html to the browser
    'render:route': (url, page, { req, res }) => {
      page.html = modifyHtml(page.html)
    }
  }
}

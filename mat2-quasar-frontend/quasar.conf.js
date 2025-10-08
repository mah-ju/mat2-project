// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'axios',
    ],

    css: [
      'app.sass',
      'uppy_adaptions.sass'
    ],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],
    preFetch: true,

    framework: {
      // iconSet: 'ionicons-v4',
      // lang: 'de', // Quasar language

      // importStrategy: 'auto', // “importStrategy” (valid values: ‘auto’ or ‘all’; ‘auto’ is the default)

      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        'QPageContainer',
        'QPage',
        'QBtn',
        'QIcon',
        'QFab',
        'QFabAction',
        'QPageSticky',
        'QImg',
        'QCard',
        'QCardActions',
        'QBadge',
        'QChip',
        'QCircularProgress',
        'QBtnDropdown',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QList',
        'QDialog',
        'QCardSection',
        'QMenu',
        'QTable',
        'QTh',
        'QTr',
        'QTd'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify'
      ]
    },
    build: {
      publicPath: (process.env.QUASAR_PUBLIC_PATH === undefined
        ? '/'
        : process.env.QUASAR_PUBLIC_PATH),
      appBase: (process.env.QUASAR_APP_BASE === undefined
        ? '/'
        : process.env.QUASAR_APP_BASE),

      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      gzip: false,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.plugins.push(new ESLintPlugin({
          extensions: ['js', 'vue']
        }));
        //cfg.module.rules.push()
      },
      env: ctx.dev
        ? {
          API_URL: process.env.MAT2_API_URL_DEV,
          MAX_UPLOAD_SIZE: process.env.MAX_UPLOAD_SIZE || 104857600,
          MAX_UPLOAD_FILES: process.env.MAX_UPLOAD_FILES || 10
      }
        : {
          API_URL: process.env.MAT2_API_URL_PROD,
          MAX_UPLOAD_SIZE: process.env.MAX_UPLOAD_SIZE || 104857600,
          MAX_UPLOAD_FILES: process.env.MAX_UPLOAD_FILES || 10
        }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [
      'fadeInLeft',
      'fadeOutRight'
    ],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      workboxOptions: {
      }, // only for NON InjectManifest,
      runtimeCaching: [
        {
          // To match cross-origin requests, use a RegExp that matches
          // the start of the origin:
          urlPattern: new RegExp('^${API_URL}'),
          handler: 'NetworkFirst'
        }
      ],
      manifest: {
        name: 'MAT2',
        short_name: 'MAT2',
        description: 'Remove Metadata with MAT2',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: '',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'mat2-quasar'
      }
    }
  }
}

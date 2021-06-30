const path = require('path')
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
  publicPath: process.env.NODE_ENV === "production" ? "/vueTemplate" : "/",
  productionSourceMap: false,
  configureWebpack: {
    devtool: false,
    resolve: {
      symlinks: false,
    },
  },

  // 和具名插件，可以通过其提供的一些方法链式调用，在cli-service中就使用了这个插件
  chainWebpack: config => {
    if(!isProd) {
      config
        .plugin('source-map-dev-tool-plugin')
          .use(webpack.SourceMapDevToolPlugin, [{
            filename: '[file].map[query]',
            exclude: [
              'chunk-vendors.js'
            ]
          }])
          .end()
    }

    config.resolve.alias
      .set('vhh', path.resolve(__dirname, 'src/vhh'))
      .end()

    // title
    config
      .plugin('html')
      .tap(args => {
        args[0].title = process.env.VUE_APP_TITLE
        return args
      })
  },
  devServer: {
    proxy: {
      '/api': {
        // TODO: httpbin => dev API URL
        target: 'http://httpbin.org',
        pathRewrite: {'^/api' : ''}
      }
    }
  }
}

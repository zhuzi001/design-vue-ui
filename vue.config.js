const path = require('path')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  css: {
    loaderOptions: {
      less: {
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('packages', resolve('packages'))
    config.module
      .rule('js')
      .include.add(resolve('packages'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((option) => {
        return option
      })
  },
  transpileDependencies: ['sock-js', 'sockjs-client', 'relation-graph']
}

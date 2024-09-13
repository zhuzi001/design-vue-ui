const path = require('path')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@$', resolve('./'))
  },
  devServer: {
    proxy: {
      '/api': {
        target:
          'https://www.fastmock.site/mock/fa0fa61b98179ff155a082ebf444cd16',
        ws: false,
        pathRewrite: {
          // '^/api': '/',
        }
      }
    }
  }
}

const path = require('path')

module.exports = {
  devServer: {
    contentBase: [
      path.join(__dirname, 'playgrounds/vue/public')
    ],
  },
  pages: {
    index: {
      entry: 'playgrounds/vue/main.js',
      template: 'playgrounds/vue/public/index.html',
      filename: 'index.html',
      title: 'Jabar Design System Vue Playground',
    },
  },
  outputDir: 'dist',
  configureWebpack: (config) => {
    config.resolve.alias = config.resolve.alias || {}
    Object.assign(config.resolve.alias, {
      '@jabardigitalservice/jds-design-system': path.resolve(__dirname, 'publish')
    })
  },
}
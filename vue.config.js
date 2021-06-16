const path = require('path')

function mergeAppWebpackConfig(config) {
  config.resolve.alias = config.resolve.alias || {}
  Object.assign(config.resolve.alias, {
    '@jabardigitalservice/jds-design-system': path.resolve(__dirname, 'publish')
  })
}

function mergeWebComponentWebpackConfig(config) {
  const styleRules = config.module.rules.filter((rule) => {
    return rule.test.test('.scss')
  })

  const resourcesLoader = {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        'styles/scss/index.scss',
      ],
    }
  }
  const purgeCSSLoader = {
    loader: '@fullhuman/purgecss-loader',
    options: {
      content: [
        path.join(__dirname, 'src/components/**/*.vue')
      ],
    }
  }
  styleRules.forEach((rule) => {
    if (!Array.isArray(rule.oneOf)) {
      return
    }

    
    rule.oneOf
      .filter((item) => {
        return item.resourceQuery?.test('module')
          || item.resourceQuery?.test('?vue')
      })
      .forEach((item) => {
        // set purgeCSSLoader right before css loader
        const cssLoaderIndex = item.use.findIndex((loader) => {
          return loader.loader.includes('node_modules/css-loader/')
        })
        if (cssLoaderIndex >= 0) {
          item.use.splice(cssLoaderIndex + 1, 0, purgeCSSLoader)
        }

        // set resourcesLoader as first loader
        item.use.push(resourcesLoader)
      })
  })
}

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
    const { VUE_CLI_SERVICE_BUILD_TARGET: target } = process.env
    if (target === 'app') {
      mergeAppWebpackConfig(config)
    } else if (target === 'wc') {
      mergeWebComponentWebpackConfig(config)
    }
  },
}
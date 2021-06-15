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
  configureWebpack:{
    resolve: {
      alias: {
        '@jabardigitalservice/jds-design-system': path.resolve(__dirname, 'publish')
      },
    },
    module: {
      rules: [
        {
          test: /\.sass$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                indentedSyntax: true,
                // sass-loader version >= 8
                sassOptions: {
                  indentedSyntax: true
                }
              }
            }
          ]
        }
      ]
    },
  }
}
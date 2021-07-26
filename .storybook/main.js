const path = require('path');
const { postHandler } = require('./script-handler');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: '@storybook/addon-docs',
      options: {
        vueDocgenOptions: {
          addScriptHandlers: [
            postHandler,
          ]
        },
      },
    },
  ],
  webpackFinal: async (config, { configType }) => {
    // TODO: refactor these two lines
    config.resolve.alias = config.resolve.alias || {}
    Object.assign(config.resolve.alias, {
      '@jabardigitalservice/jds-design-system': path.resolve(process.cwd(), 'publish')
    })

    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    // Return the altered config
    return config;
  },
}
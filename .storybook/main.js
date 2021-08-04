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
    config.resolve.alias = config.resolve.alias || {}
    Object.assign(config.resolve.alias, {
      '@jabardigitalservice/jds-design-system/icons': path.resolve(__dirname, '../src/assets/icons'),
    })

    config.resolve.extensions.push('.svg')
    const svgRuleIndex = config.module.rules.findIndex((rule) => {
      return rule.test.test('.svg')
    })
    let svgRule = config.module.rules[svgRuleIndex]
    const defaultSvgLoader = {
      loader: svgRule.loader,
      options: svgRule.options,
    }
    delete svgRule.loader
    delete svgRule.options

    svgRule.oneOf = [
      {
        resourceQuery: /vue/,
        use: [
          'vue-loader',
          'svg-to-vue-component/loader',
        ],
      },
      defaultSvgLoader
    ]
    config.module.rules[svgRuleIndex] = svgRule

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
}
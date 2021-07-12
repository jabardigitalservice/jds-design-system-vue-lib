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
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    
    const svgRule = config.module.rules.find((rule) => {
      return rule.test.test('.svg');
    });

    const defaultLoader = {
      loader: svgRule.loader,
      options: svgRule.options,
    };

    svgRule.oneOf = [
      {
        resourceQuery: /vue/,
        use: [
          // This loader compiles .svg file to .vue file
          // So we use `vue-loader` after it
          'vue-loader',
          'svg-to-vue-component/loader'
        ]
      },
      defaultLoader
    ];

    delete svgRule.loader;
    delete svgRule.options;

    // Return the altered config
    return config;
  },
}
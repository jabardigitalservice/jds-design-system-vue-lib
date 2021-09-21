// This babel config is used for Vue Playground transpiling config
// For library transpiling config (in case of ESM), go to babel.lib.config.js

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: ['@babel/plugin-proposal-nullish-coalescing-operator', '@babel/plugin-proposal-optional-chaining'],
}

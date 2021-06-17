module.exports = {
  env: {
    build_esm: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            esmodules: true
          },
          modules: false,
          useBuiltIns: 'entry',
          corejs: '3.6',
        }]
      ]
    }
  }
}

module.exports = {
  presets: [
    ['taro', {
      modules: 'auto',
      framework: 'vue3',
      ts: true,
      compiler: 'webpack5',
      useBuiltIns: 'entry',
    }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-object-rest-spread'],
    ['@babel/plugin-transform-spread'],
    ['@babel/plugin-transform-destructuring'],
    ['babel-plugin-dynamic-import-node'],
  ]
}

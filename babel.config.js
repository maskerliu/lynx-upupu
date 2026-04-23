// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['taro', {
      framework: 'vue3',
      ts: true,
      compiler: 'webpack5',
    }],
    // ['@babel/preset-env', {
    //   "useBuiltIns": "usage",
    //   "corejs": 3,
    // }]
  ],
  plugins: [
    ['babel-plugin-dynamic-import-node'],
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: true }],
    ['@babel/plugin-transform-runtime', { 'regenerator': true, }],
    // '@babel/plugin-transform-arrow-functions',
    // '@babel/plugin-transform-block-scoping',
    // '@babel/plugin-transform-classes',
    // '@babel/plugin-transform-destructuring',
    // '@babel/plugin-transform-spread',
    // '@babel/plugin-transform-template-literals',
    // '@babel/plugin-transform-modules-commonjs'
  ]
}

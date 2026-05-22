import NutUIResolver from '@nutui/auto-import-resolver'
import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import Components from 'unplugin-vue-components/webpack'
import devConfig from './dev'
import prodConfig from './prod'


export default defineConfig<'webpack5'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'lynx-upupu',
    date: '2026-3-24',
    designWidth: 375,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2,
      375: 2 / 1
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-html',],
    defineConstants: {},
    copy: {
      patterns: [
        { from: 'src/assets/', to: 'dist/assets/' },
      ],
      options: {}
    },
    framework: 'vue3',
    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false,
        timings: true,
        exclude: ['@nutui/nutui-taro', 'core-js', '@babel/runtime', '@babel/runtime-corejs3']
      }
    },
    cache: {
      enable: true
    },
    mini: {
      // hot: true,
      enableSourceMap: false,
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        // filename: 'css/[name].[fullhash].css',
        // chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        pxtransform: {
          enable: true,
          config: {
            selectorBlackList: ['nut-'],
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        // chain.resolve.alias.set('@', path.resolve(__dirname, '../src'))


        chain.output.globalObject('wx')
        // chain.output.set('chunkLoadingGlobal', 'webpackJsonp')

        chain.plugin('define-plugin').use(require('webpack').DefinePlugin, [{
          'process.env.TARO_RUNTIME': JSON.stringify('weapp'),
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          // 'chunkLoadingGlobal': JSON.stringify('webpackJsonp'),
        }])

        // chain.output.devtoolModuleFilenameTemplate('webpack:///[resource-path]')
        chain.resolve.alias.set('@tarojs/runtime', path.resolve(__dirname, '../node_modules/@tarojs/runtime/dist/index.cjs.js'))
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        chain.plugin('unplugin-vue-components').use(Components({
          resolvers: [NutUIResolver({ taro: true })],
          dts: false,
          directives: false,
          version: 3,
          include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
          exclude: [/[\\/]node_modules[\\/]/, /[\\/].git[\\/]/, /[\\/].taro[\\/]/],
        }))

        chain.module.rule('js').test(/\.js$/)
          .include
          .add(/node_modules\/(vue-router)/)
          .add(/node_modules\/(@qiun\/ucharts)/)
          .add(/node_modules\/(echarts|echarts4taro3)/)
          .end()
          .exclude
          .add(/node_modules\/(@babel\/runtime)/)
          // .add(/node_modules\/(@tarojs\/router)/)
          // .add(/node_modules\/(@qiun\/ucharts)/)
          // .add(/node_modules\/(uuid)/)
          // .add(/node_modules\/(vue-router)/)
          .end()

        chain.devtool(false)
        // chain.optimization.splitChunks(false)
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        chain.plugin('unplugin-vue-components').use(Components({
          resolvers: [NutUIResolver({ taro: true })]
        }))
      }
    },
    rn: {
      appName: 'lynx-upupu',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})

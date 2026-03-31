import type { UserConfigExport } from "@tarojs/cli"
export default {
  defineConstants: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  },
  logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {}
} satisfies UserConfigExport<'webpack5'>

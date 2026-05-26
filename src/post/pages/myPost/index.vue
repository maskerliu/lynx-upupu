<template>
  <nut-config-provider :theme="commonStore.theme" :theme-vars="commonStore.themeVars">
    <nav-bar style="z-index: 100;" show-nav-back title="我的作品" />
    <view :style="{
      height: `calc(100vh - ${commonStore.navBarHeight}px)`,
      padding: `${commonStore.navBarHeight}px 5px 0 5px`
    }">
      <nut-cell-group>
        <nut-cell title="我的作品">
          <template #desc>
            <nut-button shape="square" plain type="primary" size="small">
              <template #icon>
                <Uploader />
              </template>
            </nut-button>
          </template>
        </nut-cell>

        <nut-cell>
          <post-snap style="width: 200px; margin-right: 15px;"></post-snap>
          <post-snap style="width: 200px; margin-right: 15px;"></post-snap>
          <post-snap style="width: 200px; margin-right: 15px;"></post-snap>
        </nut-cell>
      </nut-cell-group>

      <nut-cell-group>
        <nut-cell style="padding: 0;">
          <Line style="width:calc(100% - 10px); height: 30vh;" />
        </nut-cell>
      </nut-cell-group>
    </view>
  </nut-config-provider>
</template>
<script lang="ts" setup>
import * as echarts from '@components/echarts.js'
import Line from '@components/Line.vue'
import NavBar from '@components/NavBar.vue'
import PostSnap from '@components/post/PostSnap.vue'
import { Uploader } from '@nutui/icons-vue-taro'
import { useCommonStore } from '@stores/common'
import { loadEcharts } from 'echarts4taro3'
import { onMounted } from 'vue'

try {
  loadEcharts(echarts)
} catch (e) {
  console.log('echarts error', e)
}

const commonStore = useCommonStore()

onMounted(() => {

})
</script>
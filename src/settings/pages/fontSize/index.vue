<template>
  <nut-config-provider :theme="commonStore.theme" :theme-vars="commonStore.themeVars">
    <nav-bar style="z-index: 100;" show-nav-back title="字体大小" />
    <view style="padding: 0 10px;" :style="{
      height: `calc(100vh - ${commonStore.navBarHeight}px)`,
      paddingTop: `${commonStore.navBarHeight}px`
    }">
      <nut-cell title="黑白模式" style="margin-top: 10px;">
        <template #desc>
          <nut-switch v-model="isDark" @change="changeTheme" />
        </template>
      </nut-cell>

      <view style="position: absolute; width: calc(100% - 20px); bottom: 20px;">
        <view style="padding: 40px 0; color: var(--nut-primary-color);" :style="{ fontSize: curFontSize + 'px' }">
          这是一段字体大小预览文本
        </view>

        <nut-range v-model="curFontSize" :marks="marks" :min="16" :max="24" :step="2" hidden-range hidden-tag
          @change="onSliderChange" style="width: calc(100% - 20px); margin: 0 10px 40px 10px;"></nut-range>

        <nut-button block type="primary" plain @click="saveFontSize">
          保存设置
        </nut-button>
      </view>
    </view>
  </nut-config-provider>
</template>

<script setup lang="ts">
import NavBar from '@components/NavBar.vue'
import { useCommonStore } from '@stores/common'
import Taro from '@tarojs/taro'
import { onMounted, ref } from 'vue'
import './index.css'


const commonStore = useCommonStore()
const isDark = ref(false)

const marks = {
  16: 16,
  18: 18,
  20: 20,
  22: 22,
  24: 24,
}
const curFontSize = ref<number>(16)

onMounted(async () => {
  isDark.value = commonStore.theme === 'dark'
  const savedSize = commonStore.fontSize
  if (savedSize && typeof savedSize === 'number') {
    curFontSize.value = savedSize
  }
})

function changeTheme() {
  commonStore.setTheme(isDark.value ? 'dark' : 'light')
}

function onSliderChange() {
  // currentFontSize.value = e.detail.value;
}

function saveFontSize() {
  try {
    commonStore.setFontSize(curFontSize.value)
    Taro.showToast({ title: '设置已保存', icon: 'none' })
  } catch (error) {
    Taro.showToast({ title: '保存失败', icon: 'none' })
  }
}

</script>
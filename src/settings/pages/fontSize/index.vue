<template>
  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <nav-bar style="z-index: 100;" />
    <view style="padding: 0 10px;"
      :style="{ height: `calc(100vh - ${navBarHeight}px)`, marginTop: navBarHeight + 'px' }">
      <nut-cell-group>
        <nut-cell title="黑白模式">
          <template #desc>
            <nut-switch v-model="isDark" @change="changeTheme" />
          </template>
        </nut-cell>
      </nut-cell-group>

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
import Taro from '@tarojs/taro'
import { inject, onMounted, ref, Ref } from 'vue'
import NavBar from '../../../components/NavBar.vue'
import './index.css'

const showNavBack = inject<Ref<boolean>>('showNavBack')
const navBarHeight = inject<Ref<number>>('navBarHeight')
const navTitle = inject<Ref<string>>('navTitle')
const theme = inject<Ref<string>>('theme')
const themeVars = inject<Ref<Record<string, string>>>('themeVars')
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
  showNavBack.value = true
  navTitle.value = '字体大小'

  isDark.value = theme.value === 'dark'
  const savedSize = Taro.getStorageSync('app_font_size')
  if (savedSize && typeof savedSize === 'number') {
    curFontSize.value = savedSize
  }
})

function changeTheme() {
  theme.value = isDark.value ? 'dark' : 'light'
  Taro.setStorageSync('app_theme', theme.value)
}

function onSliderChange() {
  // currentFontSize.value = e.detail.value;
}

function saveFontSize() {
  try {
    themeVars.value['font-size-0'] = `${curFontSize.value - 3}px`
    themeVars.value['font-size-1'] = `${curFontSize.value - 2}px`
    themeVars.value['font-size-2'] = `${curFontSize.value}px`
    themeVars.value['font-size-3'] = `${curFontSize.value + 2}px`
    themeVars.value['font-size-4'] = `${curFontSize.value + 4}px`

    Taro.setStorageSync('app_font_size', curFontSize.value)
    Taro.showToast({ title: '设置已保存', icon: 'none' })
  } catch (error) {
    Taro.showToast({ title: '保存失败', icon: 'none' })
  }
}

</script>
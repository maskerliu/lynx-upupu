<template>
  <view>
    <view style="padding: 25px; color: #2980b9;" :style="{ fontSize: curFontSize + 'px' }">
      这是一段字体大小预览文本
    </view>

    <nut-cell title="黑白模式">
      <template #desc>
        <nut-switch v-model="isDark" @change="changeTheme" />
      </template>
    </nut-cell>

    <view style="position: absolute; width: calc(100% - 30px); bottom: 10px; margin: 15px;">
      <nut-range v-model="curFontSize" :marks="marks" :min="14" :max="24" :step="2" :hidden-range="true"
        @change="onSliderChange" style="width: calc(100% - 20px); margin: 0 10px 40px 10px;"></nut-range>

      <nut-button block type="primary" plain @click="saveFontSize">
        保存设置
      </nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import { inject, onMounted, ref, Ref } from 'vue'
import './FontSize.css'

const showNavBack = inject<Ref<boolean>>('showNavBack')
const theme = inject<Ref<string>>('theme')
const themeVars = inject<Ref<Record<string, string>>>('themeVars')
const isDark = ref(false)

const marks = {
  14: 14,
  16: 16,
  20: 20,
  24: 24,
}
const curFontSize = ref<number>(16)

onMounted(async () => {
  showNavBack.value = true

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
    themeVars.value.fontSize1 = `${curFontSize.value}px`
    themeVars.value.fontSize2 = `${curFontSize.value + 2}px`
    themeVars.value.fontSize3 = `${curFontSize.value + 4}px`
    themeVars.value.fontSize4 = `${curFontSize.value + 6}px`

    Taro.setStorageSync('app_font_size', curFontSize.value)
    Taro.showToast({ title: '设置已保存', icon: 'none' })
  } catch (error) {
    Taro.showToast({ title: '保存失败', icon: 'none' })
  }
}

</script>
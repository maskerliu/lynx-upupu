<template>
  <view>
    <view style="padding: 25px; color: #2980b9;" :style="{ fontSize: currentFontSize + 'px' }">
      这是一段字体大小预览文本
    </view>

    <view style="position: absolute; width: calc(100% - 30px); bottom: 10px; margin: 15px;">
      <nut-range v-model="currentFontSize" :marks="marks" :min="14" :max="24" :step="2" :hidden-range="true"
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
const marks = {
  14: 14,
  16: 16,
  20: 20,
  24: 24,
}
const currentFontSize = ref<number>(16)

onMounted(async () => {
  showNavBack.value = true
  const savedSize = Taro.getStorageSync('app_font_size')
  if (savedSize && typeof savedSize === 'number') {
    currentFontSize.value = savedSize
  }
})

function onSliderChange() {
  // currentFontSize.value = e.detail.value;
}

function saveFontSize() {
  try {
    Taro.setStorageSync('app_font_size', currentFontSize.value)
    Taro.showToast({ title: '设置已保存', icon: 'none' })
  } catch (error) {
    Taro.showToast({ title: '保存失败', icon: 'none' })
  }
}

</script>
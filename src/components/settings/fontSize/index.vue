<template>
  <view style="padding: 25px;" :style="{ fontSize: currentFontSize + 'px' }">
    这是一段字体大小预览文本
  </view>

  <view style="position: absolute; width: calc(100% - 30px); bottom: 10px; margin: 15px;">
    <nut-range v-model="currentFontSize" :marks="marks" :min="14" :max="24" :step="2" :hidden-range="true"
      @change="onSliderChange" style="width: calc(100% - 20px); margin: 0 10px 40px 10px;"></nut-range>

    <nut-button block type="primary" plain @click="saveFontSize">
      保存设置
    </nut-button>
  </view>
</template>

<script setup lang="ts">
// import { Button as NutButton, Range as NutRange } from '@nutui/nutui-taro'
import Taro from '@tarojs/taro'
import { onMounted, ref } from 'vue'
import './index.css'

const marks = {
  14: 14,
  16: 16,
  20: 20,
  24: 24,
}
const currentFontSize = ref<number>(16)

onMounted(() => {
  const savedSize = Taro.getStorageSync('app_font_size')
  if (savedSize && typeof savedSize === 'number') {
    currentFontSize.value = savedSize
  }
})

// 滑块变化事件
function onSliderChange() {
  // currentFontSize.value = e.detail.value;
}

// 保存字体大小设置
function saveFontSize() {
  try {
    Taro.setStorageSync('app_font_size', currentFontSize.value)
    Taro.showToast({ title: '设置已保存', icon: 'none' })

    // 触发全局字体大小变更事件
    // Taro.$emit('font-size-changed', currentFontSize.value);
  } catch (error) {
    Taro.showToast({ title: '保存失败', icon: 'none' })
  }
}

</script>
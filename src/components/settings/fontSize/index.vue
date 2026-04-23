<template>
  <view style="padding: 25px; color: #2980b9;" :style="{ fontSize: currentFontSize + 'px' }">
    这是一段字体大小预览文本
  </view>

  <view class="container">
    <canvas canvas-id="column" id="column" class="charts" @bindtouchend="tap"
      style="width: 430px; height: 286px;"></canvas>
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
import uCharts from '@qiun/ucharts'
import Taro from '@tarojs/taro'
import { inject, onMounted, ref, Ref } from 'vue'
import './index.css'

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

  getServerData()
})

function getServerData() {
  //模拟从服务器获取数据时的延时
  setTimeout(() => {
    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    let res = {
      categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
      series: [
        {
          name: "目标值",
          data: [35, 36, 31, 33, 13, 34]
        },
        {
          name: "完成量",
          data: [18, 27, 21, 24, 6, 28]
        }
      ]
    };
    drawCharts('column', res);
  }, 500);
}
var uChartsInstance = {}

const cWidth = ref(430)
const cHeight = ref(286)

function drawCharts(id: string, data: any) {
  const ctx = Taro.createCanvasContext(id)
  uChartsInstance[id] = new uCharts({
    type: "column",
    context: ctx,
    width: cWidth.value,
    height: cHeight.value,
    categories: data.categories,
    series: data.series,
    animation: true,
    background: "#FFFFFF",
    padding: [15, 15, 0, 5],
    xAxis: {
      disableGrid: true
    },
    yAxis: {
      data: [{ min: 0 }]
    },
    extra: {
      column: {
        type: "group"
      }
    }
  })
}

function tap(e) {
  uChartsInstance[e.target.id].touchLegend(e);
  uChartsInstance[e.target.id].showToolTip(e);
}

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
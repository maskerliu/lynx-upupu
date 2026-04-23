<template>
  <canvas canvas-id="column" id="column" class="charts" @tap="tap" style="width: 100vw; height: 40vh;"></canvas>
</template>

<script setup lang="ts">
import uCharts from '@qiun/ucharts'
import Taro from '@tarojs/taro'
import { onActivated, onMounted, ref } from 'vue'

const cWidth = ref(430)
const cHeight = ref(286)
const data = ref<any>({
  categories: [],
  series: [],
})
const winInfo = Taro.getWindowInfo()
let uChartsInstance = {}

onMounted(() => {

  console.log(winInfo)
  cWidth.value = winInfo.windowWidth
  cHeight.value = winInfo.windowHeight * 0.4

  initChart('column')
  getServerData()
})

onActivated(() => {
  loadData('column')
})

function initChart(id: string) {
  const ctx = Taro.createCanvasContext(id, { type: '2d' })

  uChartsInstance[id] = new uCharts({
    type: "column",
    context: ctx,
    width: cWidth.value,
    height: cHeight.value,
    animation: true,
    background: '#EBFBD6',
    categories: data.value.categories,
    series: data.value.series,
    padding: [25, 15, 0, 5],
    xAxis: {
      disableGrid: true
    },
    yAxis: {
      data: [{ min: 0 }]
    },
    extra: {
      column: {
        type: "group",
        activeBgColor: "#000000",
        activeBgOpacity: 0.08,
        meterBorder: 3,
        meterFillColor: '#EBFBD6',
        barBorderRadius: [10, 10, 0, 0]
      }
    }
  })
}

function loadData(id: string) {
  uChartsInstance[id]?.updateData({
    categories: data.value.categories,
    series: data.value.series,
  })
}

function getServerData() {
  setTimeout(() => {
    let res = {
      categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
      series: [
        {
          name: "目标值",
          data: [35, 36, 31, 33, 13, 34],
          color: '#FF6B6B'
        },
        {
          name: "完成量",
          data: [18, 27, 21, 24, 6, 28]
        }
      ]
    }
    data.value = res
    loadData('column')
  }, 500)
}

function tap(e) {
  // uChartsInstance['column'].touchLegend(e)
  uChartsInstance['column'].showToolTip(e, {
    formatter: (item, category, index, opts) => {
      return item.name + ":" + item.data;
    }
  })
}

</script>
<template>
  <e-chart ref="canvas" canvas-id="bar-canvas"
    style="background-color: #bdc3c7; margin: 5px; width: calc(100% - 10px); height: 50vh;" />
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import { EChart } from "echarts4taro3"
import { onActivated, onMounted, ref } from 'vue'

const canvas = ref(null)
const cWidth = ref(430)
const cHeight = ref(286)

const options = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar"
    }
  ]
}

onMounted(() => {
  const winInfo = Taro.getWindowInfo()
  cWidth.value = winInfo.windowWidth - 10
  cHeight.value = winInfo.windowHeight * 0.4 - 10

  Taro.nextTick(() => {
    canvas.value.refresh(options)
  })

})

onActivated(() => {

  // setTimeout(() => {
  //   canvas.value.refresh(options)
  // }, 500)
})

</script>
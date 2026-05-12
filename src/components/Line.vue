<template>
  <e-chart ref="canvas" canvas-id="bar-canvas" style="margin: 5px 10px 0 10px; width: calc(100% - 20px); height: 40vh;">
  </e-chart>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import { EChart } from "echarts4taro3"
import { onActivated, onMounted, ref } from 'vue'

const canvas = ref(null)
const options = {
  backgroundColor: '#ebebeb00',
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: 0,
    left: 0,
    top: 30,
    bottom: 30,
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Rainfall',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 36.7, 13.6, 16.2, 32.6, 20.0, 6.4, 3.3],
      type: 'bar',
      itemStyle: {
        borderRadius: 5,
        borderWidth: 1,
        borderType: 'solid',
        borderColor: '#73c0de',
        shadowBlur: 3,
        shadowColor: 'rgba(84, 112, 198, 0.2)',
      }
    },
    {
      name: 'Temperature',
      type: 'line',
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
}

onMounted(() => {

})

onActivated(() => {

  Taro.nextTick(() => {
    canvas.value.refresh(options)
  })
})

</script>
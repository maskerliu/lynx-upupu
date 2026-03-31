<template>

  <image src="https://wimg.588ku.com/gif320/24/07/09/071d501dc2104679a0007a350c9af236.gif" style="margin: 0 auto;" />
  <canvas id="drawCanvas" canvas-id="drawCanvas" ref="drawCanvas" class="draw-canvas"></canvas>
  <nut-input v-model="inVal" placeholder="输入你的土味情话" clearable style="padding: 10px;">
    <template #left>
      <Ask style="font-size: 1.3rem; color: gray; margin-right: 5px;"></Ask>
    </template>
    <template #right>
      <nut-button type="primary" plain shape="square" size="small" @click="generate">生成</nut-button>
    </template>
  </nut-input>
</template>

<script setup lang="ts">
import { Ask } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { onMounted, ref, useTemplateRef } from 'vue'
import './find.css'

const inVal = ref<string | null>('土味情话，举牌表达')
const drawCanvas = useTemplateRef('drawCanvas')
let ctx: Taro.CanvasContext | null = null
let canvasWidth = 0, canvasHeight = 0
onMounted(async () => {
  setTimeout(async () => {
    await initCanvas()
  }, 100)
})

async function initCanvas() {
  // 初始化canvas上下文
  ctx = Taro.createCanvasContext('drawCanvas')

  const query = Taro.createSelectorQuery()
  query.select('#drawCanvas').boundingClientRect((result) => {
    canvasWidth = (result as Taro.NodesRef.BoundingClientRectCallbackResult).width
    canvasHeight = (result as Taro.NodesRef.BoundingClientRectCallbackResult).height
  })
  query.exec()
  console.log(drawCanvas.value.style.width)
}

async function generate() {
  try {
    if (inVal.value == null || inVal.value.trim() == '') {
      Taro.showToast({
        title: '请输入土味情话',
        icon: 'none'
      })
      return
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    const text = inVal.value.trim()

    let j = 1
    for (let i = 0; i < text.length; i++) {
      if (i * 80 > canvasWidth * j) j++
      let url = `/assets/QP4a5rvW_${Math.floor(Math.random() * 40)}.png`
      ctx.drawImage(url, 80 * i, 165 * (j - 1), 80, 165)

      ctx.font = '30px "微软雅黑"'
      ctx.fillStyle = 'red'

      ctx.save()

      // ctx.rotate(Math.PI / 6.6)
      ctx.transform(0.5, 0.5, 0.5, 0.5, 0, 0)
      // 绘制文字
      ctx.fillText(text[i], 80 * i + 30, 20)

      // 恢复绘图状态
      ctx.restore()
    }
    ctx.draw(true)
  } catch (err) {
    console.log(err)
  }
}

</script>

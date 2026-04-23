<template>

  <scroll-view scroll-y="true" style="height: 100%;">
    <canvas id="drawCanvas" canvas-id="drawCanvas" ref="drawCanvas" class="draw-canvas"></canvas>

    <nut-form>
      <nut-form-item label="队形">
        <nut-radio-group v-model="shape" direction="horizontal">
          <nut-radio label="1" shape="button">随机</nut-radio>
          <nut-radio label="2" shape="button">排排站</nut-radio>
          <nut-radio label="3" shape="button">波浪</nut-radio>
          <nut-radio label="4" shape="button">爱心</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="颜色">
        <nut-radio-group v-model="color" direction="horizontal">
          <nut-radio label="#FA685D" shape="button">
            <nut-tag color="#FA685D"></nut-tag>
          </nut-radio>
          <nut-radio label="#E9E9E9" shape="button" style="height: 1rem; color: #E9E9E9;">
          </nut-radio>
          <nut-radio label="#FA2400" shape="button">
            <nut-tag color="#FA2400"></nut-tag>
          </nut-radio>
          <nut-radio label="#E9E9E9" shape="button">
            <nut-tag color="#E9E9E9"></nut-tag>
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="大小">
        <nut-range v-model="ratio" step="10" min="50" hidden-range hidden-tag @change="changeSize"></nut-range>
      </nut-form-item>
      <nut-form-item>
        <nut-input v-model="inVal" placeholder="输入你的土味情话" clearable style="padding: 10px;">
          <template #left>
            <Ask style="font-size: 1.3rem; color: gray; margin-right: 5px;"></Ask>
          </template>
        </nut-input>
      </nut-form-item>
      <nut-row>
        <nut-button type="primary" plain shape="square" @click="generate"
          style="width: calc(50% - 20px); margin: 0 10px;">生成</nut-button>
        <nut-button type="success" plain shape="square" @click="saveToAlbum" :disabled="!canSave"
          style="width: calc(50% - 20px); margin: 0 10px;">保存</nut-button>
      </nut-row>


    </nut-form>

  </scroll-view>

</template>

<script setup lang="ts">
import { Ask } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { onMounted, ref, useTemplateRef } from 'vue'
import './Find.css'

const ManDefaultSize = [80, 165]

const shape = ref<string>('1')
const ratio = ref<number>(100)
const color = ref<string>('1')
const canSave = ref<boolean>(false)
const inVal = ref<string | null>('土味情话，举牌表达')
const drawCanvas = useTemplateRef('drawCanvas')
let ctx: Taro.CanvasContext | null = null
let canvasWidth = 0, canvasHeight = 0, finalHeight = 0


onMounted(async () => {
  Taro.setNavigationBarTitle({ title: '土味情话' })
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

async function changeSize() {
  console.log(ratio.value)
}

async function generate() {
  try {
    canSave.value = false
    if (inVal.value == null || inVal.value.trim() == '') {
      Taro.showToast({
        title: '请输入土味情话',
        icon: 'none'
      })
      return
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    const text = inVal.value.trim()

    let manSize = ManDefaultSize.map(size => size * ratio.value / 100)
    let j = 0
    let col = Math.floor(canvasWidth / manSize[0])
    let row = Math.round(text.length / col)
    let margin = (canvasWidth - col * manSize[0]) / 2
    finalHeight = Math.min(manSize[1] * row, canvasHeight)
    for (let i = 0; i < text.length; i++) {
      if (i % col == 0 && i != 0) j++
      let url = `/assets/QP4a5rvW_${Math.floor(Math.random() * 35)}.png`
      ctx.drawImage(url, margin + manSize[0] * (i - j * col), manSize[1] * j, manSize[0], manSize[1])
      ctx.font = `${20 * ratio.value / 100}px "微软雅黑"`
      ctx.fillStyle = 'red'

      ctx.save()
      ctx.translate(margin + manSize[0] * (i - j * col) + 43 * ratio.value / 100, manSize[1] * j + 28 * ratio.value / 100)
      ctx.transform(1.6, 0, 0, 1, 0, 0)
      ctx.translate(-(25 * ratio.value / 100) / 1.6, 0)
      ctx.rotate(Math.PI / 5)
      ctx.fillText(text[i], 0, 0)
      ctx.restore()
    }
    ctx.draw(true)
    canSave.value = true
  } catch (err) {
    console.log(err)
  }
}

async function saveToAlbum() {
  Taro.canvasToTempFilePath({
    x: 0,
    y: 0,
    width: canvasWidth,
    height: finalHeight,
    destWidth: canvasWidth,
    destHeight: finalHeight,
    canvasId: 'drawCanvas',
    success: function (res) {
      Taro.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function (_) {
          ctx.clearRect(0, 0, canvasWidth, canvasHeight)
          Taro.showToast({ title: '保存成功', icon: 'success' })
        },
        fail: function (_) {
          Taro.showToast({ title: '保存失败', icon: 'error' })
        }
      })
    }
  })
}

</script>

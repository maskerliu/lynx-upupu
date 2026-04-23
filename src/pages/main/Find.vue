<template>

  <canvas id="drawCanvas" canvas-id="drawCanvas" class="draw-canvas"></canvas>

  <scroll-view scroll-y="true" style="height: calc(40vh - 100px);">
    <nut-form>
      <nut-form-item label="小人" label-width="3rem">
        <nut-radio-group v-model="theme" direction="horizontal">
          <nut-radio :label="item" shape="button" v-for="item in Themes">
            <img :src="`/assets/icon_${item}.png`" alt="" style="width: 30px; height: 60px;">
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="队形" label-width="3rem">
        <nut-radio-group v-model="shape" direction="horizontal">
          <nut-radio label="horizontal" shape="button">横排</nut-radio>
          <nut-radio label="vertical" shape="button">竖排</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="颜色" label-width="3rem">
        <nut-radio-group v-model="color" direction="horizontal">
          <nut-radio v-for="item in Colors" :key="item" :label="item" shape="button" size="mini">
            <nut-tag :color="item" class="color-tag"></nut-tag>
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="大小" label-width="3rem">
        <nut-range v-model="ratio" step="10" min="50" hidden-range hidden-tag @change="changeSize"
          style="margin-right: 10px;"></nut-range>
      </nut-form-item>
      <nut-form-item>
        <nut-input v-model="inVal" placeholder="输入你的土味情话" clearable style="padding: 10px;">
          <template #left>
            <Ask style="font-size: 1.3rem; color: gray; margin-right: 5px;"></Ask>
          </template>
        </nut-input>
      </nut-form-item>
    </nut-form>
  </scroll-view>
  <nut-row>
    <nut-button type="primary" plain shape="square" :loading="generating" :disabled="generating" @click="generate"
      style="width: calc(50% - 20px); margin: 0 10px;">生成</nut-button>
    <nut-button type="success" plain shape="square" @click="saveToAlbum" :disabled="!canSave"
      style="width: calc(50% - 20px); margin: 0 10px;">保存</nut-button>
  </nut-row>
</template>

<script setup lang="ts">
import { Ask } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { onMounted, ref, watch } from 'vue'
import './Find.css'

type ManConfig = {
  file: string,
  count: number,
  row: number,
  col: number,
  width: number,
  height: number,
  fontSize: number,
  fontMarginTop: number,
  fontMarginLeft: number,
  fontRotate: number,
  fontTransform: number,
  fontTranslate: number,
}

const LihanManConfig: ManConfig = {
  file: 'lihan.png',
  count: 32,
  row: 8,
  col: 4,
  width: 80,
  height: 156,
  fontSize: 18,
  fontMarginTop: 23,
  fontMarginLeft: 44,
  fontTransform: 1.8,
  fontRotate: Math.PI / 4.5,
  fontTranslate: 25,
}

const DefManConfig: ManConfig = {
  file: 'default.png',
  count: 32,
  row: 8,
  col: 4,
  width: 64,
  height: 150,
  fontSize: 18,
  fontMarginTop: 22,
  fontMarginLeft: 30,
  fontTransform: 1.9,
  fontRotate: Math.PI / 5.5,
  fontTranslate: 20,
}

const Themes = ['default', 'lihan']
const Shapes = ['horizontal', 'vertical']
const Colors = ['#c0392b', '#2980b9', '#2c3e50', '#8e44ad']

const theme = ref<string>('default')
const shape = ref<string>('horizontal')
const ratio = ref<number>(100)
const color = ref<string>('#c0392b')
const canSave = ref<boolean>(false)
const inVal = ref<string | null>('土味情话，举牌表达')
const generating = ref<boolean>(false)

let ctx: Taro.CanvasContext | null = null
let offscreenCanvas: Taro.OffscreenCanvas | null = null
let offscreenCtx: Taro.RenderingContext | null = null
let material: Taro.Image | null = null
let materialLoaded = false
let canvasWidth = 0, canvasHeight = 0
let dpr = 1


type QueueType = 'horizontal' | 'vertical'

onMounted(async () => {
  Taro.setNavigationBarTitle({ title: '举牌小人' })
  setTimeout(async () => {
    await initCanvas()
  }, 100)
})

watch(() => theme.value, async () => {
  await loadMaterial()
})

async function loadMaterial() {
  materialLoaded = false
  let config = theme.value == 'default' ? DefManConfig : LihanManConfig
  let url = `/assets/${config.file}`
  await new Promise(resolve => {
    material.onload = resolve
    material.src = url
    console.log('start load image', url)
  })

  offscreenCanvas.width = material.width
  offscreenCanvas.height = material.height;

  (offscreenCtx as any).drawImage(material, 0, 0, material.width, material.height)

  materialLoaded = true
}

async function initCanvas() {
  // 初始化canvas上下文
  const systemInfo = Taro.getSystemInfoSync()
  dpr = systemInfo.pixelRatio || 1
  Taro.createSelectorQuery()
    .select('#drawCanvas')
    .fields({ node: true, size: true })
    .exec(async (res) => {
      canvasWidth = res[0].width
      canvasHeight = res[0].height

      offscreenCanvas = Taro.createOffscreenCanvas({ type: '2d', width: canvasWidth, height: canvasHeight })
      offscreenCtx = offscreenCanvas.getContext('2d')
      material = offscreenCanvas.createImage()

      await loadMaterial()
    })


  ctx = Taro.createCanvasContext('drawCanvas')
}

async function changeSize() {
  console.log(ratio.value)
}

async function generate() {
  if (inVal.value == null || inVal.value.trim() == '') {
    Taro.showToast({ title: '请输入土味情话', icon: 'none' })
    return
  }

  if (!materialLoaded) {
    Taro.showToast({ title: '主题加载中，请稍后', icon: 'none' })
    return
  }

  try {
    generating.value = true
    canSave.value = false

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.draw(false)

    let config = theme.value == 'default' ? DefManConfig : LihanManConfig

    await queue(shape.value as QueueType, config)
    canSave.value = true
  } catch (err) {
    console.log(err)
  }
}

async function queue(type: QueueType, config: ManConfig) {
  const text = inVal.value.trim()
  let scale = ratio.value / 100
  let manW = config.width * scale
  let manH = config.height * scale

  let col = 0, row = 0, marginH = 0, marginV = 0, x = 0, y = 0

  if (type == 'horizontal') {
    col = Math.floor(canvasWidth / config.width)
    row = Math.ceil(text.length / col)
  } else if (type == 'vertical') {
    row = Math.floor(canvasHeight / config.height)
    col = Math.ceil(text.length / row)
  }

  marginH = (canvasWidth - col * manW) / 2
  marginV = (canvasHeight - row * manH) / 2

  let i = 0, idx = 0;
  while (i < row) {
    let j = 0;
    while (j < col) {
      idx = i * col + j;
      if (idx >= text.length) break

      let randomW = Math.floor(Math.floor(Math.random() * config.row) * config.width)
      let randomH = Math.floor(Math.floor(Math.random() * config.col) * config.height)

      try {
        await Taro.canvasPutImageData({
          canvasId: 'drawCanvas',
          x: marginH + config.width * scale * j,
          y: marginV + config.height * scale * i,
          width: config.width,
          height: config.height,
          data: (offscreenCtx as any).getImageData(randomW, randomH, config.width, config.height).data,
        })
      } catch (err) {
        // console.error(err)
      }

      j++
    }
    if (idx >= text.length) break // 确保外层循环也退出
    i++
  }


  for (let i = 0; i < row; ++i) {
    for (let j = 0; j < col; ++j) {
      let idx = i * col + j
      if (idx >= text.length) break

      ctx.font = `${config.fontSize * scale}px "微软雅黑"`
      ctx.fillStyle = color.value
      ctx.save()
      if (type == 'horizontal') {
        x = Math.round(marginH + manW * j + config.fontMarginLeft * scale)
        y = Math.round(marginV + manH * i + config.fontMarginTop * scale)
      } else {
        x = Math.round(marginH + manW * i + config.fontMarginLeft * scale)
        y = Math.round(marginV + manH * j + config.fontMarginTop * scale)
      }
      ctx.translate(x, y)
      ctx.transform(config.fontTransform, 0, 0, 1, 0, 0)
      ctx.translate(-(config.fontTranslate * scale) / config.fontTransform, 0)
      ctx.rotate(config.fontRotate)
      ctx.fillText(text[idx], 0, 0)
      ctx.restore()

    }
  }
  ctx.draw(true)
  generating.value = false
}

async function saveToAlbum() {
  try {
    let res = await Taro.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      destWidth: canvasWidth * dpr,
      destHeight: canvasHeight * dpr,
      canvasId: 'drawCanvas'
    })

    try {
      await Taro.saveImageToPhotosAlbum({ filePath: res.tempFilePath, })
      Taro.showToast({ title: '保存成功', icon: 'success' })
    } catch (err) {
      Taro.showToast({ title: '保存失败', icon: 'error' })
    }
  } catch (err) {
    Taro.showToast({ title: '保存失败', icon: 'error' })
  }

}

</script>

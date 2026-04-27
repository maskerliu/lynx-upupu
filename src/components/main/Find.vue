<template>

  <view>
    <canvas id="drawCanvas" canvas-id="drawCanvas" class="draw-canvas"></canvas>
    <view :style="{ height: `calc(40vh - ${97 + navBarHeight}px)` }" style="overflow: hidden auto; padding: 0 5px;">
      <nut-form>
        <nut-form-item label-width="3rem" center>
          <template #label>
            <Ask />
          </template>
          <nut-input v-model="inVal" placeholder="输入你的土味情话" clearable show-word-limit :max-length="maxLength">
          </nut-input>
        </nut-form-item>
        <nut-form-item label="小人" label-width="3rem">
          <nut-radio-group v-model="theme" direction="horizontal">
            <nut-radio :label="item" shape="button" v-for="item in Themes">
              <image :src="`/assets/icon_${item}.webp`" mode="aspectFit" class="upupu"></image>
            </nut-radio>
          </nut-radio-group>
        </nut-form-item>
        <nut-form-item label="队形" label-width="3rem" center>
          <nut-radio-group v-model="shape" direction="horizontal">
            <nut-radio :label="item.value" shape="button" v-for="item in Shapes">
              {{ item.title }}
            </nut-radio>
          </nut-radio-group>
        </nut-form-item>
        <nut-form-item label="颜色" label-width="3rem" center>
          <nut-radio-group v-model="color" direction="horizontal">
            <nut-radio v-for="item in Colors" :key="item" :label="item" shape="button" size="mini">
              <nut-tag :color="item" class="color-tag"></nut-tag>
            </nut-radio>
          </nut-radio-group>
        </nut-form-item>
      </nut-form>
    </view>

    <nut-row>
      <nut-button type="primary" plain shape="square" :loading="generating" :disabled="generating" class="find-btn"
        @click="generate">生成</nut-button>
      <nut-button type="success" plain shape="square" @click="saveToAlbum" :disabled="!canSave"
        class="find-btn">保存</nut-button>
    </nut-row>
  </view>
</template>

<script setup lang="ts">
import { Ask } from '@nutui/icons-vue-taro'
import Taro, { nextTick } from '@tarojs/taro'
import { inject, onMounted, ref, Ref, watch } from 'vue'
import './Find.css'

const navBarHeight = inject<Ref<number>>('navBarHeight')

type ManConfig = {
  file: string,
  count: number,
  row: number,
  col: number,
  width: number,
  height: number,
  fontSize: number,
  textMarginTop: number,
  textMarginLeft: number,
  textRotate: number,
  textTransform: number,
  textTranslate: number,
}

enum QueueType {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

const LihanManConfig: ManConfig = {
  file: 'lihan.png',
  count: 32,
  row: 8,
  col: 4,
  width: 64,
  height: 125,
  fontSize: 16,
  textMarginTop: 18,
  textMarginLeft: 38,
  textTransform: 1.8,
  textRotate: Math.PI / 4.5,
  textTranslate: 25,
}

const DefManConfig: ManConfig = {
  file: 'default.webp',
  count: 32,
  row: 8,
  col: 4,
  width: 64,
  height: 150,
  fontSize: 18,
  textMarginTop: 20,
  textMarginLeft: 30,
  textTransform: 1.9,
  textRotate: Math.PI / 5.5,
  textTranslate: 20,
}

const Themes = ['default', 'lihan', 'kid']
const Shapes = [{ title: '横排', value: 'horizontal' }, { title: '竖排', value: 'vertical' }]
const Colors = ['#c0392b', '#2980b9', '#2c3e50', '#8e44ad']

const theme = ref<string>('lihan')
const shape = ref<QueueType>(QueueType.Vertical)
const color = ref<string>('#c0392b')
const canSave = ref<boolean>(false)
const inVal = ref<string | null>('土味情话，举牌表达')
const generating = ref<boolean>(false)
const canvasSize = ref<{ width: number, height: number }>({ width: 0, height: 0 })
const maxLength = ref<number>(0)

let ctx: Taro.CanvasContext | null = null
let offscreenCanvas: Taro.OffscreenCanvas | null = null
let offscreenCtx: Taro.RenderingContext | null = null
let material: Taro.Image | null = null
let materialLoaded = false
let dpr = Taro.getWindowInfo().pixelRatio || 1

onMounted(async () => {
  Taro.setNavigationBarTitle({ title: '举牌小人' })
  nextTick(async () => {
    await initCanvas()
  })
})

watch(() => theme.value, async () => {
  await loadMaterial()
})

watch(() => canvasSize.value, async () => {

  offscreenCanvas = Taro.createOffscreenCanvas({
    type: '2d',
    width: canvasSize.value.width,
    height: canvasSize.value.height
  })
  offscreenCtx = offscreenCanvas.getContext('2d')
  material = offscreenCanvas.createImage()

  await loadMaterial()
})

async function initCanvas() {
  // 初始化canvas上下文
  Taro.createSelectorQuery()
    .select('#drawCanvas')
    .fields({ node: true, size: true })
    .exec(async (res) => {
      canvasSize.value = { width: res[0].width, height: res[0].height }
    })

  ctx = Taro.createCanvasContext('drawCanvas')
}

async function loadMaterial() {
  materialLoaded = false
  let config = theme.value == 'default' ? DefManConfig : LihanManConfig
  let url = `/assets/${config.file}`
  await new Promise(resolve => {
    material.onload = resolve
    material.src = url
  })

  offscreenCanvas.width = material.width
  offscreenCanvas.height = material.height;

  (offscreenCtx as any).drawImage(material, 0, 0, material.width, material.height)

  maxLength.value = Math.floor(canvasSize.value.width / config.width) * Math.floor(canvasSize.value.height / config.height)

  materialLoaded = true
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

    ctx.clearRect(0, 0, canvasSize.value.width, canvasSize.value.height)
    ctx.draw(false)

    let config = theme.value == 'default' ? DefManConfig : LihanManConfig

    await queue(config)
    canSave.value = true
  } catch (err) {
    console.log(err)
  }
}

async function queue(config: ManConfig) {
  const text = inVal.value.trim()
  let manW = config.width
  let manH = config.height

  let col = 0, row = 0, marginH = 0, marginV = 0, x = 0, y = 0, v = 0, h = 0

  if (shape.value == QueueType.Horizontal) {
    col = Math.floor(canvasSize.value.width / config.width)
    row = Math.ceil(text.length / col)
    v = row
    h = col
  } else if (shape.value == QueueType.Vertical) {
    row = Math.floor(canvasSize.value.height / config.height)
    col = Math.ceil(text.length / row)
    v = col
    h = row
  }

  marginH = (canvasSize.value.width - col * manW) / 2
  marginV = (canvasSize.value.height - row * manH) / 2

  await drawMan(row, col, text.length, config, marginH, marginV)

  ctx.font = `${config.fontSize}px "微软雅黑"`
  ctx.fillStyle = color.value

  let isHorizontal = shape.value == QueueType.Horizontal
  for (let i = 0; i < v; ++i) {
    for (let j = 0; j < h; ++j) {
      let idx = i * h + j
      if (idx >= text.length) break

      ctx.save()

      x = Math.round(marginH + manW * (isHorizontal ? j : i) + config.textMarginLeft)
      y = Math.round(marginV + manH * (isHorizontal ? i : j) + config.textMarginTop)
      ctx.translate(x, y)
      ctx.transform(config.textTransform, 0, 0, 1, 0, 0)
      ctx.translate(-config.textTranslate / config.textTransform, 0)
      ctx.rotate(config.textRotate)
      ctx.fillText(text[idx], 0, 0)
      ctx.restore()
    }
  }

  ctx.draw(true)
  generating.value = false
}


async function drawMan(row: number, col: number, textLen: number, config: ManConfig, marginH: number, marginV: number) {
  let i = 0, j = 0, idx = 0
  if (shape.value == QueueType.Horizontal) {
    while (i < row) {
      j = 0
      while (j < col) {
        idx = i * col + j
        if (idx >= textLen) return

        let randomW = Math.floor(Math.floor(Math.random() * config.row) * config.width)
        let randomH = Math.floor(Math.floor(Math.random() * config.col) * config.height)

        try {
          await Taro.canvasPutImageData({
            canvasId: 'drawCanvas',
            x: marginH + config.width * j,
            y: marginV + config.height * i,
            width: config.width,
            height: config.height,
            data: (offscreenCtx as any).getImageData(randomW, randomH, config.width, config.height).data,
          })
        } catch (err) {
          // console.error(err)
        }

        j++
      }
      i++
    }
  } else if (shape.value == QueueType.Vertical) {
    while (i < col) {
      j = 0
      while (j < row) {
        idx = i * row + j
        if (idx >= textLen) return

        let randomW = Math.floor(Math.floor(Math.random() * config.row) * config.width)
        let randomH = Math.floor(Math.floor(Math.random() * config.col) * config.height)

        try {
          await Taro.canvasPutImageData({
            canvasId: 'drawCanvas',
            x: marginH + config.width * i,
            y: marginV + config.height * j,
            width: config.width,
            height: config.height,
            data: (offscreenCtx as any).getImageData(randomW, randomH, config.width, config.height).data,
          })
        } catch (err) {
          // console.error(err)
        }

        j++
      }
      i++
    }
  }
}

async function saveToAlbum() {
  try {
    let res = await Taro.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: canvasSize.value.width,
      height: canvasSize.value.height,
      destWidth: canvasSize.value.width * dpr,
      destHeight: canvasSize.value.height * dpr,
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

<template>
  <nut-toast :msg="state.msg" v-model:visible="state.show" :type="state.type" @closed="onClosed" :cover="state.cover" />
  <nut-cell-group title="CellGroup Title" desc="CellGroup Description">
    <nut-cell title="常见问题" :round-radius="0" icon="ask" desc="Description">
      <template #icon>
        <Ask style="font-size: 1.2rem; color: gray; margin-right: 10px;"></Ask>
      </template>
    </nut-cell>
    <nut-cell title="字体大小" :round-radius="0" is-link @click="clickFontSize">
      <template #icon>
        <Edit style="font-size: 1.2rem; color: gray; margin-right: 10px;"></Edit>
      </template>
    </nut-cell>
  </nut-cell-group>
  <nut-cell title="联系我们" @click="clickContactUs">
    <template #icon>
      <Message style="font-size: 1.2rem; color: gray; margin-right: 10px;"></Message>
    </template>
  </nut-cell>
</template>

<script setup>
import { Ask, Edit, Message } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { reactive } from 'vue'

const state = reactive({
  msg: 'toast',
  type: 'text',
  show: false,
  cover: false,
})

function clickCommonQA() {
  Taro.navigateTo({ url: '/pages/settings/commonQA/index' })
}

function clickContactUs() {
  Taro.navigateTo({ url: '/pages/settings/contactUs/index' })
}

function clickFontSize() {
  Taro.navigateTo({ url: '/pages/settings/fontSize/index' })
}



function openToast(type, msg, cover = false) {
  state.show = true
  state.msg = msg
  state.type = type
  state.cover = cover
}

function onClosed() { console.log('closed') }

</script>

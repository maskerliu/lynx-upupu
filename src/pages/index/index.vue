<template>
  <view class="index">
    <nut-navbar title="Title" @click-title="onClick"></nut-navbar>
    <nut-button type="primary" @click="onClick">按钮</nut-button>


    <nut-tabbar v-model="active" @tab-switch="tabSwitch">
      <nut-tabbar-item tab-title="Home">
        <template #icon>
          <Home></Home>
        </template>
      </nut-tabbar-item>
      <nut-tabbar-item tab-title="Find">
        <template #icon>
          <Find></Find>
        </template>
      </nut-tabbar-item>
      <nut-tabbar-item tab-title="More">
        <template #icon>
          <My></My>
        </template>
      </nut-tabbar-item>
    </nut-tabbar>
    <nut-toast v-model:visible="show" msg="你成功了" />
  </view>
</template>

<script setup>
import { Find, Home, My } from '@nutui/icons-vue-taro'
import { ref } from 'vue'

const active = ref(0)
const show = ref(false)

function tabSwitch(index) {
  active.value = index
}

function onClick() {
  show.value = true
}
</script>

<template>
  <view>
    <router-view v-slot="{ Component }" style="padding-bottom: 52px;">
      <keep-alive :include="['Home', 'Find', 'More']">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <nut-tabbar v-model="activeTab" @tab-switch="tabSwitch" class="fixed-tabbar"
      style="border-color: var(--nut-background);">
      <nut-tabbar-item v-for="item in Tabs" :key="item.name" :name="item.name" :icon="item.icon" />
    </nut-tabbar>
  </view>
</template>
<script setup lang="ts">

import { Fabulous, Home, My } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { h, inject, onActivated, onMounted, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'

const navBarHeight = inject<Ref<number>>('navBarHeight')

const router = useRouter()
const containerHeight = ref(0)
const activeTab = ref('home')
const Tabs = [
  {
    title: '首页',
    icon: h(Home),
    name: 'home'
  },
  {
    title: '发现',
    icon: h(Fabulous),
    name: 'find'
  },
  {
    title: '我的',
    icon: h(My),
    name: 'more'
  }
]

onMounted(() => {
  activeTab.value = 'home'
  router.replace(`/main/${activeTab.value}`)

  const dpr = Taro.getWindowInfo().pixelRatio || 1
  containerHeight.value = navBarHeight.value + 52 * dpr
})

onActivated(() => {

})

function tabSwitch(tab: any) {
  router.replace(`/main/${tab.name}`)
  activeTab.value = tab.name
}

</script>
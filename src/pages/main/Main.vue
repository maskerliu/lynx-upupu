<template>
  <router-view style="height: calc(100vh - 144px);"></router-view>
  <nut-tabbar v-model="activeTab" @tab-switch="tabSwitch" class="fixed-tabbar">
    <nut-tabbar-item v-for="item in Tabs" :key="item.name" :name="item.name" :tab-title="item.title"
      :icon="item.icon"></nut-tabbar-item>
  </nut-tabbar>
</template>
<script setup>

import { Find, Home, My } from '@nutui/icons-vue-taro'
import { h, inject, onActivated, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const showNavBack = inject('showNavBack')
const router = useRouter()
const activeTab = ref('home')
const Tabs = [
  {
    title: '首页',
    icon: h(Home),
    name: 'home'
  },
  {
    title: '发现',
    icon: h(Find),
    name: 'find'
  },
  {
    title: '我的',
    icon: h(My),
    name: 'more'
  }
]

onMounted(() => {
  console.log('mounted')
  activeTab.value = 'home'
  router.replace(`/main/${activeTab.value}`)
})

onActivated(() => {
  console.log('activated')
  showNavBack.value = false
})

function tabSwitch(tab) {
  router.replace(`/main/${tab.name}`)
  activeTab.value = tab.name
}


</script>
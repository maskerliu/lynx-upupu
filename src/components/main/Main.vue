<template>
  <view>
    <router-view v-slot="{ Component, route }" style="margin-bottom: 52px;"
      :style="{ height: `calc(100vh - ${navBarHeight + 52}px)` }">
      <keep-alive :include="['Home', 'Find', 'More']">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <nut-tabbar v-model="activeTab" @tab-switch="tabSwitch" class="fixed-tabbar">
      <nut-tabbar-item v-for="item in Tabs" :key="item.name" :name="item.name" :icon="item.icon"></nut-tabbar-item>
    </nut-tabbar>
  </view>
</template>
<script setup lang="ts">

import { Fabulous, Home, My } from '@nutui/icons-vue-taro'
import { h, inject, onActivated, onMounted, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'

const navBarHeight = inject('navBarHeight', 0)
const showNavBack = inject<Ref<boolean>>('showNavBack')
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
})

onActivated(() => {
  showNavBack.value = false
})

function tabSwitch(tab: any) {
  router.replace(`/main/${tab.name}`)
  activeTab.value = tab.name
}


</script>
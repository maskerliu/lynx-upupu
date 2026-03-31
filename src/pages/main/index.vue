<template>
  <nut-config-provider :theme="theme">
    <HomeTab v-if="activeTab == 'home'"></HomeTab>
    <FindTab v-if="activeTab == 'find'"></FindTab>
    <MoreTab v-if="activeTab == 'more'"></MoreTab>
    <nut-tabbar v-model="activeTab" @tab-switch="tabSwitch" class="fixed-tabbar">
      <nut-tabbar-item v-for="item in Tabs" :key="item.name" :name="item.name" :tab-title="item.title"
        :icon="item.icon"></nut-tabbar-item>
    </nut-tabbar>
  </nut-config-provider>
</template>

<script setup>
import { Find, Home, My } from '@nutui/icons-vue-taro'
import { h, onMounted, ref } from 'vue'
import FindTab from './Find.vue'
import HomeTab from './Home.vue'
import './index.scss'
import MoreTab from './More.vue'

const activeTab = ref('home')
const theme = ref('light')
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
  activeTab.value = 'home'
})

function tabSwitch(tab) {
  activeTab.value = tab.name
}

</script>

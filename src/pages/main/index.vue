<template>
  <nut-config-provider :theme="commonStore.theme" :theme-vars="commonStore.themeVars">
    <view :class='commonStore.theme == "dark" ? "nut-theme-dark" : ""'>
      <router-view v-slot="{ Component }" style="padding-bottom: 52px;"
        :style="{ paddingTop: commonStore.statusBarHeight + 'px' }">
        <keep-alive :include="['Home', 'Find', 'More']">
          <component :is="Component" />
        </keep-alive>
      </router-view>

      <nut-tabbar v-model="activeTab" @tab-switch="tabSwitch" class="fixed-tabbar"
        style="border-color: var(--nut-background);">
        <nut-tabbar-item v-for="item in Tabs" :key="item.name" :name="item.name" :icon="item.icon" />
      </nut-tabbar>
    </view>

    <nut-number-keyboard v-model:visible="commonStore.showKeyboard" overlay @input="onInput" @delete="onDelete"
      @close="commonStore.showKeyboard = false">
    </nut-number-keyboard>
  </nut-config-provider>
</template>
<script setup lang="ts">
import { Fabulous, Home, My } from '@nutui/icons-vue-taro'
import { useCommonStore } from '@stores/common'
import { h, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import './index.css'

const commonStore = useCommonStore()
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

function tabSwitch(tab: any) {
  router.replace(`/main/${tab.name}`)
  activeTab.value = tab.name
}

function onInput(value: string) {
  commonStore.numberInput += value
}

function onDelete() {
  commonStore.numberInput = commonStore.numberInput.slice(0, -1)
}


</script>

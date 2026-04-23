<template>

  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <view class="nav-bar" :style="{ height: navBarHeight + 'px' }">
      <!-- 左侧返回按钮（可选） -->
      <view class="nav-left" v-if="showNavBack" :style="{ marginTop: statusBarHeight + 'px' }" @tap="goBack">
        <Left />
      </view>
    </view>
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="['Main']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </nut-config-provider>
</template>

<script setup>
import { Left } from '@nutui/icons-vue-taro'
import { onMounted, provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import './index.scss'

const navBarHeight = ref(0)
const statusBarHeight = ref(0)
const activeTab = ref('home')
const theme = ref('light')
const showNavBack = ref(false)
const themeVars = ref({
  primaryColor: '#2980b9',
  primaryColorEnd: '#3498db',
  fontSize0: '0.6rem',
  fontSize1: '0.9rem',
  fontSize2: '1rem',
  fontSize3: '1.2rem',
  fontSize4: '1.4rem'
})

const router = useRouter()

provide('navBarHeight', navBarHeight)
provide('showNavBack', showNavBack)

onMounted(() => {
  initNavBarHeight()
  router.replace('/main/home')
  showNavBack.value = false
})

function initNavBarHeight() {
  const systemInfo = wx.getSystemInfoSync()
  const menuButtonInfo = wx.getMenuButtonBoundingClientRect()

  statusBarHeight.value = systemInfo.statusBarHeight || 0
  const menuHeight = menuButtonInfo.height
  const menuTop = menuButtonInfo.top

  navBarHeight.value = statusBarHeight.value + menuHeight + (menuTop - statusBarHeight.value) * 2
}

function goBack() {
  console.log(router.currentRoute.value.path)
  router.go(-1)
}

</script>

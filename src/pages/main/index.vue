<template>

  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <view class="nav-bar" :style="{ height: navBarHeight + 'px' }">
      <view class="nav-left" v-if="showNavBack" :style="{ marginTop: statusBarHeight + 'px' }" @tap="goBack">
        <Left style="font-size: 1rem;" />
      </view>
    </view>

    <router-view v-slot="{ Component }" :class='theme == "dark" ? "nut-theme-dark" : ""'>
      <transition name="slide-fade">
        <keep-alive :include="['Main']">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </nut-config-provider>
</template>

<script setup>
import { Left } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
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
  fontSize0: '0.8rem',
  fontSize1: '1rem',
  fontSize2: '1.2rem',
  fontSize3: '1.4rem',
  fontSize4: '1.6rem'
})

const router = useRouter()

provide('navBarHeight', navBarHeight)
provide('showNavBack', showNavBack)
provide('theme', theme)
provide('themeVars', themeVars)

onMounted(() => {
  initNavBarHeight()
  router.replace('/main/home')
  showNavBack.value = false

  theme.value = Taro.getStorageSync('app_theme') || 'light'
  const fontSize = Taro.getStorageSync('app_font_size')
  themeVars.value.fontSize0 = `${fontSize}px`
  themeVars.value.fontSize1 = `${fontSize + 2}px`
  themeVars.value.fontSize2 = `${fontSize + 4}px`
  themeVars.value.fontSize3 = `${fontSize + 6}px`
  themeVars.value.fontSize4 = `${fontSize + 8}px`

  console.log(themeVars.value)
})

function initNavBarHeight() {
  const winInfo = Taro.getWindowInfo()
  const menuBtnInfo = Taro.getMenuButtonBoundingClientRect()

  statusBarHeight.value = winInfo.statusBarHeight || 0
  navBarHeight.value = statusBarHeight.value + menuBtnInfo.height + 10
}

function goBack() {
  console.log(router.currentRoute.value.path)
  router.go(-1)
}

</script>

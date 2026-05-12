<template>
  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <nav-bar style="z-index: 100;" />
    <router-view v-slot="{ Component }" :class='theme == "dark" ? "nut-theme-dark" : ""'
      :style="{ marginTop: navBarHeight + 'px' }">
      <transition name="slide-fade">
        <keep-alive :include="['Main']">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </nut-config-provider>
</template>
<script setup lang="ts">
import Taro from '@tarojs/taro'
import { onMounted, provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../../components/NavBar.vue'
import './index.css'

const navBarHeight = ref(0)
const navTitle = ref('')
const theme = ref('light')
const showNavBack = ref(false)
const themeVars = ref({
  primaryColor: '#2980b9',
  primaryColorEnd: '#3498db',
})

const router = useRouter()

provide('navBarHeight', navBarHeight)
provide('navTitle', navTitle)
provide('showNavBack', showNavBack)
provide('theme', theme)
provide('themeVars', themeVars)

onMounted(() => {
  router.replace('/main/home')
  showNavBack.value = false

  theme.value = Taro.getStorageSync('app_theme') || 'light'
  const fontSize = Taro.getStorageSync('app_font_size')
  themeVars.value['font-size-0'] = `${fontSize - 3}px`
  themeVars.value['font-size-1'] = `${fontSize - 2}px`
  themeVars.value['font-size-2'] = `${fontSize}px`
  themeVars.value['font-size-3'] = `${fontSize + 2}px`
  themeVars.value['font-size-4'] = `${fontSize + 4}px`
})

</script>

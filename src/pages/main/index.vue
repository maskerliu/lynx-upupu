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

    <nut-number-keyboard v-model:visible="showKeyboard" overlay @input="onInput" @delete="onDelete"
      @close="showKeyboard = false">
    </nut-number-keyboard>
  </nut-config-provider>
</template>
<script setup lang="ts">
import Taro from '@tarojs/taro'
import { inject, onMounted, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../../components/NavBar.vue'
import './index.css'

const navBarHeight = inject<Ref<number>>('navBarHeight')
const navTitle = inject<Ref<string>>('navTitle')
const theme = inject<Ref<string>>('theme')
const showNavBack = inject<Ref<boolean>>('showNavBack')
const themeVars = inject<Ref<Record<string, string>>>('themeVars')

const showKeyboard = ref(false)
const numberInput = ref('')

const router = useRouter()

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
  themeVars.value['font-size-5'] = `${fontSize + 8}px`
})

function onInput(value: string) {
  numberInput.value += value
}

function onDelete() {
  numberInput.value = numberInput.value.slice(0, -1)
}

</script>

<template>
  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <router-view v-slot="{ Component }" :class='theme == "dark" ? "nut-theme-dark" : ""'
      :style="{ paddingTop: statusBarHeight + 'px' }">
      <keep-alive :include="['Main']">
        <component :is="Component" />
      </keep-alive>
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
import './index.css'

const statusBarHeight = inject<Ref<number>>('statusBarHeight')
const theme = inject<Ref<string>>('theme')
const themeVars = inject<Ref<Record<string, string>>>('themeVars')
const showKeyboard = inject<Ref<boolean>>('showKeyboard')

const numberInput = ref('')

const router = useRouter()

onMounted(() => {
  router.replace('/main/home')

  theme.value = Taro.getStorageSync('app_theme') || 'light'
  const fontSize = Taro.getStorageSync('app_font_size') || 16
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

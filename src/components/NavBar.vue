<template>
  <nut-row class="nav-bar" :style="{ height: navBarHeight + 'px' }">
    <view class="nav-left" v-if="showNavBack" :style="{ marginTop: statusBarHeight + 'px' }" @tap="goBack">
      <Left style="font-size: 1rem;" />
    </view>

    <view class="nav-title" :style="{ marginTop: (statusBarHeight - 5) + 'px' }">{{ title }}</view>

  </nut-row>
</template>
<script setup lang="ts">
import { Left } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { inject, onMounted, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const statusBarHeight = ref(0)
const navBarHeight = inject<Ref<number>>('navBarHeight')
const showNavBack = inject<Ref<boolean>>('showNavBack')
const title = inject<Ref<string>>('navTitle')

onMounted(() => {
  initNavBarHeight()
  showNavBack.value = false
})

function initNavBarHeight() {
  const winInfo = Taro.getWindowInfo()
  const menuBtnInfo = Taro.getMenuButtonBoundingClientRect()

  statusBarHeight.value = winInfo.statusBarHeight || 0
  navBarHeight.value = statusBarHeight.value + menuBtnInfo.height
}

function goBack() {
  router.go(-1)
}

</script>
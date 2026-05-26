<template>
  <nut-config-provider :theme="commonStore.theme" :theme-vars="commonStore.themeVars">
    <nav-bar style="z-index: 100;" show-nav-back title="我的订单" />
    <nut-tabs :style="{
      height: `calc(100vh - ${commonStore.navBarHeight}px)`,
      paddingTop: commonStore.navBarHeight + 'px'
    }" v-model="activeCatergory" title-scroll :animated-time="0">
      <nut-tab-pane :title="category" :pane-key="idx"
        style="background-color: transparent; padding: 0 10px; overflow: hidden auto;"
        :style="{ height: `${containerHeight}px` }" v-for="(category, idx) in Categories">
        <order-snap v-for="(item, index) in data" :key="index" />
      </nut-tab-pane>
    </nut-tabs>
  </nut-config-provider>
</template>
<script lang="ts" setup>
import NavBar from '@components/NavBar.vue'
import OrderSnap from '@components/order/OrderSnap.vue'
import { useCommonStore } from '@stores/common'
import Taro from '@tarojs/taro'
import { computed, onMounted, ref } from 'vue'


const commonStore = useCommonStore()

const Categories = ref(['全部', '待付款', '待收货/待使用', '待评价', '退款/售后'])
const data = ref(new Array(20).fill(0))
const winInfo = ref(null)
const activeCatergory = ref(0)

onMounted(() => {
  winInfo.value = Taro.getWindowInfo()
})

const containerHeight = computed(() => {
  if (!winInfo.value) return 470
  const calcHeight = winInfo.value.windowHeight - 46 - commonStore.navBarHeight
  return Math.max(calcHeight, 300)
})

</script>
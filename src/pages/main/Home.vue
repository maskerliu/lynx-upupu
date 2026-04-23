<template>
  <nut-tabs v-model="activeCatergory" title-scroll :animated-time="0">
    <nut-tab-pane :title="category" :pane-key="idx" v-for="(category, idx) in Categories" style="padding: 10px 0 0 0;">
      <nut-list :list-data="data" :container-height="containerHeight" @scroll-bottom="onScrollBottom">
        <template #default="{ index }">
          <div class="list-item">
            {{ index }}
          </div>
        </template>
      </nut-list>
    </nut-tab-pane>
  </nut-tabs>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { computed, onMounted, ref } from 'vue'
import './Home.scss'

const activeCatergory = ref(0)
const Categories = ref(['推荐', '穿搭', '美食', '职场', '影视', '情感', '美食', '游戏', '健身'])
const data = ref(new Array(20).fill(0))
const systemInfo = ref(null)

onMounted(async () => {
  activeCatergory.value = 0
  try {
    systemInfo.value = await Taro.getSystemInfo()
  } catch (error) {
    console.warn('获取系统信息失败', error)
    systemInfo.value = { windowHeight: 667 }
  }
})

function onScrollBottom() {
  // let arr = new Array(100).fill(0)
  // const len = data.value.length
  // data.value = data.value.concat(arr.map((_, index) => len + index + 1))
}

const containerHeight = computed(() => {
  if (!systemInfo.value) return 470
  const tabsHeight = 46
  const paddingHeight = 10
  const reservedSpace = 2
  const calculatedHeight = systemInfo.value.windowHeight - tabsHeight - paddingHeight - reservedSpace
  return Math.max(calculatedHeight, 300)
})

</script>

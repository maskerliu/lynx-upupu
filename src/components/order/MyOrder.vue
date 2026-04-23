<template>
  <view :style="{ height: `calc(100% - ${navBarHeight}px)` }" style="overflow: hidden auto;">

    <nut-tabs v-model="activeCatergory" title-scroll :animated-time="0">
      <nut-tab-pane :title="category" :pane-key="idx" style="background-color: transparent; padding: 0;"
        v-for="(category, idx) in Categories">

        <scroll-view :style="{ height: `${containerHeight}px` }" style="overflow: hidden auto; ">

        </scroll-view>

      </nut-tab-pane>
    </nut-tabs>
  </view>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { computed, inject, onMounted, Ref, ref } from 'vue'

const navBarHeight = inject<Ref<number>>('navBarHeight')
const showNavBack = inject<Ref<boolean>>('showNavBack')
const Categories = ref(['推荐', '穿搭', '美食', '职场', '影视', '情感', '美食', '游戏', '健身'])
const data = ref(new Array(20).fill(0))
const winInfo = ref(null)
const activeCatergory = ref(0)

onMounted(() => {
  showNavBack.value = true

  winInfo.value = Taro.getWindowInfo()
})

const containerHeight = computed(() => {
  if (!winInfo.value) return 470
  const calcHeight = winInfo.value.windowHeight - 46 - navBarHeight.value
  return Math.max(calcHeight, 300)
})

</script>
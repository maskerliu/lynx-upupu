<template>
  <view :style="{ height: `calc(100% - ${navBarHeight}px)` }" style="overflow: hidden auto;">
    <nut-cell title="我的作品">
      <template #subtitle>

        <post-snap></post-snap>
        <post-snap></post-snap>
        <post-snap></post-snap>
      </template>
    </nut-cell>
  </view>
</template>
<script lang="ts" setup>
import { inject, onMounted, Ref } from 'vue'

const navBarHeight = inject<Ref<number>>('navBarHeight')
const showNavBack = inject<Ref<boolean>>('showNavBack')

onMounted(() => {
  showNavBack.value = true
})
</script>
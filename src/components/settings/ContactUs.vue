<template>
  <view :style="{ height: `calc(100% - ${navBarHeight}px)` }" style="overflow: hidden auto;">联系我们</view>
</template>
<script setup lang="ts">
import { inject, onMounted, Ref } from 'vue'

const navBarHeight = inject<Ref<number>>('navBarHeight')
const showNavBack = inject<Ref<boolean>>('showNavBack')

onMounted(() => {
  showNavBack.value = true
})
</script>
<template>
  <fake-page>
    <view :style="{ height: `calc(100% - ${navBarHeight}px)` }"
      style="background: var(--nut-background); overflow: hidden auto;">
      联系我们
    </view>
  </fake-page>
</template>
<script setup lang="ts">
import { inject, onMounted, Ref } from 'vue'
import FakePage from '../../components/FakePage.vue'

const navBarHeight = inject<Ref<number>>('navBarHeight')
const showNavBack = inject<Ref<boolean>>('showNavBack')

onMounted(() => {
  showNavBack.value = true
})
</script>
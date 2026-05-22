<template>
  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <nav-bar style="z-index: 100;" show-nav-back title="联系我们" />
    <view style="overflow: hidden auto;" :style="{ height: `calc(100vh)`, paddingTop: navBarHeight + 'px' }">
    </view>
  </nut-config-provider>
</template>
<script setup lang="ts">

import NavBar from '@components/NavBar.vue'
import { inject, onMounted, Ref } from 'vue'

const navBarHeight = inject<Ref<number>>('navBarHeight')
const theme = inject<Ref<string>>('theme')
const themeVars = inject<Ref<Record<string, string>>>('themeVars')


onMounted(() => {

})

</script>
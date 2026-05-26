<template>
  <nut-config-provider :theme="commonStore.theme" :theme-vars="commonStore.themeVars">
    <nav-bar style="z-index: 100;" show-nav-back title="" />
    <view style="overflow: hidden auto; height: 100vh;" :style="{ paddingTop: commonStore.navBarHeight + 'px' }">
    </view>
  </nut-config-provider>
</template>
<script setup lang="ts">

import NavBar from '@components/NavBar.vue'
import { inject, onMounted, Ref } from 'vue'
import { useCommonStore } from '@stores/common'

const commonStore = useCommonStore()


onMounted(() => {

})

</script>
<template>
  <nut-config-provider :theme="commonStore.theme" :theme-vars="commonStore.themeVars">
    <nav-bar style="z-index: 100;" show-nav-back title="联系我们" />
    <view style="overflow: hidden auto;"
      :style="{ height: `calc(100vh)`, paddingTop: commonStore.navBarHeight + 'px' }">
    </view>
  </nut-config-provider>
</template>
<script setup lang="ts">

import NavBar from '@components/NavBar.vue'
import { useCommonStore } from '@stores/common'
import { onMounted } from 'vue'


const commonStore = useCommonStore()

onMounted(() => {

})

</script>
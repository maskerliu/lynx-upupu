<template>
  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <nav-bar style="z-index: 100;" show-nav-back title="联系我们" />
    <view :style="{ height: `calc(100vh - ${navBarHeight}px)`, marginTop: navBarHeight + 'px' }">
      <nut-rate v-model="value" :custom-icon="HeartFill" active-color="skyblue" size="1.5rem" />
    </view>
  </nut-config-provider>
</template>
<script setup lang="ts">
import { HeartFill } from '@nutui/icons-vue-taro'
import { inject, onMounted, Ref, ref } from 'vue'
import NavBar from '../../../components/NavBar.vue'

const navBarHeight = inject<Ref<number>>('navBarHeight')
const theme = inject<Ref<string>>('theme')
const themeVars = inject<Ref<any>>('themeVars')

const value = ref(3)

onMounted(() => {

})

</script>
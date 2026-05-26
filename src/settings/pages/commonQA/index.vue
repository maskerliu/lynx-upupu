<template>
  <nut-config-provider :theme="commonStore.theme" :theme-vars="commonStore.themeVars">
    <nav-bar style="z-index: 100;" show-nav-back title="常见问题" />
    <view :style="{
      height: `calc(100vh - ${commonStore.navBarHeight}px)`,
      paddingTop: commonStore.navBarHeight + 'px'
    }">
      <nut-cell-group title="视频创作" style="padding: 0 10px;">
        <nut-cell title="如何在个人名片上加上我的视频号？" is-link></nut-cell>
        <nut-cell title="账号被封禁会影响我的订单吗？" is-link></nut-cell>
        <nut-cell title="个人主页如何设置添加微信功能？" is-link></nut-cell>
      </nut-cell-group>

      <nut-cell-group title="订单相关" style="padding: 0 10px;">
        <nut-cell title="如何在个人名片上加上我的视频号？"></nut-cell>
        <nut-cell title="账号被封禁会影响我的订单吗？"></nut-cell>
        <nut-cell title="个人主页如何设置添加微信功能？"></nut-cell>
      </nut-cell-group>

      <nut-cell-group title="账号相关" style="padding: 0 10px;">
        <nut-cell title="如何在个人名片上加上我的视频号？"></nut-cell>
        <nut-cell title="账号被封禁会影响我的订单吗？"></nut-cell>
        <nut-cell title="个人主页如何设置添加微信功能？"></nut-cell>
      </nut-cell-group>
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
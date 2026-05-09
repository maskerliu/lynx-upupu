<template>
  <fake-page>
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
    <view style="padding: 0 10px;">


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
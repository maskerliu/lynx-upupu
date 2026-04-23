<template>
  <view :style="{ height: `calc(100vh - ${navBarHeight}px)` }" style="overflow: hidden auto;">

    <nut-collapse>
      <nut-collapse-item name="videoQA" title="视频创作" style="padding: 0;">
        <template #icon>
          <RectDown />
        </template>
        <nut-cell-group>
          <nut-cell title="如何在个人名片上加上我的视频号？" is-link></nut-cell>
          <nut-cell title="账号被封禁会影响我的订单吗？" is-link></nut-cell>
          <nut-cell title="个人主页如何设置添加微信功能？" is-link></nut-cell>
        </nut-cell-group>
      </nut-collapse-item>
      <nut-collapse-item name="orderQA" title="订单相关">
        <template #icon>
          <RectDown />
        </template>
        <nut-cell-group>
          <nut-cell title="如何在个人名片上加上我的视频号？"></nut-cell>
          <nut-cell title="账号被封禁会影响我的订单吗？"></nut-cell>
          <nut-cell title="个人主页如何设置添加微信功能？"></nut-cell>
        </nut-cell-group>

      </nut-collapse-item>
      <nut-collapse-item name="accountQA" title="账号相关">
        <template #value> Description </template>
        <template #icon>
          <RectDown />
        </template>
        <nut-cell-group>
          <nut-cell title="如何在个人名片上加上我的视频号？"></nut-cell>
          <nut-cell title="账号被封禁会影响我的订单吗？"></nut-cell>
          <nut-cell title="个人主页如何设置添加微信功能？"></nut-cell>
        </nut-cell-group>
      </nut-collapse-item>
    </nut-collapse>
  </view>

</template>
<script setup lang="ts">
import { RectDown } from '@nutui/icons-vue-taro'
import { inject, onMounted, Ref } from 'vue'

const navBarHeight = inject<Ref<number>>('navBarHeight')
const showNavBack = inject<Ref<boolean>>('showNavBack')

onMounted(() => {
  showNavBack.value = true
})

</script>
<template>
  <nut-config-provider :theme="commonStore.theme" :theme-vars="commonStore.themeVars">
    <nav-bar style="z-index: 100;" show-nav-back title="个人资料" />
    <view style="overflow: hidden auto;" :style="{
      height: `calc(100vh - ${commonStore.navBarHeight}px)`,
      paddingTop: `${commonStore.navBarHeight}px`
    }">

      <nut-cell center is-link title="头像" round-radius="0px" style="margin: 10px 0 0 0;">
        <template #desc>
          <img style="width: 50px; height: 50px;" mode="aspectFill"
            src="https://c-ssl.duitang.com/uploads/item/201403/21/20140321180046_kjW3f.jpeg" />
        </template>
        <template #link>
          <RectRight style="color: #bdc3c7;" />
        </template>
      </nut-cell>

      <nut-cell center is-link title="名字" desc="暴走的兔子" round-radius="0px" style="margin: 0;">
        <template #link>
          <RectRight style="color: #bdc3c7;" />
        </template>
      </nut-cell>
      <nut-cell center is-link title="性别" desc="男" round-radius="0px" style="margin: 0;">
        <template #link>
          <RectRight style="color: #bdc3c7;" />
        </template>
      </nut-cell>
      <nut-cell center is-link title="地区" desc="上海 长宁" round-radius="0px" style="margin: 0;">
        <template #link>
          <RectRight style="color: #bdc3c7;" />
        </template>
      </nut-cell>
      <nut-cell center is-link title="手机号" desc="138******01" round-radius="0px" style="margin: 0;">
        <template #link>
          <RectRight style="color: #bdc3c7;" />
        </template>
      </nut-cell>

      <nut-cell center is-link title="我的地址" round-radius="0px" style="margin: 10px 0 0 0;">
        <template #link>
          <RectRight style="color: #bdc3c7;" />
        </template>
      </nut-cell>
      <nut-cell center is-link title="我的发票抬头" round-radius="0px" style="margin: 0;">
        <template #link>
          <RectRight style="color: #bdc3c7;" />
        </template>
      </nut-cell>
    </view>
  </nut-config-provider>
</template>
<script setup lang="ts">

import NavBar from '@components/NavBar.vue'
import { RectRight } from '@nutui/icons-vue-taro'
import { useCommonStore } from '@stores/common'
import { onMounted } from 'vue'

const commonStore = useCommonStore()

onMounted(() => {

})

</script>
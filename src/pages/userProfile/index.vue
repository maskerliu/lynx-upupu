<template>
  <nut-config-provider :theme="commonStore.theme" :theme-vars="commonStore.themeVars">
    <nav-bar style="z-index: 100;" show-nav-back title="" />
    <view style="overflow: hidden auto;" :style="{ paddingTop: commonStore.navBarHeight + 'px' }">
      <nut-cell-group>
        <nut-cell title="头像">
          <template #desc>
            <img src="https://c-ssl.duitang.com/uploads/item/201403/21/20140321180046_kjW3f.jpeg" />
          </template>
          <template #link>
            <RectRight />
          </template>
        </nut-cell>

        <nut-cell title="名字" desc="暴走的兔子">
          <template #link>
            <RectRight />
          </template>
        </nut-cell>
        <nut-cell title="性别" desc="男">
          <template #link>
            <RectRight />
          </template>
        </nut-cell>
        <nut-cell title="地区" desc="上海 长宁">
          <template #link>
            <RectRight />
          </template>
        </nut-cell>
        <nut-cell title="手机号" desc="138******01">
          <template #link>
            <RectRight />
          </template>
        </nut-cell>
      </nut-cell-group>

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
<template>
  <view style="flex: 1; padding: 0 10px; width: calc(100% - 20px); "
    :style="{ minHeight: `calc(100vh - ${statusBarHeight + 52}px)` }">
    <nut-cell-group style="padding-top: 40px;">
      <user-snap></user-snap>
    </nut-cell-group>

    <nut-noticebar :text="notice" close-mode />

    <nut-cell-group>
      <nut-cell :title="item.title" @click="naviTo(item)" is-link :to="item.to" v-for="item in Group1"
        :key="item.title">
        <template #icon>
          <component :is="item.icon" style="font-size: 1.0rem; color: gray; margin-right: 10px;"></component>
        </template>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group>
      <nut-cell :title="item.title" @click="naviTo(item)" is-link :to="item.to" v-for="item in Group2"
        :key="item.title">
        <template #icon>
          <component :is="item.icon" style="font-size: 1.0rem; color: gray; margin-right: 10px;"></component>
        </template>
      </nut-cell>
    </nut-cell-group>

  </view>
</template>
<script setup lang="ts">

import { Ask, Edit, Footprint, Message, Order } from '@nutui/icons-vue-taro'
import { useCommonStore } from '@stores/common'
import Taro from '@tarojs/taro'
import { inject, onMounted, Ref } from 'vue'
import { useRouter } from 'vue-router'
import UserSnap from '../user/UserSnap.vue'


const statusBarHeight = inject<Ref<number>>('statusBarHeight')

const commonStore = useCommonStore()
const router = useRouter()
const notice = '大家快来看看最新的动态，有新的功能和优化！'

const Group1 = [
  { title: '作品', icon: Footprint, to: '/post/pages/myPost/index' },
  { title: '订单', icon: Order, to: '/pages/myOrder/index' },
]

const Group2 = [
  { title: '常见问题', icon: Ask, to: '/settings/pages/commonQA/index' },
  { title: '字体大小', icon: Edit, to: '/settings/pages/fontSize/index' },
  { title: '联系我们', icon: Message, to: '/settings/pages/contactUs/index' }
]

onMounted(() => {

})

async function naviTo(item) {

  if (item.to.indexOf('/pages/') > -1) {
    await Taro.navigateTo({
      url: item.to
    })
  } else {
    await router.push(item.to)
  }
}

</script>

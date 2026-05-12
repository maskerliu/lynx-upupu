<template>
  <view style="padding: 0 10px; overflow: hidden auto;">
    <nut-cell-group>
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

    <nut-cell-group>
      <Line style="margin: 10px; height: 30vh;" />
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

<script setup>
import { Ask, Edit, Footprint, Message, Order } from '@nutui/icons-vue-taro'
import Taro, { nextTick, useDidShow } from '@tarojs/taro'
import { onActivated, onDeactivated, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Line from '../../components/Line.vue'
import UserSnap from '../user/UserSnap.vue'

const router = useRouter()
const notice = '大家快来看看最新的动态，有新的功能和优化！'

const Group1 = [
  { title: '作品', icon: Footprint, to: '/post/myPost' },
  { title: '订单', icon: Order, to: '/order/myOrder' },
]

const Group2 = [
  { title: '常见问题', icon: Ask, to: '/settings/commonQA' },
  { title: '字体大小', icon: Edit, to: '/settings/fontSize' },
  { title: '联系我们', icon: Message, to: '/settings/contactUs' }
]

let scrollTop = 0

onMounted(() => {

})

// onPageScroll((e => {
//   scrollTop = e.detail.scrollTop
// }))

onActivated(() => {

})

onDeactivated(() => {
  scrollTop = 30
})

useDidShow(() => {
  console.log(scrollTop)
  nextTick(() => {
    Taro.pageScrollTo({
      scrollTop: scrollTop,
      duration: 0
    })
  })
})

async function naviTo(item) {
  await router.push(item.to)
}

</script>

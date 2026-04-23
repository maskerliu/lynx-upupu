<template>
  <nut-cell-group>
    <nut-cell :title="item.title" @click="naviTo(item)" is-link :to="item.to" v-for="item in MoreItems"
      :key="item.title">
      <template #icon>
        <component :is="item.icon" style="font-size: 1.0rem; color: gray; margin-right: 10px;"></component>
      </template>
    </nut-cell>
  </nut-cell-group>

</template>

<script setup>
import { Ask, Edit, Message } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { useRouter } from 'vue-router'

const router = useRouter()

const MoreItems = [
  { title: '常见问题', icon: Ask, to: '/settings/commonQA' },
  { title: '字体大小', icon: Edit, to: '/settings/fontSize' },
  { title: '联系我们', icon: Message, to: '/settings/contactUs' }
]

function naviTo(item) {
  router.push(item.to)
  Taro.setNavigationBarTitle({ title: item.title })
}

</script>

<template>
  <view>常见问题</view>
</template>
<script setup lang="ts">
import Taro from '@tarojs/taro'
import { inject, onMounted, Ref } from 'vue'

const showNavBack = inject<Ref<boolean>>('showNavBack')

onMounted(() => {
  showNavBack.value = true
  Taro.setNavigationBarTitle({ title: '常见问题' })
})

</script>
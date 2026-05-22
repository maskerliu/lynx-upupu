<template>
  <nut-navbar :title="title" :left-show="showNavBack" @click-back="goBack" :style="{ top: statusBarHeight + 'px' }"
    style="position: fixed;"></nut-navbar>
</template>
<script setup lang="ts">
import Taro from '@tarojs/taro'
import { inject, onMounted, Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const statusBarHeight = inject<Ref<number>>('statusBarHeight')

defineProps<{
  showNavBack: boolean
  title?: string
}>()

const emits = defineEmits<{
  (e: 'onNavBack')
}>()

onMounted(() => {

})

async function goBack() {
  emits('onNavBack')
  await Taro.navigateBack()
  // router.go(-1)
}

</script>
<template>
  <nut-navbar :title="title" :left-show="showNavBack" @click-back="goBack"
    :style="{ top: commonStore.statusBarHeight + 'px' }" style="position: fixed;"></nut-navbar>
</template>
<script setup lang="ts">
import { useCommonStore } from '@stores/common'
import Taro from '@tarojs/taro'
import { onMounted } from 'vue'

const commonStore = useCommonStore()

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
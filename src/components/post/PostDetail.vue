<template>

  <view>hello post detail</view>
</template>
<script setup lang="ts">
import { inject, onMounted, Ref } from 'vue'
import './PostDetail.css'

const showNavBack = inject<Ref<boolean>>('showNavBack')

onMounted(() => {
  showNavBack.value = true
  console.log('PostDetail mounted')
})
</script>
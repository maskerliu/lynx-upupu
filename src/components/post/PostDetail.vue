<template>
  <fake-page>
    <view>hello post detail</view>
  </fake-page>
</template>
<script setup lang="ts">
import { inject, onMounted, Ref } from 'vue'
import FakePage from '../../components/FakePage.vue'
import './PostDetail.css'

const showNavBack = inject<Ref<boolean>>('showNavBack')

onMounted(() => {
  showNavBack.value = true

})
</script>
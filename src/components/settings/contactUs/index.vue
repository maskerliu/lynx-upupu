<template>
  <view>联系我们</view>
</template>
<script setup lang="ts">
import { inject, onMounted, ref, Ref } from 'vue'

const showNavBack = inject<Ref<boolean>>('showNavBack')
const test = ref('test')

onMounted(() => {
  showNavBack.value = true
})

</script>
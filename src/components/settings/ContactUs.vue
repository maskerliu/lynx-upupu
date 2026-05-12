<template>
  <fake-page>
    <view>
      <nut-rate v-model="value" :custom-icon="HeartFill" active-color="skyblue" size="1.5rem" />
    </view>
  </fake-page>
</template>
<script setup lang="ts">
import { HeartFill } from '@nutui/icons-vue-taro'
import { inject, onMounted, Ref, ref } from 'vue'
import FakePage from '../../components/FakePage.vue'


const navBarHeight = inject<Ref<number>>('navBarHeight')
const navTitle = inject<Ref<string>>('navTitle')
const showNavBack = inject<Ref<boolean>>('showNavBack')
const value = ref(3)

onMounted(() => {
  showNavBack.value = true
  navTitle.value = '联系我们'
})

</script>
<template>
  <page-container :show="useBackConfirm" overlay="{{false}}" position="center" @beforeleave="handleBeforeLeave">
    <nav-bar @on-nav-back="handleBeforeLeave" />
    <view :style="{ height: `calc(100% - ${navBarHeight}px)`, marginTop: `${navBarHeight}px` }"
      style="background: var(--nut-background); overflow: hidden auto;">
      <slot :style="{ height: `calc(100vh - ${navBarHeight}px)`, background: 'var(--nut-background)' }">
      </slot>
    </view>
  </page-container>
</template>
<script setup lang="ts">
import { inject, onMounted, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showNavBack = inject<Ref<boolean>>('showNavBack')
const navBarHeight = inject<Ref<number>>('navBarHeight')

const useBackConfirm = ref(true)

onMounted(async () => {
  showNavBack.value = true
})

async function handleBeforeLeave() {
  console.log('自定义返回执行成功，页面已重置')
  useBackConfirm.value = false
  try {
    router.go(-1)
  } catch (error) {
    console.error('自定义返回失败', error)
    useBackConfirm.value = true
  }
}

</script>
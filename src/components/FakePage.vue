<template>
  <page-container :show="useBackConfirm" overlay="{{false}}" position="center" @beforeleave="handleBeforeLeave">
    <nav-bar />
    <slot :style="{ height: `calc(100vh - ${navBarHeight}px)`, background: 'var(--nut-background)' }">
    </slot>
  </page-container>
</template>
<script setup lang="ts">
import { inject, onMounted, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'

const router = useRouter()

const theme = inject<Ref<'light' | 'dark'>>('theme')
const showNavBack = inject<Ref<boolean>>('showNavBack')
const navBarHeight = inject<Ref<number>>('navBarHeight')

const useBackConfirm = ref(true)

onMounted(async () => {
  showNavBack.value = true
})

async function handleBeforeLeave() {
  useBackConfirm.value = false
  try {
    router.go(-1)
    console.log('自定义返回执行成功，页面已重置')
  } catch (error) {
    console.error('自定义返回失败', error)
    useBackConfirm.value = true
  }
}

</script>
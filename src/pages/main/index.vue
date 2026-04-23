<template>
  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <router-view></router-view>
  </nut-config-provider>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import './index.scss'

const activeTab = ref('home')
const theme = ref('light')
const themeVars = ref({
  primaryColor: '#2980b9',
  primaryColorEnd: '#3498db',
  fontSize0: '0.6rem',
  fontSize1: '0.9rem',
  fontSize2: '1rem',
  fontSize3: '1.2rem',
  fontSize4: '1.4rem'
})

const router = useRouter()

onMounted(() => {
  router.replace('/main/home')
})

</script>

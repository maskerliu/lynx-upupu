<template>
  <nut-cell is-link center>

    <template #icon>
      <image src="/assets/icon_default.png" class="user-avatar" mode="aspectFit" />
    </template>

    <template #title>
      <nut-row style="font-size: 1.2rem; font-weight: bold;">暴走的大兔子</nut-row>
      <nut-row style="margin-top: 10px;">
        <nut-tag plain round color="#16a085">
          <Ask style="padding: 2px 5px;" />
        </nut-tag>
        <nut-tag plain round color="#f39c12" style="margin-left: 10px;">
          <Edit style="padding: 2px 5px;" />
        </nut-tag>
      </nut-row>
    </template>

  </nut-cell>
</template>

<script setup lang="ts">

import { Ask, Edit } from '@nutui/icons-vue-taro'
import { onMounted } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import './UserSnap.css'

onMounted(() => {
  console.log('User mounted mounted')
})

onBeforeRouteUpdate((to, from) => {
  console.log('to:', to, 'from:', from)
})
</script>

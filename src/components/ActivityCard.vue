<template>
  <view :span="span" :offset="offset" class="activity-card">

    <image src="/assets/icon_default.png" mode="aspectFill" class="activity-image" />
    <view class="activity-content">
      <nut-ellipsis class="activity-title" :content="data ? data.title : '活动描述'"></nut-ellipsis>
      <nut-ellipsis class="activity-desc" direction="end" :content="data ? data.desc : '活动描述'"></nut-ellipsis>

    </view>
  </view>
</template>
<script setup lang="ts">

import { Activity } from 'src/common/model'
import { onMounted, ref } from 'vue'
import './ActivityCard.css'

const {
  offset = 0,
  data = null,
} = defineProps<{
  span?: number,
  offset?: number,
  data?: Activity,
}>()

const span = ref(24)

onMounted(() => {
  span.value = data ? Number(data.type.split('*')[0]) * 6 : 24

})


</script>
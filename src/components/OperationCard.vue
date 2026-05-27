<template>
  <view :span="span" :offset="offset" class="activity-card">
    <image mode="aspectFill" class="activity-image" />
    <view class="activity-content">
      <view class="activity-title">{{ data ? data.title : '活动描述' }}</view>
      <view class="activity-desc">{{ data ? data.desc : '活动描述' }}</view>
    </view>
  </view>
</template>
<script setup lang="ts">

import { Activity } from 'src/common/model'
import { onMounted, ref } from 'vue'
import './OperationCard.css'

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
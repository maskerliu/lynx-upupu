<template>
  <fake-page>
    <nut-cell>
      <image src="/assets/icon_default.png" />

      <view>User ID: {{ $route.params.id }}</view>
      <nut-row style="margin-top: 10px;">
        <nut-tag>关注</nut-tag><nut-tag>关注</nut-tag>
      </nut-row>
    </nut-cell>
    <view class="container">

    </view>
  </fake-page>
</template>
<script setup lang="ts">
import FakePage from '@components/FakePage.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {

})
</script>
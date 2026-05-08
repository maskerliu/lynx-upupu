<template>
  <fake-page>
    <view class="container">
      <nut-cell>
        <image src="/assets/icon_default.png" />

        <view>User ID: {{ $route.params.id }}</view>
        <nut-row style="margin-top: 10px;">
          <nut-tag>关注</nut-tag><nut-tag>关注</nut-tag>
        </nut-row>
      </nut-cell>
    </view>
  </fake-page>
</template>
<script setup lang="ts">
import { inject, onMounted, Ref } from 'vue'
import { useRouter } from 'vue-router'
import FakePage from '../../components/FakePage.vue'

const router = useRouter()
const showNavBack = inject<Ref<boolean>>('showNavBack')

onMounted(async () => {
  showNavBack.value = true
})
</script>
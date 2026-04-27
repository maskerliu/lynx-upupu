<template>
  <view :style="{ height: `calc(100vh - ${navBarHeight}px)` }" style="overflow: hidden auto; padding: 0 5px;">
    <nut-cell-group>
      <nut-cell title="我的作品">
        <template #desc>
          <nut-button shape="square" plain type="primary" size="small">
            <template #icon>
              <Uploader />
            </template>
          </nut-button>
        </template>
      </nut-cell>

      <nut-cell>
        <post-snap style="width: 200px; margin-right: 15px;"></post-snap>
        <post-snap style="width: 200px; margin-right: 15px;"></post-snap>
        <post-snap style="width: 200px; margin-right: 15px;"></post-snap>
      </nut-cell>
    </nut-cell-group>
  </view>
</template>
<script lang="ts" setup>
import { Uploader } from '@nutui/icons-vue-taro'
import { inject, onMounted, Ref } from 'vue'
import PostSnap from './PostSnap.vue'


const navBarHeight = inject<Ref<number>>('navBarHeight')
const showNavBack = inject<Ref<boolean>>('showNavBack')

onMounted(() => {
  showNavBack.value = true
})
</script>
<template>
  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <nav-bar style="z-index: 100;" />
    <view style="padding: 0 5px;">
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

      <nut-cell-group>
        <nut-cell style="padding: 0;">
          <Line style="width:calc(100% - 10px); height: 30vh;" />
        </nut-cell>
      </nut-cell-group>
    </view>
  </nut-config-provider>
</template>
<script lang="ts" setup>
import { Uploader } from '@nutui/icons-vue-taro'
import { inject, onMounted, Ref } from 'vue'
import Line from '../../components/Line.vue'
import NavBar from '../../components/NavBar.vue'
import PostSnap from '../../components/post/PostSnap.vue'

const showNavBack = inject<Ref<boolean>>('showNavBack')
const theme = inject<Ref<string>>('theme')
const themeVars = inject<Ref<any>>('themeVars')

onMounted(() => {
  showNavBack.value = true
})
</script>
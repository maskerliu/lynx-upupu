<template>
  <nut-skeleton :width="width + 'px'" height="15px" :loading="!loaded" title avatar avatar-size="60px" row="2"
    style="padding: 5px;">
    <nut-cell-group>
      <nut-cell is-link center title="NutUI">
        <template #icon>
          <img width="50px" height="50px" :src="snap" />
        </template>
        <div style="margin-left: 10px;">
          <div>
            一套轻量级移动端Vue组库，提供丰富的基础组件和业务组件，帮助开发者快速搭建移动应用。
          </div>

          <div style="text-align: right; margin-top: 10px;">
            <nut-button plain size="small" type="default">领神券</nut-button>
            <nut-button plain size="small" type="default" style="margin-left: 10px;">评价</nut-button>
            <nut-button plain size="small" type="warning" style="margin-left: 10px;">再来一单</nut-button>
          </div>
        </div>
      </nut-cell>
    </nut-cell-group>
  </nut-skeleton>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loaded = ref(false)
const width = Taro.getWindowInfo().screenWidth
const snap = ref('https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png')

onMounted(() => {


  setTimeout(() => {
    loaded.value = true
  }, 300)
})
</script>
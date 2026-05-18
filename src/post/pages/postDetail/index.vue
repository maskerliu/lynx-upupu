<template>
  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <nav-bar style="z-index: 100;" show-nav-back title="帖子详情" />
    <view>


    </view>

    <nut-row style="position: absolute; bottom: 0; left: 0; right: 0;">
      <nut-input placeholder="请输入评论内容" style=" padding: 5px 0; background-color: transparent;">
        <template #left>
          <Edit></Edit>
        </template>
        <template #right>
          <nut-row>
            <Follow class="post-btn" size="1.3rem" :class="isFollow ? 'post-followed' : ''"
              @click="() => { isFollow = !isFollow }" />
            <Star class="post-btn" size="1.3rem" :class="isStar ? 'post-starred' : ''"
              @click="() => { isStar = !isStar }" />
            <Share class="post-btn" size="1.3rem" />
          </nut-row>
        </template>
      </nut-input>
    </nut-row>
  </nut-config-provider>
</template>
<script setup lang="ts">
import { Edit, Follow, Share, Star } from '@nutui/icons-vue-taro'
import { inject, onMounted, Ref, ref } from 'vue'
import NavBar from '../../../components/NavBar.vue'
import { useCommonStore } from '../../../stores/common'
import './index.css'


const theme = inject<Ref<string>>('theme')
const themeVars = inject<Ref<any>>('themeVars')
const commonStore = useCommonStore()

const isFollow = ref(false)
const isStar = ref(false)

onMounted(() => {

})



</script>
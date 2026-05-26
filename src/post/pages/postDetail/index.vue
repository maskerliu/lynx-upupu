<template>
  <nut-config-provider :theme="commonStore.theme" :theme-vars="commonStore.themeVars">
    <nav-bar style="z-index: 100;" show-nav-back title="帖子详情" />
    <view :style="{
      height: `calc(100vh - ${commonStore.navBarHeight}px)`,
      padding: `${commonStore.navBarHeight}px 5px 0 5px`
    }">
    </view>

    <nut-row class="post-bottom" style="position: absolute; left: 0; right: 0;" :style="{ bottom: commontBottom }">
      <nut-input v-model:value="comment" :adjust-position="false" placeholder="请输入评论内容"
        style=" padding: 5px 0; background-color: transparent;">
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
import NavBar from '@components/NavBar.vue'
import { Edit, Follow, Share, Star } from '@nutui/icons-vue-taro'
import { useCommonStore } from '@stores/common'
import { onKeyboardHeightChange } from '@tarojs/taro'
import { onMounted, ref } from 'vue'
import './index.css'

const commonStore = useCommonStore()

const isFollow = ref(false)
const isStar = ref(false)
const commontBottom = ref('0px')

const comment = ref('')

onMounted(() => {

})

onKeyboardHeightChange((res) => {
  comment.value = res.height + 'px'
  commontBottom.value = res.height + 'px'
})



</script>
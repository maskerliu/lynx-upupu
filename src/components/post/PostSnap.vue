<template>
  <view class="post-card" @click="onClick">
    <image src="/assets/icon_default.png" mode="aspectFill" class="post-image" />
    <view class="post-tag">
      <nut-tag color="#FA685D"> 外卖 </nut-tag>
      <nut-tag plain color="#FA685D"> 20分钟 </nut-tag>
    </view>
    <view class="post-snap">
      <nut-ellipsis class="post-title" :content="data ? data.title : '茶百道(外高桥山姆店)'"></nut-ellipsis>
      <nut-ellipsis class="post-desc" :content="data ? data.snap : '高行商圈奶茶好评榜第1名'"></nut-ellipsis>
    </view>
  </view>
</template>
<script setup lang="ts">
import { Post } from 'src/common/model'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import './PostSnap.css'

const router = useRouter()

const {
  data = null,
} = defineProps<{
  data?: Post,
}>()

onMounted(() => {

})


async function onClick() {
  await router.push(`/postDetail/${data?.id}`)
}

</script>
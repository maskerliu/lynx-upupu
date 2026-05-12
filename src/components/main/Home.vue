<template>
  <scroll-view style="flex: 1; overflow: hidden auto;">
    <nut-swiper>
      <nut-swiper-item v-for="(item, index) in ADs" :key="index" style="height: 300rpx">
        <img :src="item" alt="" style="height: 100%; width: 100%" draggable="false" />
      </nut-swiper-item>
    </nut-swiper>

    <nut-skeleton width="200px" height="15px" title avatar avatar-size="60px" row="3"
      style="padding: 5px;"></nut-skeleton>

    <nut-row :gutter="5" class="activity-row"
      :style="{ height: row.height * 120 + 'rpx', width: 'calc(100vw - 20rpx)' }" v-for="row in Activities">
      <nut-col :span="col.width * 6" style="height: 100%;" v-for="col in row.cols">
        <ActivityCard :style="{
          height: `calc(${100 / col.items.length}% + ${5 / col.items.length}px - 5px)`,
          marginTop: `${idx == 0 ? 0 : 5 * col.items.length / (col.items.length - 1)}rpx`
        }" :data="item" v-for="(item, idx) in col.items" />
      </nut-col>
    </nut-row>

    <nut-row type="flex" flex-wrap="wrap" style="width: calc(100vw - 20rpx); margin: 0 10rpx;">
      <nut-col :span="12" style="margin-top: 20rpx;" v-for="(_, idx) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
        <PostSnap :data="PostData"
          :style="{ margin: `0 ${idx % 2 == 0 ? '1vw' : '0'} 0 ${idx % 2 == 0 ? '0' : '1vw'}` }" />
      </nut-col>
    </nut-row>
  </scroll-view>
</template>

<script setup lang="ts">
import Taro, { useDidShow, usePageScroll } from '@tarojs/taro'
import { onActivated, onMounted, onUnmounted, ref } from 'vue'
import { ActivityCardType, ActivityCol, ActivityRow, Post } from '../../common/model'
import ActivityCard from '../../components/ActivityCard.vue'
import PostSnap from '../../components/post/PostSnap.vue'
import './Home.css'

const activeCatergory = ref(0)
const winInfo = ref(null)

const Activities = ref<Array<ActivityRow>>([])
const ADs = ref([
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
])

const PostData = ref<Post>()

useDidShow(() => console.log('home onShow'))

usePageScroll((e => {

}))

onMounted(async () => {

  // const res = await Taro.request({
  //   url: 'https://192.168.21.77:8884/common/bizConfig/get',
  //   method: 'GET'
  // })
  // console.log(res.data)

  PostData.value = {
    id: '1',
    category: 'post',
    tag: ['外卖', '20分钟'],
    image: 'https://www.baidu.com',
    schema: 'https://www.baidu.com',
    title: 'xxx(外高桥山姆店)',
    snap: '高行商圈奶茶好评榜第1名',
  }

  Activities.value.push({
    height: 2,
    cols: [
      {
        width: 4,
        items: [
          {
            id: '1',
            title: '吃喝玩乐榜',
            image: 'https://www.baidu.com',
            schema: 'https://www.baidu.com',
            desc: '活动1的描述',
            type: ActivityCardType.C4_1,
            width: 4,
            height: 1,
          }
        ]
      },
    ]
  })

  let cols: ActivityCol[] = []
  let col: ActivityCol = {
    width: 2,
    items: [
      {
        id: '2',
        title: '免费试',
        image: 'https://www.baidu.com',
        schema: 'https://www.baidu.com',
        desc: '活动2的描述',
        type: ActivityCardType.C2_2,
      }
    ]
  }
  cols.push(col)

  col = {
    width: 2,
    items: [
      {
        id: '3',
        title: '特价团',
        image: 'https://www.baidu.com',
        schema: 'https://www.baidu.com',
        desc: '活动3的描述',
        type: ActivityCardType.C2_1,
      },
      {
        id: '4',
        title: '严选好物',
        image: 'https://www.baidu.com',
        schema: 'https://www.baidu.com',
        desc: '省时美味',
        type: ActivityCardType.C2_1,
      },
      {
        id: '4',
        title: '严选好物',
        image: 'https://www.baidu.com',
        schema: 'https://www.baidu.com',
        desc: '省时美味',
        type: ActivityCardType.C2_1,
      }
    ]
  }
  cols.push(col)
  Activities.value.push({ height: 4, cols })


  cols = []
  col = {
    width: 1,
    items: [
      {
        id: '5',
        title: '活动5',
        image: 'https://www.baidu.com',
        schema: 'https://www.baidu.com',
        desc: '活动5的描述',
        type: ActivityCardType.C1_2,
      }
    ]
  }
  cols.push(col)

  col = {
    width: 1,
    items: [
      {
        id: '6',
        title: '时令上新',
        image: 'https://www.baidu.com',
        schema: 'https://www.baidu.com',
        desc: '0元体验',
        type: ActivityCardType.C1_2,
      }
    ]
  }
  cols.push(col)

  col = {
    width: 1,
    items: [
      {
        id: '5',
        title: '时令上新',
        image: 'https://www.baidu.com',
        schema: 'https://www.baidu.com',
        desc: '0元体验',
        type: ActivityCardType.C1_2,
      }
    ]
  }
  cols.push(col)

  col = {
    width: 1,
    items: [
      {
        id: '5',
        title: '时令上新',
        image: 'https://www.baidu.com',
        schema: 'https://www.baidu.com',
        desc: '0元体验',
        type: ActivityCardType.C1_2,
      }
    ]
  }
  cols.push(col)
  Activities.value.push({ height: 2, cols })

  activeCatergory.value = 0
  try {
    winInfo.value = Taro.getWindowInfo()
  } catch (error) {
    console.warn('获取系统信息失败', error)
    winInfo.value = { windowHeight: 667 }
  }
})

onActivated(() => {

})


onUnmounted(() => {

})


</script>

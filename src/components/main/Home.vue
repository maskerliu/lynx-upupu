<template>
  <view :style="{ height: `calc(100% - ${navBarHeight}px)` }" style="overflow: hidden auto;">
    <nut-swiper>
      <nut-swiper-item v-for="(item, index) in ADs" :key="index" style="height: 150px">
        <img :src="item" alt="" style="height: 100%; width: 100%" draggable="false" />
      </nut-swiper-item>
    </nut-swiper>

    <nut-row :gutter="5" class="activity-row" :style="{ height: row.height * 60 + 'px' }" v-for="row in Activities">
      <nut-col :span="col.width * 6" style="height: 100%;" v-for="col in row.cols">
        <ActivityCard :style="{
          height: `calc(${100 / col.items.length}% + ${5 / col.items.length}px - 5px)`,
          marginTop: `${idx == 0 ? 0 : 2.5 * col.items.length / (col.items.length - 1)}px`
        }" :data="item" v-for="(item, idx) in col.items" />
      </nut-col>
    </nut-row>

    <Line />

    <scroll-view scroll-y>
      <nut-row type="flex" flex-wrap="wrap" style="width: 98vw; margin: 0 5px;">
        <nut-col :span="12" style="margin-top: 2vw;" v-for="(item, idx) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
          <PostSnap :data="PostData"
            :style="{ margin: `0 ${idx % 2 == 0 ? '1vw' : '0'} 0 ${idx % 2 == 0 ? '0' : '1vw'}` }" />
        </nut-col>
      </nut-row>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import { inject, onActivated, onMounted, onUnmounted, ref } from 'vue'
import { ActivityCardType, ActivityCol, ActivityRow, Post } from '../../common/model'
import ActivityCard from '../../components/ActivityCard.vue'
import Line from '../../components/Line.vue'
import PostSnap from '../../components/post/PostSnap.vue'
import './Home.scss'

const navBarHeight = inject('navBarHeight', 0)
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
    title: '茶百道(外高桥山姆店)',
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
  // console.log('Home activated')
})


onUnmounted(() => {
  // console.log('Home unmounted')
})

function onScrollBottom() {
  // let arr = new Array(100).fill(0)
  // const len = data.value.length
  // data.value = data.value.concat(arr.map((_, index) => len + index + 1))
}



</script>

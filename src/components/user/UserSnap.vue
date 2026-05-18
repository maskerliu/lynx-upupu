<template>
  <nut-cell is-link center @click="handleGetUserInfo">

    <template #icon>
      <nut-avatar size="large">
        <My v-if="userInfo.avatarUrl == ''" />
        <img v-else :src="userInfo.avatarUrl" mode="aspectFit" />
      </nut-avatar>
    </template>

    <template #title>
      <nut-row style="font-size: var(--nut-font-size-2); font-weight: bold;">暴走的大兔子</nut-row>
      <nut-row style="margin-top: 10px;">
        <nut-tag plain round color="#16a085">
          <People style="padding: 2px 5px;" />
        </nut-tag>
        <nut-tag plain round color="#f39c12" style="margin-left: 10px;">
          <Shop style="padding: 2px 5px;" />
        </nut-tag>
        <nut-tag plain round color="#f39c12" style="margin-left: 10px;">
          <Jdl style="padding: 2px 5px;" />
        </nut-tag>
      </nut-row>
    </template>

    <template #link>
      <Edit style="padding: 2px 5px;" />
    </template>

  </nut-cell>
  <login ref="loginRef" />
</template>

<script setup lang="ts">

import { Edit, Jdl, My, People, Shop } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { onMounted, ref, useTemplateRef } from 'vue'
import Login from './Login.vue'
import './UserSnap.css'

const login = useTemplateRef<typeof Login>('loginRef')
const userInfo = ref({
  nickName: '',
  avatarUrl: '/assets/icon_default.png'
})

onMounted(() => {
  loadUserInfo()
})


function loadUserInfo() {
  try {
    const savedUserInfo = Taro.getStorageSync('user_info')
    if (savedUserInfo) {
      userInfo.value = savedUserInfo
    }
  } catch (error) {
    console.error('加载用户信息失败', error)
  }
}

async function handleGetUserInfo() {
  login.value.show()

  return
  try {
    const profile = await Taro.getUserProfile({
      desc: '用于完善会员资料'
    })

    userInfo.value = {
      nickName: profile.userInfo.nickName,
      avatarUrl: profile.userInfo.avatarUrl
    }

    Taro.setStorageSync('user_info', userInfo.value)

    Taro.showToast({
      title: '获取成功',
      icon: 'success'
    })
  } catch (error) {
    console.error('获取用户信息失败', error)

    if (error.errMsg && error.errMsg.includes('getUserProfile:fail')) {
      Taro.showModal({
        title: '提示',
        content: '您需要授权才能获取头像和昵称',
        confirmText: '去授权',
        success: (res) => {
          if (res.confirm) {
            openSetting()
          }
        }
      })
    } else {
      Taro.showToast({
        title: '获取失败，请重试',
        icon: 'none'
      })
    }
  }
}

function openSetting() {
  Taro.openSetting({
    success: (res) => {
      if (res.authSetting['scope.userInfo']) {
        handleGetUserInfo()
      }
    }
  })
}

</script>

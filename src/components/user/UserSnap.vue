<template>
  <nut-cell is-link center @click="handleGetUserInfo" style="margin-top: 42px;">

    <template #icon>
      <nut-avatar size="large">
        <My v-if="commonStore.accessToken == null" style="font-size: 2rem;" />
        <img v-else :src="commonStore.userInfo.avatar" mode="aspectFit" />
      </nut-avatar>
    </template>

    <template #title>
      <nut-row style="font-size: var(--nut-font-size-2); font-weight: bold;">
        {{ commonStore.accessToken == null ? '请登录' : commonStore.userInfo.name }}
      </nut-row>
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
      <Edit style="padding: 2px 5px; font-size: 1.5rem;" />
    </template>

  </nut-cell>
  <login ref="loginRef" />
</template>

<script setup lang="ts">

import { Edit, Jdl, My, People, Shop } from '@nutui/icons-vue-taro'
import { useCommonStore } from '@stores/common'
import Taro from '@tarojs/taro'
import { onMounted, useTemplateRef } from 'vue'
import Login from './Login.vue'
import './UserSnap.css'

const login = useTemplateRef<typeof Login>('loginRef')

const commonStore = useCommonStore()

onMounted(() => {

})

async function handleGetUserInfo() {
  if (commonStore.accessToken == null) {
    login.value.show()
  } else {
    await Taro.navigateTo({
      url: '/pages/userProfile/index'
    })
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

<template>
  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <nav-bar style="z-index: 100;" show-nav-back title="联系我们" />
    <view style="overflow: hidden auto;" :style="{ height: `calc(100vh)`, paddingTop: navBarHeight + 'px' }">
      <view class="header-section">
        <view class="header-icon">
          <Issue size="48" color="#fff" />
        </view>
        <view class="header-title">联系客服</view>
        <view class="header-desc">7×24小时在线服务</view>
      </view>

      <nut-cell-group style="margin: 10px;">
        <nut-cell title="客服热线" value="400-888-8888" is-link @click="handleCall">
          <template #icon>
            <Github style="margin-right: 5px;" />
          </template>
        </nut-cell>
        <nut-cell title="客服邮箱" value="support@example.com" is-link @click="handleEmail">
          <template #icon>
            <Ask style="margin-right: 5px;" />
          </template>
        </nut-cell>
      </nut-cell-group>

      <nut-cell-group style="margin: 10px">
        <nut-cell title="意见反馈" is-link @click="handleFeedback">
          <template #icon>
            <Edit style="margin-right: 5px;" />
          </template>
        </nut-cell>
      </nut-cell-group>

      <view class="footer-section">
        <view class="footer-link">{{ '<<软件许可及服务协议>>' }}</view>
        <view style="display: flex; justify-content: center;">
          <view class="footer-link">{{ '<<隐私政策>>' }}</view>
          <view class="footer-link" style="margin-left: 5px;">{{ '<<常见问题>>' }}</view>
        </view>
        <view class="footer-phone">客服电话：400-888-8888</view>
        <view class="footer-version">v1.0.0</view>
      </view>
    </view>
  </nut-config-provider>
</template>
<script setup lang="ts">
import NavBar from '@components/NavBar.vue'
import { Ask, Edit, Github, Issue } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { inject, onMounted, Ref, ref } from 'vue'
import './index.css'

const navBarHeight = inject<Ref<number>>('navBarHeight')
const theme = inject<Ref<string>>('theme')
const themeVars = inject<Ref<any>>('themeVars')

const value = ref(3)

onMounted(() => {

})

function handleCall() {
  Taro.makePhoneCall({
    phoneNumber: '400-888-8888',
    fail: () => {
      Taro.showToast({ title: '拨打失败', icon: 'none' })
    }
  })
}
function handleEmail() {
  Taro.setClipboardData({
    data: 'support@example.com',
    success: () => {
      Taro.showToast({ title: '邮箱已复制', icon: 'none' })
    }
  })
}
function handleCopyWechat() {
  Taro.setClipboardData({
    data: 'upupu_life',
    success: () => {
      Taro.showToast({ title: '微信公众号已复制', icon: 'none' })
    }
  })
}

async function handleFeedback() {
  await Taro.navigateTo({ url: '/settings/pages/feedback/index' })
}

function handleFAQ() {
  Taro.navigateTo({ url: '/settings/pages/commonQA/index' })
}

</script>
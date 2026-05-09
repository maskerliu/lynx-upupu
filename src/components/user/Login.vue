<template>

  <nut-popup v-model:visible="visible" style="width: 90vw; background: transparent;">
    <nut-form>
      <nut-form-item label-width="3rem">
        <template #label>
          <text>手机号</text>
        </template>
        <nut-input v-model="phoneNumber" placeholder="请输入手机号" type="number" :maxLength="11" :border="false"
          class="input-field" />
      </nut-form-item>
      <nut-form-item label-width="3rem">
        <template #label>
          <text>验证码</text>
        </template>
        <nut-input v-model="verifyCode" placeholder="请输入验证码" type="number" :maxLength="6" :border="false"
          class="input-field">
          <template #right>
            <nut-button size="small" type="primary" plain :disabled="isCountingDown" @click="sendCode" class="code-btn">
              {{ codeButtonText }}
            </nut-button>
          </template>
        </nut-input>
      </nut-form-item>
      <nut-form-item class="agreement">
        <nut-checkbox v-model="agreeTerms">
          我已阅读并同意
          <text class="link">《用户协议》</text>
          和
          <text class="link">《隐私政策》</text>
        </nut-checkbox>
      </nut-form-item>

      <nut-form-item>
        <nut-button type="primary" block :loading="isLogging" :disabled="!canLogin" @click="handleLogin"
          style="width: calc(90vw - 40px); margin: 0 auto;">
          登录
        </nut-button>
      </nut-form-item>
    </nut-form>
  </nut-popup>
</template>
<script setup lang="ts">
import Taro from '@tarojs/taro'
import { computed, onMounted, ref } from 'vue'

// 暴露方法给父组件
const emit = defineEmits(['loginSuccess'])
defineExpose({ show, hide })

const visible = ref(false)
const phoneNumber = ref('')
const verifyCode = ref('')
const isCountingDown = ref(false)
const countdown = ref(60)
const isLogging = ref(false)
const agreeTerms = ref(false)



const codeButtonText = computed(() => {
  return isCountingDown.value ? `${countdown.value}秒后重发` : '获取验证码'
})

const canLogin = computed(() => {
  return phoneNumber.value.length === 11 &&
    verifyCode.value.length === 6 &&
    agreeTerms.value &&
    !isLogging.value
})

onMounted(() => {
  console.log('Login mounted')
})

function sendCode() {
  if (!validatePhone()) {
    return
  }

  if (isCountingDown.value) {
    return
  }

  isCountingDown.value = true
  countdown.value = 60

  // 模拟发送验证码
  Taro.showLoading({ title: '发送中...' })

  setTimeout(() => {
    Taro.hideLoading()
    Taro.showToast({
      title: '验证码已发送',
      icon: 'success'
    })
    startCountdown()
  }, 1000)
}

function startCountdown() {
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      isCountingDown.value = false
      countdown.value = 60
    }
  }, 1000)
}

function validatePhone() {
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(phoneNumber.value)) {
    Taro.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return false
  }
  return true
}

function handleLogin() {
  if (!canLogin.value) {
    return
  }

  if (!validatePhone()) {
    return
  }

  isLogging.value = true

  // 模拟登录请求
  Taro.showLoading({ title: '登录中...' })

  setTimeout(() => {
    Taro.hideLoading()

    // 模拟登录成功
    Taro.setStorageSync('user_token', 'mock_token_123456')
    Taro.setStorageSync('user_phone', phoneNumber.value)

    Taro.showToast({
      title: '登录成功',
      icon: 'success'
    })

    visible.value = false
    isLogging.value = false

    // 触发登录成功事件
    emit('loginSuccess', {
      phone: phoneNumber.value,
      token: 'mock_token_123456'
    })
  }, 1500)
}

function show() {
  visible.value = true
}

function hide() {
  visible.value = false
}



</script>
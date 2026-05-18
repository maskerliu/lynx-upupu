import { createApp, ref } from 'vue'
import { createMemoryHistory, createRouter } from "vue-router"

import "@nutui/nutui-taro/dist/style.css"
import Taro from '@tarojs/taro'
import { createPinia } from 'pinia'
import './app.css'
import Find from './components/main/Find.vue'
import Home from './components/main/Home.vue'
import Main from './components/main/Main.vue'
import More from './components/main/More.vue'


const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main/home'
    },
    {
      path: '/main',
      component: Main,
      name: 'Main',
      meta: { keepAlive: true },
      children: [
        { path: 'home', component: Home, meta: { keepAlive: true } },
        { path: 'find', component: Find, meta: { keepAlive: true } },
        { path: 'more', component: More, meta: { keepAlive: true } },
      ]
    },
  ],
})

const app = createApp({
  onShow() {
    initNavBarHeight()
  },
})

const showKeyboard = ref(false)
const numberInput = ref('')

const statusBarHeight = ref(0)
const navBarHeight = ref(0)
const theme = ref('light')
const themeVars = ref({
  primaryColor: '#2980b9',
  primaryColorEnd: '#3498db',
})

app.provide('showKeyboard', showKeyboard)
app.provide('numberInput', numberInput)
app.provide('statusBarHeight', statusBarHeight)
app.provide('navBarHeight', navBarHeight)
app.provide('theme', theme)
app.provide('themeVars', themeVars)

app.use(createPinia())
app.use(router)

function initNavBarHeight() {
  const winInfo = Taro.getWindowInfo()
  const dpr = winInfo.pixelRatio || 1
  const menuBtnInfo = Taro.getMenuButtonBoundingClientRect()

  statusBarHeight.value = menuBtnInfo.top - (44 - menuBtnInfo.height) / 2
  navBarHeight.value = statusBarHeight.value + 44
}

export default app

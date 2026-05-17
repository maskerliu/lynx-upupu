import { createApp, ref } from 'vue'
import { createMemoryHistory, createRouter } from "vue-router"

import "@nutui/nutui-taro/dist/style.css"
import { loadEcharts } from 'echarts4taro3'
import { createPinia } from 'pinia'
import './app.css'
import * as echarts from './components/echarts'
import Find from './components/main/Find.vue'
import Home from './components/main/Home.vue'
import Main from './components/main/Main.vue'
import More from './components/main/More.vue'
import UserProfile from './components/user/UserProfile.vue'

try {
  loadEcharts(echarts)
} catch (e) {
  console.log('echarts error', e)
}

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
    { path: '/user/profile', component: UserProfile },
  ],
})

const app = createApp({
  onShow() { console.log('App Show') },
})

const showKeyboard = ref(false)
const numberInput = ref('')

const navBarHeight = ref(0)
const navTitle = ref('')
const theme = ref('light')
const showNavBack = ref(false)
const themeVars = ref({
  primaryColor: '#2980b9',
  primaryColorEnd: '#3498db',
})

app.provide('showKeyboard', showKeyboard)
app.provide('numberInput', numberInput)
app.provide('navBarHeight', navBarHeight)
app.provide('navTitle', navTitle)
app.provide('showNavBack', showNavBack)
app.provide('theme', theme)
app.provide('themeVars', themeVars)

app.use(createPinia())
app.use(router)

export default app

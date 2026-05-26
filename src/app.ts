import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from "vue-router"

import Find from '@components/main/Find.vue'
import Home from '@components/main/Home.vue'
import More from '@components/main/More.vue'
import "@nutui/nutui-taro/dist/style.css"
import { createPinia } from 'pinia'
import './app.css'
import { useCommonStore } from './stores/common'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main/home'
    },
    {
      path: '/main',
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
    const commonStore = useCommonStore()
    commonStore.init()
  },
})

app.use(createPinia())
app.use(router)

export default app

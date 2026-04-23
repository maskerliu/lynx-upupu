import '@nutui/icons-vue-taro/dist/style_iconfont.css'
import NutUI from "@nutui/nutui-taro"
import "@nutui/nutui-taro/dist/style.css"
import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router"
import './app.css'
import CommonQA from './components/settings/commonQA/index.vue'
import ContactUs from './components/settings/contactUs/index.vue'
import FontSize from './components/settings/fontSize/index.vue'
import Find from './pages/main/Find.vue'
import Home from './pages/main/Home.vue'
import Main from './pages/main/Main.vue'
import More from './pages/main/More.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main/home'
    },
    {
      path: '/main',
      component: Main,
      children: [
        { path: 'home', component: Home },
        { path: 'find', component: Find },
        { path: 'more', component: More },
      ]
    },
    { path: '/settings/fontSize', component: FontSize },
    { path: '/settings/contactUs', component: ContactUs },
    { path: '/settings/commonQA', component: CommonQA },
  ]
})

const App = createApp({
  onShow() { },
})

App.use(NutUI)
App.use(router)

export default App

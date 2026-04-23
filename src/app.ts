import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from "vue-router"

import NutUI, { ConfigProvider } from "@nutui/nutui-taro"
import "@nutui/nutui-taro/dist/style.css"

import './app.css'
import Find from './components/main/Find.vue'
import Home from './components/main/Home.vue'
import Main from './components/main/Main.vue'
import More from './components/main/More.vue'
import MyOrder from './components/order/MyOrder.vue'
import MyPost from './components/post/MyPost.vue'
import PostDetail from './components/post/PostDetail.vue'
import CommonQA from './components/settings/CommonQA.vue'
import ContactUs from './components/settings/ContactUs.vue'
import FontSize from './components/settings/FontSize.vue'
import UserProfile from './components/user/UserProfile.vue'

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
    { path: '/settings/fontSize', component: FontSize },
    { path: '/settings/contactUs', component: ContactUs },
    { path: '/settings/commonQA', component: CommonQA },
    { path: '/postDetail/:id', component: PostDetail },
    { path: '/user/profile', component: UserProfile },
    { path: '/post/myPost', component: MyPost },
    { path: '/order/myOrder', component: MyOrder },
  ],
})

const App = createApp({
  onShow() { },
})

App.use(NutUI)
App.use(ConfigProvider)
App.use(router)

export default App


import Taro from '@tarojs/taro'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      instance: Math.random(),
      theme: 'light',
      themeVars: {
        primaryColor: '#2980b9',
        primaryColorEnd: '#3498db',
        'font-size-0': '13px',
        'font-size-1': '14px',
        'font-size-2': '16px',
        'font-size-3': '20px',
        'font-size-4': '22px',
        'font-size-5': '24px',
      },
      fontSize: 16,
      statusBarHeight: 0,
      navBarHeight: 0,
      showKeyboard: false,
      numberInput: '',
      scrollTop: {}, // {key:string, scrollTop: number}
      userInfo: {
        name: '',
        phone: '',
        avatar: '',
      },
      accessToken: null,
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    init() {
      const winInfo = Taro.getWindowInfo()
      const dpr = winInfo.pixelRatio || 1
      const menuBtnInfo = Taro.getMenuButtonBoundingClientRect()

      this.statusBarHeight = menuBtnInfo.top - (44 - menuBtnInfo.height) / 2
      this.navBarHeight = this.statusBarHeight + 44

      this.accessToken = Taro.getStorageSync('access_token') || null
      this.userInfo = Taro.getStorageSync('user_info') || { name: '', phone: '', avatar: '' }

      this.fontSize = Taro.getStorageSync('app_font_size') || 16

      this.themeVars = Object.assign(this.themeVars, {
        'font-size-0': `${this.fontSize - 3}px`,
        'font-size-1': `${this.fontSize - 2}px`,
        'font-size-2': `${this.fontSize}px`,
        'font-size-3': `${this.fontSize + 2}px`,
        'font-size-4': `${this.fontSize + 4}px`,
        'font-size-5': `${this.fontSize + 8}px`,
      })

      this.theme = Taro.getStorageSync('app_theme') || 'light'
    },
    async login(phone: string, verifyCode: string) {
      this.accessToken = 'akeana314113kl0'
      this.userInfo = {
        name: '暴走的兔子',
        phone,
        avatar: 'https://c-ssl.duitang.com/uploads/item/201403/21/20140321180046_kjW3f.jpeg',
      }

      Taro.setStorageSync('access_token', this.accessToken)
      Taro.setStorageSync('user_info', this.userInfo)
    },
    setFontSize(fontSize: number) {
      this.fontSize = fontSize
      Taro.setStorageSync('app_font_size', fontSize)

      this.themeVars = Object.assign(this.themeVars, {
        'font-size-0': `${this.fontSize - 3}px`,
        'font-size-1': `${this.fontSize - 2}px`,
        'font-size-2': `${this.fontSize}px`,
        'font-size-3': `${this.fontSize + 2}px`,
        'font-size-4': `${this.fontSize + 4}px`,
        'font-size-5': `${this.fontSize + 8}px`,
      })
    },
    setTheme(theme: string) {
      this.theme = theme

      Taro.setStorageSync('app_theme', theme)
    },
    async logout() {

      this.accessToken = null
      this.userInfo = {
        name: '',
        phone: '',
        avatar: '',
      }
    },
  },
})
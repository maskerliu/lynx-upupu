
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      instance: Math.random(),
      scrollTop: {}, // {key:string, scrollTop: number}
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {

    },
  },
})
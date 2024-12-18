import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      isCollapse: false,
      menuList: []
    }
  },
  actions: {
    changeMenuState() {
      // 取反
      // console.log('我取反啦')
      this.isCollapse = !this.isCollapse
    },
    addMenuList(payload) {
      // console.log('@', this.menuList)
      if (!this.menuList.find(item => item.meta.path === payload.meta.path)) {
        this.menuList.push(payload)
      }
    },
    deleteMenuList(payload) {
      // filter不行啊，为啥呢？？
      // 使用 filter 时，直接赋值会导致响应性丧失。要么使用 splice 直接修改原数组，要么确保在使用 ref 时正确使用 .value 进行赋值。
      // this.menuList = this.menuList.filter((item) => {
      //   return item.meta.name !== payload.meta.name
      // })
      const Index = this.menuList.findIndex((item) => item.meta.name === payload.meta.name)
      this.menuList.splice(Index, 1)
      console.log('删除', this.menuList)
    }
  }
})
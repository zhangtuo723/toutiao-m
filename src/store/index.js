import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from "@/utils/storage"

Vue.use(Vuex)

const TOKEN_KEY= "TOUTIAO_USER"
export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息（token等数据）
    user:getItem(TOKEN_KEY)
    // user:JSON.parse(window.localStorage.getItem(TOKEN_KEY))
  },
  getters: {
  },
  mutations: {
    setUser(state,data){
      state.user = data
      // 为了防止刷新清空，进行备份
      // window.localStorage.setItem(TOKEN_KEY,JSON.stringify(data))
      setItem(TOKEN_KEY,data)
    }
  },
  actions: {
  },
  modules: {
  }
})

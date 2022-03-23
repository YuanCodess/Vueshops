import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    token:"" //存储token
  },
  mutations: {
    setToken(state,v){
        state.token = v
        sessionStorage.setItem("token",state.token)
    }
  },
  actions: {
    // 异步修改状态的方法
  },
  modules: {
  },
  getters:{

  }
})

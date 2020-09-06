import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations' // 将mutations单独抽离
import actions from './actions'  // 将actions单独抽离
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 图片加载
    imgLoadNum:0,

    // 保存商品数据
    cartList: []
  },
  // 修改数据
  mutations,
  actions,
  getters,
  modules: {
  }
})

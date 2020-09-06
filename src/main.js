import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import animated from 'assets/css/animate.css'

// 解决移动端点击事件300ms延迟
// 先安装 fastclick  npm install fastclick --save

// 引入 fastclick
import Fastclick from 'fastclick'

import toast from 'components/common/toast'  // 引入组件的 js 文件

// 调用 attach 方法 作用于 body 上
Fastclick.attach(document.body)

// toast 安装
Vue.use(toast)

// 安装 animated 插件
Vue.use(animated)

Vue.config.productionTip = false

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})

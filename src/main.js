import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

// 解决移动端点击事件300ms延迟
// 先安装 fastclick  npm install fastclick --save
// 引入 fastclick
import Fastclick from 'fastclick'

// 图片懒加载插件 VueLazyLoad
// 需要用到图片的时候才会进行加载 节省用户流量
// 先安装 npm install vue-lazyload --save
// 引入
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'  // 引入组件的 js 文件

// 调用 attach 方法 作用于 body 上
Fastclick.attach(document.body)

// 安装 VueLazyLoad
Vue.use(VueLazyLoad,{
  loading: require("./assets/img/common/timg.gif")
})

// toast 安装
Vue.use(toast)

Vue.config.productionTip = false

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})

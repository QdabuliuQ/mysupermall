
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入插件
Vue.use(VueRouter)
// 路由懒加载  引入各个组件
const home = () => import ('views/home/Home.vue')
const classify = () => import ('views/classify/Classify.vue')
const cart = () => import ('views/cart/Cart.vue')
const profile = () => import ('views/proflie/Proflie.vue')

// 定义路由规则
const routes = [
  // 路由重定向
  { path: '/', redirect: '/home' },
  { path: '/home', component:home },
  { path: '/classify', component:classify },
  { path: '/cart', component:cart },
  { path: '/profile', component:profile }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

// 导出路由对象
export default router
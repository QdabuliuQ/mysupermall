
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入插件
Vue.use(VueRouter)
// 路由懒加载  引入各个组件
const home = () => import ('views/home/Home.vue') // 首页页面
const classify = () => import ('views/classify/Classify.vue') // 分类页面
const cart = () => import ('views/cart/Cart.vue') // 购物车页面
const profile = () => import ('views/proflie/Proflie.vue')  // 个人页面
const detail = () => import ('views/detail/Detail.vue')  // 详情页面

// 定义路由规则
const routes = [
  // 路由重定向
  { path: '/', redirect: '/home' },
  { path: '/home', component:home },
  { path: '/classify', component:classify },
  { path: '/cart', component:cart },
  { path: '/profile', component:profile },
  // 详情页面传递参数
  { path: '/detail/:iid', component: detail }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

// 导出路由对象
export default router
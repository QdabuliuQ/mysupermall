<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
    <!-- 父组件 -->
    <tabbar>
      <!-- 子组件 -->
      <!-- 给每一个组件的 path 属性 设置指定路由地址 -->
      <tabbaritem path='/home' activeColor='red'>
        <!-- 指定 slot 放入对应的插槽中 -->
        <img slot="item-icon" src="~assets/img/tabbarImg/index.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbarImg/indexactive.png" alt="">
        <div slot="item-text">首页</div>
      </tabbaritem>
      <tabbaritem path='/classify' activeColor='red'>
        <img slot="item-icon" src="~assets/img/tabbarImg/classify.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbarImg/classifyactive.png" alt="">
        <div slot="item-text">分类</div>
      </tabbaritem>
      <tabbaritem path='/cart' activeColor='red'>
        <img slot="item-icon" src="~assets/img/tabbarImg/che-copy.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbarImg/che-copyactive.png" alt="">
        <div slot="item-text">购物车</div>
      </tabbaritem>
      <tabbaritem path='/profile' activeColor='red'>
        <img slot="item-icon" src="~assets/img/tabbarImg/wode-r-selected.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbarImg/wode-r-selectedactive.png" alt="">
        <div slot="item-text">我的</div>
      </tabbaritem>
    </tabbar>
  </div>
</template>

<script>
// 引入 底部导航栏 组件
import tabbar from 'components/common/tabbar/tabbar'
// 底部导航栏子组件
import tabbaritem from 'components/common/tabbar/tabbaritem'

export default {
  name:'App',
  // 注册组件
  components: {
    tabbar,
    tabbaritem
  }
}
</script>

<style scoped>
  /* 通过别名引用文件 */
  @import 'assets/css/base.css';
</style>

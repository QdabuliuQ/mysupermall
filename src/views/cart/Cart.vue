<template>
    <div class="Cart">
        <nav-bar class="navbar">
            <!-- 调用 vuex 中 getters 中的方法 -->
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <cart-goods-list></cart-goods-list>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/navbar'  // 顶部导航栏组件
// import bottomNav from './childrenComps/CartBottomNav'  // 底部导航栏组件
import CartGoodsList from './childrenComps/CartGoodsList'   // 商品展示组件

import {mapGetters} from 'vuex'  // 导入 mapGetters 函数
// mapGetters 会将 vuex 中的 getters 计算属性导出
export default {
    name:'Cart',
    components: {
        NavBar,
        CartGoodsList,
    },
    computed: {
        // ... 数组解构
        // 调用 mapGetters 传入需要调用的 getters 中的方法
        // 写法一： 数组传参
        ...mapGetters(['cartLength'])

        // 写法二： 对象
        // ...mapGetters({
        //     length: 'cartLength'  通过 length 获取计算属性
        // })
    },
    data () {
        return {    
        }
    },
    methods: {
    }
}
</script>

<style scoped>
    .navbar{
        background-color: rgb(226, 81, 81);
        color: #fff;
        position: relative;
        z-index: 9;
    }
    .Cart{
        height: 100vh;
    }
    
</style>
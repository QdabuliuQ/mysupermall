<template>
    <div id="home">
        <navbar class="home-nav">
            <!-- 将替换的文件 放入指定的具名插槽中 -->
            <div slot="center">购物街</div>
        </navbar>
        <!-- 父组件传值给子组件 用属性绑定的方式 -->
        <home-swiper :homeBannerImg="homeBannerImg"></home-swiper>
    </div>
</template>

<script>
// 引入顶部导航栏
import navbar from 'components/common/navbar/navbar.vue'

// 引入轮播图组件
import homeSwiper from './childrenComps/homeSwiper'

// 引入 network 网络请求 js
import {getHomeMultidata} from 'network/home'

export default {
    name:'Home',
    data () {
        return {
            // 保存轮播图数据
            homeBannerImg:[]
        }
    },
    // 注册组件
    components: {
        navbar,
        homeSwiper
    },

    // 生命周期函数  在数据生效的时候发送网络请求
    // 调用方法
    created () {
        getHomeMultidata().then( response => {
            this.homeBannerImg = response.data.data.banner.list;
        })
    }   
}
</script>

<style scoped>
    .home-nav {
        background-color: rgb(226, 81, 81);
        color: #fff;
    }
</style>
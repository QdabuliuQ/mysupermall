<template>
    <div id="home">
        <!-- 顶部导航栏 -->
        <navbar class="home-nav">
            <!-- 将替换的文件 放入指定的具名插槽中 -->
            <div slot="center">购物街</div>
        </navbar>
        <!-- 使用一个假的 tabControl 完成吸顶效果 -->
        <tabControl
            class=""
            :title="['新款','流行','精选']"
            @tabGoods='tabGoods'
            ref="tabControl1"
            v-show="tabIsShow"></tabControl>
        
        <!-- 滚动组件 -->
        <bscroll class="content"
         ref="toTop" 
         :probeType="3"
         @homeBackTop="homeBackTop"
         :pullUpLoad="true"
         @homePullUp="homePullUp">
            <!-- 父组件传值给子组件 用属性绑定的方式 -->
            <!-- 轮播图组件 -->
            <home-swiper 
            :homeBannerImg="homeBannerImg"
            @swiperImgLoad="swiperImgLoad"></home-swiper>
            <!-- 推荐组件 -->
            <home-recommend :recommend="recommend"></home-recommend>
            <!-- 推荐组件 -->
            <home-featuer></home-featuer>
            <!-- tab选项卡 -->
            <tabControl
            class="tab-control"
            :title="['新款','流行','精选']"
            @tabGoods='tabGoods'
            ref="tabControl"></tabControl>

            <!-- 将 goods 中的数据传递给子组件 -->
            <!-- 商品信息 -->
            <goods-list :goods='goods[strGoods].list'></goods-list>
        </bscroll>

        <!-- 返回顶部 -->
        <transition name="" mode="">
            <back-top @click.native='backTopClick' v-show="backTopIsShow"></back-top>
        </transition>
    </div>
</template>

<script>

import navbar from 'components/common/navbar/navbar.vue' // 引入顶部导航栏
import homeSwiper from './childrenComps/homeSwiper' // 引入轮播图组件
import homeRecommend from './childrenComps/homeRecommend' // 引入 推荐 组件
import homeFeatuer from './childrenComps/homeFeature' // 引入 推荐2 组件
import tabControl from 'components/context/tabControl/TabControl' // 引入 tab 选项卡
import goodsList from 'components/context/goods/goodsList' // 商品信息组件
import BackTop from 'components/context/backTop/BackTop'  // 返回顶部组件


import {getHomeMultidata,getHomeGoods} from 'network/home'  // 引入 network 网络请求 js
import Bscroll from 'components/common/bscroll/Bscroll'  // 引入滚动组件


export default {
    name:'Home',
    data () {
        return {
            // 保存轮播图数据
            homeBannerImg:[],
            // 保存推荐数据
            recommend:[],

            // 保存商品数据
            goods:{
                // 流行数据
                pop:{ page:0, list:[] },
                // 新款数据
                new:{ page:0, list:[] },
                // 精选数据
                sell:{ page:0, list:[] },
            },
            
            // 定义变量来对应显示 那个模块的 商品信息
            strGoods:'pop',

            // 控制返回顶部按钮的显示/隐藏
            backTopIsShow:false,

            // homeImgLoad: this.$store.state.imgLoadBool
            homeImgBool: null,

            // 保存 tabControl 到顶部的距离
            tabOffestTop:0,

            // 显示/隐藏 tabControl
            tabIsShow:false,

            // 保存home组件被切换时 上一次的位置
            saveY:0
        }
    },
    computed: {
        // homeImgLoad 监听 vuex 中的数据改变
        homeImgLoad() {
            // 保存 vuex 中的数据
            return this.$store.state.imgLoadNum
        }
    },
    watch: {
        // 监听计算属性  修改一次就调用 Better-Scroll 重新计算高度
        homeImgLoad: function() {
            // 通过 $refs 调用 Better-Scroll 中的 refresh方法 重新计算高度
            // 判断 homeImgLoad 的图片加载了 13 张或者 26 张的时候 重新计算滚动高度
            // 避免多次不必要的计算高度
            if(this.homeImgLoad === 13 || this.homeImgLoad === 26){
                this.$refs.toTop.scroll.refresh()
            }
        }
    },
    // 注册组件
    components: {
        navbar,
        homeSwiper,
        homeRecommend,
        homeFeatuer,
        tabControl,
        goodsList,
        Bscroll,
        BackTop
    },

    // 表示该组件处于活跃状态
    // 记录home组件的滚动位置，在组件切换的时候滚动到上一次指定的位置
    activated () {
        // 回到组件的时候 通过 scrollTo(跳转到上一次的位置)
        this.$refs.toTop.scroll.scrollTo(0, this.saveY, 100);
        // 重新计算高度 避免滚动不了
        this.$refs.toTop.scroll.refresh();
    },

    // 表示该组件处于不活跃状态
    deactivated() {
        // 保存组件切换前最后的滚动位置
        this.saveY = this.$refs.toTop.scroll.y;
    },
    // 生命周期函数  在数据生效的时候发送网络请求
    // 调用方法
    created () {
        // 调用方法
        this.MgetHomeMultidata();

        // 请求 新款 的数据调用该方法 并传入参数
        this.MgetHomeGoods('pop');
        this.MgetHomeGoods('new');
        this.MgetHomeGoods('sell');
    },
    methods:{
        /**
         * 数据修改方法
         */
        // tabbar商品切换
        tabGoods(index) {
            // 分支判断 根据 index 来切换数据
            switch (index) {
                case 0:
                    this.strGoods = 'pop';
                    break;
                case 1:
                    this.strGoods = 'new';
                    break;
                case 2:
                    this.strGoods = 'sell';
                    break;
                default:
                    break;
            }
            // 通过 isShow 设置成当前活跃状态下的 index
            // 保证两个 tabControl 在切换商品栏的时候都会保持一致
            this.$refs.tabControl1.isShow = this.$refs.tabControl.isShow = index;
        },

        // 返回顶部
        backTopClick() {
            // console.log(this.$refs.toTop.scroll.scrollTo);
            this.$refs.toTop.scroll.scrollTo(0,0,1000)
        },

        // 显示/隐藏按钮
        homeBackTop(position) {
            // 显示/隐藏按钮
            this.backTopIsShow = -position.y > 1000 ? true : false;

            // 显示/隐藏 tabControl1
            this.tabIsShow = (-position.y) > this.tabOffestTop ? true : false
        },

        // 上拉加载
        homePullUp() {
            // 调用接收数据方法
            // this.strGoods 获取当前处于活跃状态的商品分类
            this.MgetHomeGoods(this.strGoods);
        },

        // 轮播图加载完成后 获取 tab 到顶部高度
        swiperImgLoad() {
            // this.$refs.tabControl.$el 拿到组件的内部元素
            // 调用 offsetTop 获取高度
            // console.log(this.$refs.tabControl.$el.offsetTop);  618
            // 保存高度
            this.tabOffestTop = this.$refs.tabControl.$el.offsetTop;
        },

        /**
         * 网络请求方法
         */
        MgetHomeMultidata() {
            // 发送网络请求
            getHomeMultidata().then( response => {
                // console.log(response);
                this.homeBannerImg = response.data.data.banner.list;
                this.recommend = response.data.data.recommend.list;
            })
        },

        MgetHomeGoods(type) {
            // page 作为页码 请求数据
            const page = this.goods[type].page + 1;
            getHomeGoods(type, page).then( res => {
                // 遍历商品数据
                for(let i = 0; i < res.data.data.list.length; i++){
                    // 通过 push 方法遍历数组元素添加到 另一个数组
                   this.goods[type].list.push(res.data.data.list[i])
                }
                // 请求数据后 页码 +1
                this.goods[type].page += 1;
            })
        }
    }
}
</script>

<style scoped>
/* @import "../../../node_modules/animate.css/animate.css"; */
    #home{
        /* padding-top: 44px; */
        position: relative;
        /* home高度为 100 视口 */
        height: 100vh;
    }
    .home-nav {
        background-color: rgb(226, 81, 81);
        color: #fff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 5;
    }
    .tab-control{
        /* 临时通过 stichy 属性实现滚动固定 */
        position: sticky;
        top: 44px;
        background-color: #fff;
        z-index: 9;
    }
    .content{
        /* height: 300px; */
        overflow: hidden;
        position: absolute;
        top: 44px;
        right: 0;
        left: 0;
        bottom: 49px;
    }

    .v-enter,.v-leave-to{
        opacity: 0;
        transform: translateX(180px);
    }

    /* 动画执行期间 */
    .v-enter-active,.v-leave-active{
        /* 添加动画效果 */
        transition: all 0.4s linear;
    }
</style>
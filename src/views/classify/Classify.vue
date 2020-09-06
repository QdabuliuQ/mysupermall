<template>
    <div class="Classify">
        <classifyNavBar class="navbar"></classifyNavBar>
        <tab-control
            ref="classifyTabControl"
            @tabGoods="tabGoods"
            class="tabControl1"
            :title="title"
            v-show="tabControlIsShow"></tab-control>
        <!-- 左侧商品栏 -->
        <bscroll class="contentTitle">
            <!-- 商品列表 -->
            <classify-goods-title
            :goodsTitle="goodsTitle"
            @classifyClick="classifyClick"
            class="classify-goods-title"></classify-goods-title>
        </bscroll>
        <!-- 右侧商品缩略图/商品推荐 -->
        <div class="rightGoods" v-if="goodsIsShow">
            <bscroll
            ref="rightBScroll"
            class="contentGoods"
            :probeType="3"
            @homeBackTop="homeBackTop">   
                <!-- 商品缩略图 -->
                <classify-goods 
                :goodsTitleGoods="goodsTitleGoods"
                @classifyImgLoad="classifyImgLoad"
                class="classify-goods"></classify-goods>
                <!-- 选项卡 -->
                <tab-control
                ref="classifyTabControl"
                @tabGoods="tabGoods"
                class="tabControl"
                :title="title"></tab-control>
                <goodsList class="goodsList" :goods="goods"></goodsList>
            </bscroll>
        </div>
        <div class="css-load" v-else>
            <css-load></css-load>
        </div>
        <transition>
            <back-top
            @click.native="classifyToTop"
            v-show="backTopIsShow"></back-top>
        </transition>
    </div>
</template>

<script>
import ClassifyNavBar from './childrenComps/ClassifyNavBar'  // 顶部导航栏
import ClassifyGoodsTitle from './childrenComps/ClassifyGoodsTitle'  // 商品分类组件
import ClassifyGoods from './childrenComps/ClassifyGoods'   // 商品缩略图组件
import tabControl from 'components/context/tabControl/TabControl'   // 选项卡组件
import goodsList from 'components/context/goods/goodsList'    // 商品列表组件
import backTop from 'components/context/backTop/BackTop'    // 返回顶部组件

import cssLoad from 'components/common/cssLoad/CssLoad'

import bscroll from 'components/common/bscroll/Bscroll'    // 滚动组件

import {getClassify,getClassifyGoods,getClassifyDetail} from 'network/classify.js'    // 网络请求

export default {
    name: 'Classify',
    components: {
        ClassifyGoodsTitle,
        ClassifyNavBar,
        ClassifyGoods,
        tabControl,
        goodsList,
        backTop,
        cssLoad,
        bscroll
    },
    data () {
        return {
            goodsTitle: [],   // 商品列表
            goodsTitleGoods: null,  // 商品缩略图
            goodsTitleIndex: null,  // 索引
            title: ['新款','流行','精选'],  // 选项卡
            goods: null,    // 保存商品数据
            currentIndex: 'pop',    // 选项卡
            goodsMiniWallkey: null,    // 商品分类key
            tabControltoTop: 0,   // tabControl的offsetTop距离
            tabControlIsShow: false,    // 假的tabControl是否显示
            backTopIsShow: false,   // 返回顶部按钮
            goodsIsShow: false    // 动画/商品切换
        }
    },
    methods: {
        // 监听图片加载 获取高度 offsetTop
        classifyImgLoad(){
            this.tabControltoTop = this.$refs.classifyTabControl.$el.offsetTop;
            this.$refs.rightBScroll.scroll.refresh()
        },

        // 返回顶部
        classifyToTop(){
            // 调用 scrollTo 跳转到指定位置
            this.$refs.rightBScroll.scroll.scrollTo(0,0,1000)
        },

        tabGoods(index){
            // 根据index判断 选中的选项卡
            switch (index) {
                case 0:
                    this.currentIndex = 'pop'
                    break;
                case 1:
                    this.currentIndex = 'new'
                    break;
                case 2:
                    this.currentIndex = 'sell'
                    break;
            }
            // 调用获取数据方法
            this.classifyDetail(this.goodsMiniWallkey,this.currentIndex)
        },

        // 监听滚动事件
        homeBackTop(position){
            this.backTopIsShow = (-position.y) > 1000 ? true : false
            // 根据滚动让 假tabControl 显示
            this.tabControlIsShow = (-position.y) > this.tabControltoTop ? true : false
        },

        /**
         * 获取数据
         */
        // 封转获取商品方法
        classifyDetail(miniWallkey,type){
            getClassifyDetail(miniWallkey,type).then(res => {
                this.goods = res.data;
            })
        },
        // 根据 index 获取对应的商品缩略图
        classifyClick(index){
            // 判断 点击 的选项是否为 上一个
            if (this.goodsTitleIndex !== index) {
                // 调用 getClassifyGoods 发送请求
                getClassifyGoods(this.goodsTitle[index].maitKey).then(res => {
                    this.goodsMiniWallkey = this.goodsTitle[index].miniWallkey
                    // 保存 index 解决重复点击重复发送请求
                    this.goodsTitleIndex = index
                    this.goodsTitleGoods = res.data.data.list
                })
                // 通过延时调用 获取tabControl的offsetTop
                setTimeout(() => {
                    // 调用 方法 获取 offsetTop
                    this.classifyImgLoad();
                },500)
                // 调用方法
                this.classifyDetail(this.goodsTitle[index].miniWallkey,this.currentIndex)
            }
        }  
    },
    created () {
        // 延时调用
        setTimeout(() => {
            this.goodsIsShow = true
        },1500)

        // 获取商品列表
        getClassify().then(res => {
            this.goodsTitle = res.data.data.category.list
            this.goodsMiniWallkey = res.data.data.category.list[0].miniWallkey
        })
        // 延时调用
        setTimeout(() => {
                // 避免获取不到 this.goodsTitle[0].maitKey 
                getClassifyGoods(this.goodsTitle[0].maitKey).then(res => {
                // this.goodsTitleIndex = index
                this.goodsTitleGoods = res.data.data.list
            })
        },400)
        // 获取推荐商品列表
        setTimeout(() => {
            getClassifyDetail(this.goodsTitle[0].miniWallkey, 'pop').then(res => {        
                this.goods = res.data;
            })
        },500)
    }
}
</script>

<style scoped>
    .css-load{
        width: 74%;
        float: left;
        height: calc(100% - 44px - 49px);
        position: relative;
        top: 44px;
    }
    .Classify{
        height: 100vh;
        overflow: hidden;
        background-color: rgb(240, 240, 240);
    }
    .navbar{
        background-color: rgb(226, 81, 81);
        color: #fff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 10;
    }
    .contentTitle{
        position: relative;
        top: 44px;
        float: left;
        width: 26%;
        height: calc(100% - 44px - 49px);
    }
    .classify-goods-title{
        position: relative;
        top: 0;
    }
    .rightGoods{
        height: 100vh;
    }
    .contentGoods{
        position: relative;
        top: 44px;
        float: left;
        width: 74%;
        height: calc(100% - 44px - 49px);
    }
    .classify-goods{
        position: relative;
        top: 0;
    }
    .tabControl{
       position: relative;
       background-color: #fff;
       top: 45px;
    }
    .tabControl1{
        width: 74%;
        position: absolute;
        z-index: 21;
        top: 0;
        background-color: #fff;
        left: 26%;
        top: 44px;
    }
    .goodsList{
        position: relative;
        top: 45px;
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
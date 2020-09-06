<template>
  <div id="detail">
      <detailNav-bar ref="detailNav" class="detailNav" @detailTitleClick="detailTitleClick"></detailNav-bar>
      <bscroll class="content" ref="bscroll" :probeType="3" @homeBackTop="detailTop">
          <detail-swiper ref="swiper" :top-images='topImages'></detail-swiper>
          <detail-base-text :goods="goods"></detail-base-text>
          <detail-shop-info :shop="shop"></detail-shop-info>
          <detail-goods-info :goodsImg="goodsImg" @imageLoad="imageLoad"></detail-goods-info>
          <detail-params-info ref="params" :goodsParams="goodsParams"></detail-params-info>
          <detail-comment ref="comment" :goodsComment="goodsComment" @commentImgLoad="commentImgLoad"/>
          <goods-list ref="goodsList" class="commend" :goods="goodsCommend"></goods-list>
      </bscroll>
      <!-- 添加动画效果 -->
      <transition name="" mode="">
          <detail-back-top v-show="backTopShow" @click.native="backTopClick"></detail-back-top>
      </transition>
      <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
  </div>
</template>

<script>
import detailNavBar from './childrenComps/detailNavBar'  // 顶部导航栏组件
import detailSwiper from './childrenComps/detailSwiper'  // 轮播图组件
import detailBaseText from './childrenComps/detailBaseText'  // 商品信息组件
import detailShopInfo from './childrenComps/detailShopInfo'  // 店铺组件
import detailGoodsInfo from './childrenComps/detailGoodsInfo'   // 商品更多图片组件
import detailParamsInfo from './childrenComps/detailParamsInfo'  // 商品详情数据组件
import detailComment from './childrenComps/detailComment'   // 评论组件
import goodsList from 'components/context/goods/goodsList'  // 商品推荐组件
import detailBottomBar from './childrenComps/detailBottomBar'  // 底部导航栏
import detailBackTop from 'components/context/backTop/BackTop'  // 返回顶部组件


import bscroll from 'components/common/bscroll/Bscroll' // 滚动组件

import {getDetail,getRecommend,Goods,Shop,Params} from 'network/detail'  // 网络请求

import {debounce} from 'common/utils'   // 防抖动函数

import {backTopMixin} from '@/common/mixin'  // 混入封转

export default {
    name:'Detail',
    mixins: [backTopMixin],
    data () {
        return {
            // 商品id
            iid: null,

            // 商品图片信息
            topImages:[],

            // 保存商品信息类
            goods: {},

            // 保存店铺信息
            shop: {},

            // 商品详情数据
            goodsImg:{},

            // 商品详情参数
            goodsParams:{},

            // 商品评论
            goodsComment:{},

            // 商品推荐
            goodsCommend:[],

            // 保存商品参数滚动高度
            getThemeTop:[],

            // 保存防抖动函数
            getThemeTopY: null,

        }
    },
    methods: {
        // 图片加载监听
        imageLoad(){
            // 调用 bscroll 的 refresh 重新计算高度
            this.$refs.bscroll.scroll.refresh();
            // 调用该方法获取距离顶部的高度
            this.getThemeTopY();
        },
        // 评论图片加载监听
        commentImgLoad(){
            // 调用 bscroll 的 refresh 重新计算高度
            this.$refs.bscroll.scroll.refresh();
        },

        // 点击选项卡滚动到指定位置
        detailTitleClick(index){
            // 通过 refs 获取到 scroll 调用 scrollTo 方法
            this.$refs.bscroll.scroll.scrollTo(0, -this.getThemeTop[index], 500)
        },

        // 获取滚动高度
        detailTop(position){
            // 判断 position.y 在哪一个区间
            // console.log(this.getThemeTop);
            if( -position.y >= this.getThemeTop[0] && -position.y < this.getThemeTop[1]){
                // 通过 ref 获取 detailNav 修改 activeIndex
                this.$refs.detailNav.activeIndex = 0
            }else if( -position.y >= this.getThemeTop[1] && -position.y < this.getThemeTop[2]){
                this.$refs.detailNav.activeIndex = 1
            }else if( -position.y >= this.getThemeTop[2] && -position.y < this.getThemeTop[3]){
                this.$refs.detailNav.activeIndex = 2
            }else if( -position.y >= this.getThemeTop[3]){
                this.$refs.detailNav.activeIndex = 3
            }

            // 调用混入封装的方法
            this.backTopisShow(position)
            // this.backTopShow = -position.y > 1000;
        },

        // 添加到购物车
        addCart(){
            // 保存商品的基本数据 在购物车中展示
            const product = {};
            product.iid = this.iid;  // 商品id
            product.count = 1   // 商品数量
            product.check = false;  // 商品是否被选中
            product.price = this.goods.lowNowPrice;  // 商品价格
            product.desc = this.goods.desc;  // 商品描述
            product.img = this.topImages[0];  // 商品图片
            product.title = this.goods.title;   // 商品标题
            product.shopName = this.shop.name;  // 商品店铺名称
            // console.log(product);

            // 通过 dispatch 调用 actions 中定义的异步操作
            // 调用 addCartList 函数 会返回一个 Promise
            // 通过 .then 来判断输出结果
            this.$store.dispatch('addCartList', product).then(res => {
                // 通过 $toast 指令调用 toast 组件对象中 show 方法
                // 并传入对应的参数
                this.$toast.show(res,1900)
            });            
        }
    },
    created () {
        // 保存商品id
        this.iid = this.$route.params.iid;

        // 发送请求获取数据
        getDetail(this.iid).then( res => {
            
            const data = res.data.result;
            this.topImages = data.itemInfo.topImages
            console.log(res);
            
            // 发送请求 保存商品数据
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

            // 发送请求 保存店铺数据
            this.shop = new Shop(data.shopInfo)

            // 保存商品更多图片
            this.goodsImg = data.detailInfo;

            // 保存商品参数
            this.goodsParams = new Params(data.itemParams.info,data.itemParams.rule)

            // 获取评论数据  判断是否有评论数据
            if (data.rate.cRate !== 0) {
                this.goodsComment = data.rate.list[0] || {};
            }          

            // 调用防抖动函数  获取元素的 offestTop
            this.getThemeTopY = debounce(() => {
                // this.getThemeTop = []
                this.getThemeTop.push(0)
                this.getThemeTop.push(this.$refs.params.$el.offsetTop - 44) // 减去44是顶部导航栏的高度
                this.getThemeTop.push(this.$refs.comment.$el.offsetTop - 44)
                this.getThemeTop.push(this.$refs.goodsList.$el.offsetTop - 44)
            },100)
        })

        //  获取商品推荐数据
        getRecommend().then( res => {
            this.goodsCommend = res.data.data.list;
            // console.log(this.goodsCommend);
        })
    },
    components: {
        detailNavBar,
        detailSwiper,
        detailBaseText,
        detailShopInfo,
        detailGoodsInfo,
        detailParamsInfo,
        detailComment,
        goodsList,
        detailBottomBar,
        detailBackTop,
        bscroll,
    }
}

</script>
<style scoped>
    #detail{
        position: relative;
        z-index: 20;
        background-color: #fff;
        height: 100vh;
    }

    .content{
        height: calc(100% - 44px - 49px);
    }

    .detailNav{
        position: relative;
        /* margin-top: 20px; */
        z-index: 21;
        background-color: #fff;
    }
    .commend{
        /* padding-top: 20px; */
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
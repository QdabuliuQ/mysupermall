<template>
  <div class="CartGoodsList">
    <!-- 滚动组件 -->
    <bscroll class="cartContent" ref="bscroll">
      <!-- 滚动区域 -->
      <div class="topbox"></div>
      <div class="goods-list">
        <div class="goods" v-for="(item,index) in $store.state.cartList" :key="index">
          <div class="goodsTitle">
            <img src="~assets/img/cartImg/-dianpu.png" alt="">
            <span class="shopName">{{item.shopName}}</span>
          </div>
          <div class="goodsContent">
            <div class="icon" @click="goodsCheck(item)">
              <img :src="item.check ? goodsCheckT : goodsCheckF" alt="">
            </div>
            <div class="goodsImg">
              <img :src="item.img" alt="">
            </div>
            <div class="goodsText">
              <div class="rightBox">
                <span class="goodsT">{{item.title}}</span>
                <div class="bottomBox">
                  <span class="goodsPrice">￥{{item.price}}</span>
                  <span class="goodsCount">×{{item.count}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </bscroll>
    <div class="bottom">
      <div class="leftCheck">
        <div class="iconCheck" @click="setCheck">
          <img :src="checkedAll ? bottomCheckT : bottomCheckF" alt="">
        </div>
        <span class="qcheck">全选</span>
      </div>
      <div class="centerPrice">
        <span>总价 : ￥{{sumPrice}}</span>
      </div>
      <div class="rightSum">
        <span>去结算{{goodsLength === 0 ? ' ' : '('+ goodsLength +')'}}</span>
      </div>
    </div>
  </div>
</template>

<script>

import bscroll from 'components/common/bscroll/Bscroll'  // 滚动组件

export default {
  name:'CartGoodsList',
  data () {
    return {
      // 保存图片地址
      bottomCheckT: require('assets/img/cartImg/xuanzhong1.png'),
      bottomCheckF: require('assets/img/cartImg/weixuanzhong.png'),

      goodsCheckT: require('assets/img/cartImg/xuanzhong1.png'),
      goodsCheckF: require('assets/img/cartImg/weixuanzhong.png'),
      checkedAll: false,
    }
  },
  computed: {
    sumPrice(){
      // filter 遍历数组
      return this.$store.state.cartList
      // 遍历出 item.check 为 true 
        .filter(item => item.check)
        // reduce(prev 上一个值)  上一个值 + 价格 * 数量
        .reduce((prev, item) => prev + item.price * item.count, 0)
        // toFixed 小数点保留两位
        .toFixed(2);
    },

    // 获取选中个数
    goodsLength(){
      return this.$store.state.cartList
      // 遍历数组  
      // return  length 长度
      .filter(item => item.check).length
    }
  },
  activated () {
    // 重新计算滚动高度
    this.$refs.bscroll.scroll.refresh();
  },
  components: {
    bscroll
  },
  
  methods: {
    // 全选点击事件
    setCheck(){
      // 取反 切换
      this.checkedAll = !this.checkedAll
      // 遍历数组
      for (const item of this.$store.state.cartList) {
        // 将 item.check 赋值为全选按钮对应的值
        item.check = this.checkedAll
      }
    },

    // 商品点击事件
    goodsCheck(item){
      // 取反切换
      item.check = !item.check
      // 遍历数组
      for (const item of this.$store.state.cartList) {
        // 遍历到 商品 按钮为 false 的时候
        // 就将 全选按钮 设置为 false
        if (!item.check) {
          this.checkedAll = false
          // break 退出循环
          break
        }
        // 如果没有进入 if 判断，证明都是选中状态
        this.checkedAll = true
      }
    }
  }
}

</script>
<style scoped>
  .CartGoodsList{
    height: 100vh;
    overflow: hidden;
  }
  .topbox{
    width: 100%;
    height: 10px;
    background-color: rgb(233, 233, 233);
  }
  .cartContent{
    height: calc(100% - 44px - 49px - 40px);
    position: relative;
    /* margin-top: -10px; */
    /* position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 89px; */
    background-color: rgb(233, 233, 233);
  }
  .goods-list{
    margin-left: 2.3%;
    width: 95%;
  }
  .goods{
    width: 100%;
    height: 150px;
    border-radius: 7px;
    background: #fff;
    margin-top: 10px;
  }
  .goodsTitle{
    width: 100%;
    height: 30px;
  }
  .goodsTitle img{
    width: 20px;
    height: 20px;
    margin-top: 5px;
    float: left;
    margin-left: 15px;
  }
  .shopName{
    font-weight: 550;
    font-size: 17px;
    margin-top: 5px;
    float: left;
    margin-left: 5px;
  }
  .goodsContent{
    width: 100%;
    height: 110px;
    margin-top: 4px;
    display: flex;
  }
  .icon{
    flex: 1;
    text-align: center;
    line-height: 105px;
  }
  .goodsImg{
    flex: 2.5;
  }
  .goodsImg img{
    width: 100%;
    height: 100%;
  }
  .goodsText{
    flex: 8;
  }
  .rightBox{
    width: 95%;
    height: 100%;
    margin-left: 2%;
    position: relative;
  }
  .goodsT{
    font-size: 14px;
  }
  .bottomBox{
    width: 100%;
    height: 25px;
    position: absolute;
    line-height: 25px;
    bottom: 0;
  }
  .goodsPrice{
    color: red;
  }
  .goodsCount{
    float: right;
    margin-right: 5px;
  }
  .bottom{
    box-shadow: 0 -1px 4px rgb(185, 184, 184);
    display: flex;
    width: 100%;
    height: 40px;
    background-color:#fff;
    position: relative;
    box-sizing: border-box;
    z-index: 20;
  }
  .leftCheck{
    flex: 2;
    line-height: 40px;
  }
  .leftCheck img{
    width: 17px;
    height: 17px;
  }
  .iconCheck{
    float: left;
    margin-top: 2px;
    margin-left: 5px;
  }
  .leftCheck .qcheck{
    margin-left: 5px;
    font-size: 14px;
  }
  .centerPrice{
    line-height: 40px;
    flex: 4;
  }
  .rightSum{
    background-color: rgb(226, 81, 81);
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    flex: 4;
  }
</style>
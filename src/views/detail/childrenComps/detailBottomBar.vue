<template>
  <div class="bottom-bar">
      <div class="leftBarItem">
          <div class="barItem">
              <img class="barItemImg1" src="~assets/img/detailImg/kefu.png" alt="">
              <div>客服</div>
          </div>
          <div class="barItem">
              <img class="barItemImg2" src="~assets/img/detailImg/dianpu.png" alt="">
              <div>店铺</div>
          </div>
          <div class="barItem" @click="scGoods">
              <img class="barItemImg1" :src="isShow ? imgPath1 : imgPath2" alt="">
              <div>收藏</div>
          </div>
      </div>
      <div class="rightBarItem">
          <div class="rightItem shopCart" @click="addToCart">
              加入购物车
          </div>
          <div class="rightItem bugGoods">
              购买
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'detailBottomBar',
    data () {
        return {
            isShow: true,
            // 通过 require 获取路径
            imgPath1: require('assets/img/detailImg/shoucang.png'),  
            imgPath2:  require('assets/img/detailImg/shoucang1.png')  
            // isShow: true 
        }
    },
    methods: {
        scGoods(){
            this.isShow = !this.isShow
        },
        // 加入购物车
        addToCart(){
            // 事件传播
            this.$emit('addCart')
        }
    }
}

</script>
<style scoped>
    .bottom-bar{
        width: 100%;
        height: 52px;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        box-shadow: 0 -1px 5px 2px rgba(0, 0, 0, 0.3);
    }
    .leftBarItem{
        width: 50%;
        height: 52px;
        display: flex;
        float: left;
    }
    .barItem{
        flex: 1;
        text-align: center;
        font-size: 13px;
    }
    .barItem .barItemImg1{
        width: 27px;
        height: 27px;
        margin-top: 5px;
    }
    .barItemImg2{
        width: 24px;
        height: 24px;
        margin-top: 7px;
    }

    .rightBarItem{
        width: 50%;
        height: 100%;
        float: left;
        display: flex;
    }
    .rightItem{
        flex: 1;
        text-align: center;
        line-height: 52px;
        color: #fff;
        font-size: 15px;
    }
    .shopCart{
        background-color: rgb(227, 240, 50);
    }
    .bugGoods{
        background-color: rgb(243, 40, 165);
    }
</style>
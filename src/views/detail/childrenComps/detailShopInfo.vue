<template>
  <div class="shopBox">
      <div class="shoptext">
          <div class="shopLogo">
              <img :src="shop.shopLogo" alt="">            
          </div>
          <span>{{shop.name}}</span>
      </div>
      <div class="shopGoods">
          <div class="leftGoods">
                <div class="cSells">
                    <span class="sellsNum">{{shop.cSells}}</span>
                    <p class="text">总销量</p>
                </div>
                <div class="cGoods">
                    <span class="sellsNum">{{shop.cGoods}}</span>
                    <p class="text">全部宝贝</p>
                </div>
          </div>
          <div class="rightGoods">
              <table>
                  <tr v-for="(item,index) in shop.score" :key="index">
                      <td>{{item.name}}</td>
                      <td class="pleft" :class="item.isBetter ? 'height' : 'low' ">{{item.score}}</td>
                      <td class="pleft" :class="item.isBetter ? 'height' : 'low' ">{{item.isBetter ? '高' : '低'}}</td>
                  </tr>
              </table>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'detailShopInfo',
    props: ['shop']
}

</script>
<style scoped>
    .shopBox{
        width: 100%;
        border-top: 6px solid rgb(231, 231, 231);
        /* height: 400px; */
    }

    .shoptext{
        height: 50px;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 10px;
        width: 300px;
        line-height: 50px;
    }
    .shoptext span{
        margin-left: 10px;
        font-size: 16px;
    }
    .shopLogo{
        width: 45px;
        height: 45px;
        border-radius: 50%;
        float: left;
        /* box-shadow: 0 0 4px rgba(0, 0, 0, 0.4); */
        border: 1px solid rgba(0, 0, 0, 0.4);
    }
    .shopLogo img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .leftGoods{
        margin-top: 15px;
        height: 65px;
        width: 200px;
    }
    .shopGoods{
        width: 95%;
        height: 100px;
        margin-left: 2%;
        /* box-sizing: border-box; */
        border-top: 1px solid rgba(0, 0, 0, 0.2);
    }
    .cSells{
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 20px;
        text-align: center;
        width: 70px;
        line-height: 20px;
        height: 55px;
        float: left;
    }
    .cGoods {
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;
        width: 70px;
        margin-left: 10px;
        line-height: 20px;
        height: 55px;
        float: left;
        padding-right: 10px;
        border-right: 1.5px solid rgba(0, 0, 0, 0.2);
    }
    .sellsNum{
        font-size: 18px;
    }
    .text{
        font-size: 14px;
    }

    .rightGoods{
        margin-left: 15px;
        float: left;
        margin-top: -67px;
    }
    .rightGoods table{
        font-size: 13px;
    }
    .rightGoods table tr{
        height: 23px;
    }
    .pleft{
        padding-left:15px;
    }

    .height{
        color: red;
    }
    .low{
        color: green;
    }
</style>
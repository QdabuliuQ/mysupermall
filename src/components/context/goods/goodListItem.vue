<template>
  <div class="goods-item" @click="itemClick">
      <!-- 获取图片数据 -->
      <img v-lazy="imgPath" alt="" @load="itemImgLoad">
      <div class="goods-info">
          <!-- 商品标题 -->
          <p>{{goodsItem.title}}</p>
          <span class="price">￥{{goodsItem.price}}</span>
          <span class="collect"><img src="~assets/img/homeImg/xihuan1.png" alt="">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'goodListItem',
    // 接收父组件的数据
    props: ['goodsItem'],
    computed: {
      // 通过计算属性 判断数据结构
      imgPath() {
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      itemImgLoad() {
        // 通过vuex中的计算属性修改 vuex 中数据
        // 修改一次说明 图片加载成功一次
        this.$store.commit('imgLoadNumMax')
      },

      itemClick() {
        // iid是对应的商品 id
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
}

</script>
<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    min-height: 190px;
    height: auto;
    width: 48%;
    background-color: #fff;
    margin-top: 5px;
    border-radius: 5px;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 13px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
    margin-left: 3px;
    margin-right: 3px;
  }

  .goods-info .price {
    margin-right: 30px;
    color: red;
  }
  .collect{
    position: relative;
  }
  .collect img{
    width: 17px;
    height: 17px;
    position: absolute;
    left: -17px;
    top: 0px;
  }
</style>
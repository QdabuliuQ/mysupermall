<template>
  <div class="detailGoodsInfo">
      <div class="topbox"></div>
      <div class="goodsText">
          <!-- 标题 -->
          <span>{{goodsImg.desc}}</span>
      </div>
      <!-- v-for遍历 -->
      <div :key="index" v-for="(item, index) in goodsImg.detailImage">
      <div class="goodsText">{{ item.key }}</div>
      <div class="info-list">
          <!-- 绑定图片加载事件 -->
        <img
          :key="imageIndex"
          :src="image"
          @load="imageLoad"
          alt=""
          v-for="(image, imageIndex) in item.list"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'detailGoodsInfo',
    // 接收父组件传递的数据
    props: ['goodsImg'],
    data () {
        return {
            // 计算图片加载次数
            count: 0,
            // 保存图片数据长度
            imageLength: 0  
        }
    },
    methods: {
        // 监听图片加载
        imageLoad(){
            this.count ++;
            // 所有图片加载完成后 通过 $emit 调用父组件的方法重新计算高度
            if (this.count === this.imageLength) {
                this.$emit('imageLoad')
            }
        }
    },
    // 监听goosImg中的数据变化
    watch: {
        goodsImg(){
            // 保存图片数据个数
            this.imageLength =  this.goodsImg.detailImage[0].list.length
        }
    }
}

</script>
<style scoped>
    .detailGoodsInfo{
        width: 100%;
        background-color: #fff;
    }
    .topbox{
        width: 100%;
        height: 6px;
        background-color: rgb(231, 231, 231);
    }
    .goodsText{
        width: 95%;
        margin-left: 2%;
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 14px;
    }
    .info-list{
        width: 100%;
    }
    .info-list img{
        width: 100%;
    }
</style>
<template>
  <div class="ClassifyGoods">
      <div class="GoodsItem"
       v-for="(item,index) in goodsTitleGoods"
       :key="index">
            <a :href="item.link">
                <div class="goodsImg">
                    <img :src="item.image" @load="imgLoad" alt="">
                </div>
                <div class="goodsTitle">{{item.title}}</div>
            </a>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ClassifyGoods',
    data () {
        return {
            imgBool:false
        }
    },
    methods: {
        imgLoad(){
            // 图片加载只计算一次
            if(!this.imgBool){
                // 调用父组件中的方法
                this.$emit('classifyImgLoad')
            }
            this.imgBool = true
        }
    },
    props: ['goodsTitleGoods']
}

</script>
<style scoped>
    .ClassifyGoods{
        background-color: rgb(240, 240, 240);
        width: 98%;
        margin-left: 1%;
        /* float: left; */
        position: relative;
        top: 44px;
        display: flex;
        /* flex-wrap 对超出内容换行 */
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .GoodsItem{
        background-color: #fff;
        width: 30%;
        height: 110px;
        margin-top: 10px;
        margin-bottom: 5px;
        margin-left: 4px;
        margin-right: 4px;
        border-radius: 4px;
    }
    .GoodsItem a{
        text-decoration: none;
        color: #000;
    }
    .goodsImg{
        width: 100%;
        height: 80%;
    }
    .goodsImg img{
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
    .goodsTitle{
        width: 100%;
        height: 19%;
        text-align: center;
        font-size: 13px;
        line-height: 22px;
    }
</style>
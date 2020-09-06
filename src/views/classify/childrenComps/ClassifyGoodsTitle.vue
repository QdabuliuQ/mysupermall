<template>
  <div class="goodsTitle">
      <div class="goodsTitleItem"
       v-for="(item,index) in goodsTitle"
       :key="index"
       :class="{active : index === isActive}"
       @click="titleClick(index)">{{item.title}}</div>
  </div>
</template>

<script>
export default {
    name: 'ClassifyGoodsTitle',
    data () {
        return {
            isActive: 0      
        }
    },
    methods: {
        titleClick(index){
            this.isActive = index;
            this.$emit('classifyClick',index)
        }
    },
    props: ['goodsTitle']
}

</script>
<style scoped>
    .goodsTitle{
        width: 100%;
        position: relative;
        top: 44px;
        bottom: 49px;
        left: 0;
    }
    .goodsTitleItem{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #fff;
        /* background-color: rgb(240, 240, 240); */
        box-sizing: border-box;
        font-size: 14px;
    }
    .active{
        background-color: rgb(240, 240, 240);
        border-left: 4px solid rgb(226, 81, 81);
        color: rgb(226, 81, 81);
    }
</style>
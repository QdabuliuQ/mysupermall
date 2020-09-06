<template>
  <div id="goods">
      <!-- 通过数据生成对应的子组件 -->
      <goods-list-item
       v-for="(item,index) in goods"
       :key="index"
       :goods-item="item"/>
       <!-- goods-item 传递数据给子组件 -->
  </div>
</template>

<script>
// 引入子组件
import goodsListItem from './goodListItem'
export default {
    name:'goodList',
    components:{
        goodsListItem
    },
    // 获取父组将传递的数据
    props: ['goods']
}

</script>
<style scoped>
    #goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 2px;
    }
</style>
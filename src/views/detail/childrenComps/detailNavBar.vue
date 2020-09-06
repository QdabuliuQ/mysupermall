<template>
  <div>
      <nav-bar>
           <div slot="left" class="leftBtn" @click="backLeftBtn">
               <img src="~assets/img/common/back.svg" alt="">
           </div>
           <div slot="center" class="title">
               <div 
                class="titleItem"
                v-for="(item,index) in titleList"
                :key="index"
                :class="{active: index === activeIndex}"
                @click='titleClick(index)'>
                   {{item}}
               </div>
           </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/navbar'

export default {
    name:'detailNavBar',
    components: {
        NavBar
    },
    data () {
        return {
            titleList:['商品','参数','评论','推荐'],
            activeIndex: 0,
        }
    },
    methods: {
        // 切换顶部导航栏
        titleClick(index){
            this.activeIndex = index;
            // 传播事件
            this.$emit('detailTitleClick',index)  // 传递参数index
        },
        backLeftBtn(){
            // 调用 back 函数返回上一个路由
            this.$router.back();
            // this.$router.go(-1)  作用和 back 一样返回上一层
        }
    }
}

</script>
<style scoped>
    .title{
        display: flex;
        font-size: 15px;
    }

    .titleItem{
        flex: 1;
    }

    .active {
        color: red;
    }

    .leftBtn img{
        margin-top: 11.5px;
    }
</style>
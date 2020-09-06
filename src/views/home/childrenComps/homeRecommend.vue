<template>
  <div class="recommend">
      <div class="recommend-item" v-for="(item,index) in recommend" :key='index'>
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:'homeRecommend',
    props: ['recommend']
}

</script>
<style scoped>
    .recommend{
        display: flex;
        text-align: center;
        padding: 15px 0 27px 0;
        font-size: 14px;
        border-bottom: 8px solid rgb(231, 231, 231);
    }
    .recommend-item{
        flex: 1;
    }
    .recommend-item img{
        width: 65px;
        height: 65px;
        margin-bottom: 7px;
    }
    .recommend-item a{
        text-decoration: none;
        color: #000;
    }
</style>
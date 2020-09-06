<template>
  <Swiper class="detail-swiper">
      <!-- 根据图片数据生成轮播图 -->
      <swiper-item v-for="(item,index) in topImages" :key="index">
          <img :src="item" alt="">
      </swiper-item>
  </Swiper>
</template>

<script>
// 轮播图组件
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name:'detailSwiper',
    // 注册组件
    components: {
        Swiper,
        SwiperItem
    },
    // 接收父组件发送的数据
    props: ['topImages']
}

</script>
<style scoped>
    .detail-swiper{
        height: 300px;
        overflow: hidden;
    }
</style>
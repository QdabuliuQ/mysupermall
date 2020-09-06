<template>
    <swiper>
        <!-- 根据图片创建组件 -->
        <swiper-item v-for='(item,index) in homeBannerImg' :key='index'>
            <!-- 绑定href属性  获取到 item.link 点击图片后跳转 -->
            <a :href="item.link">
                <!-- 绑定 src 属性 -->
                <img :src="item.image" alt="" @load="imgLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
// 引入轮播图
// Swiper 轮播图的框架
// SwiperItem 轮播图的内容
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name: 'homeSwiper',
    
    // 从父组件传数据到子组件  用 props
    props: ['homeBannerImg'],   // 保存父组件传过来的 属性

    // 注册组件
    components: {
        Swiper,
        SwiperItem
    },
    data () {
        return {
            // 定义变量用来调用 计算高度
            imgBool:false
        }
    },
    methods: {
        imgLoad() {
            // 图片加载只计算一次
            if(!this.imgBool){
                // 调用父组件中的方法
                this.$emit('swiperImgLoad')
            }
            this.imgBool = true
        }
    }
}
</script>

<style scoped>

</style>
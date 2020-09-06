// 混入封转
// 导入返回顶部组件
import backTop from 'components/context/backTop/BackTop'

// backTopMixin 保存返回顶部组件需要的数据
export const backTopMixin = {
    data () {
        return {
            // 是否显示
            backTopShow: false
        }
    },
    components: {
        // 注册组件
        backTop
    },
    methods: {
        // 返回顶部
        backTopClick() {
            // console.log(this.$refs.toTop.scroll.scrollTo);
            this.$refs.bscroll.scroll.scrollTo(0,0,1000)
        },
        // 根据滚动高度显示/隐藏 按钮
        backTopisShow(position) {
            this.backTopShow = -position.y > 1000
        }
    }
}
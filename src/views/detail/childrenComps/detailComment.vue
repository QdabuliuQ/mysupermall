<template>
  <div>
      <div class="detailComment"  v-if="Object.keys(goodsComment).length !== 0">
        <div class="topBox">
            <span class="comment">用户评论</span>
            <span class="more">更多</span>
        </div>
        <div class="centerBox">
            <div class="user">
                <div class="userImg">
                    <img :src="goodsComment.user.avatar" alt="">
                </div>
                <span>{{goodsComment.user.uname}}</span>
            </div>
            <div class="commentText">
                <span class="content">{{goodsComment.content}}</span>
                <div class="commentimgs" v-if="goodsComment.images" >
                    <div class="commentImg"
                    v-for="(item,index) in goodsComment.images" :key="index">
                        <img :src="item" alt="" @load="commentImgLoad">
                    </div>
                </div>       
            </div>
            <div class="bottomBox">
                <!-- 使用过滤器重新计算时间 -->
                <span class="timed">{{goodsComment.created | getTime}}</span>
                <span class="style">{{goodsComment.style}}</span>
            </div>
        </div>
    </div>
    <div v-else class="noComment">
        <span>暂时没有更多评论了~</span>
    </div>
  </div>
</template>

<script>
export default {
    name:'detailComment',
    props: ['goodsComment'],
    methods: {
        commentImgLoad(){
            this.$emit('imageLoad')
        }
    },
    // 过滤器重新计算后台传递过来的时间
    filters: {
        getTime(val){
            // 将获取的时间转为毫秒
            let date = new Date(val * 1000);
            return date.getFullYear()
             + "-" + (date.getMonth() + 1)
             + "-" + date.getDate()
             + " " + date.getHours()
             + ":" + date.getMinutes()
             + ":" + date.getSeconds();
        }
    }
}

</script>
<style scoped>
    .detailComment{
        width: 100%;
        margin-top: 20px;
        border-top: 6px solid rgb(231, 231, 231);
        
        border-bottom: 6px solid rgb(231, 231, 231);
    }
    .topBox{
        font-size: 14px;
        width: 95%;
        margin-left: 2%;
        height:45px;
        line-height: 45px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    .comment{
        float: left;
    }
    .more{
        float: right;
    }

    .centerBox{
        font-size: 14px;
        width: 95%;
        margin-left: 2%;
        margin-bottom: 20px;
    }
    .user{
        height: 40px;
        line-height: 40px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .userImg{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left:10px;
        margin-right: 10px;
        float: left;
    }
    .userImg img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .commentimgs{
        overflow: hidden;
    }
    .commentText{
        width: 95%;
        margin-left: 2%;
        color: rgb(107, 107, 107);
    }
    .content{
        font-size: 14px;
        
    }
    .commentImg{
        width: 90px;
        height: 110px;
        margin-top: 10px;
        margin-right: 5px;
        float: left;
    }
    .commentImg img{
        width: 100%;
        height: 100%;
        /* float: left;  */
    }

    .bottomBox{
        margin-top: 10px;
        font-size: 12px;
    }
    .timed{
        margin-right: 10px;
    }
    .noComment{
        width: 100%;
        margin-top: 20px;
        height: 70px;
        color: red;
        font-size: 18px;
        line-height: 70px;
        text-align: center;
        border-top: 6px solid rgb(231, 231, 231);
        border-bottom: 6px solid rgb(231, 231, 231);
    }
</style>
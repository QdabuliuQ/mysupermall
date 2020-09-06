<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
        <div class="goodsTitle">{{goods.title}}</div>
        <div class="goodsPrice">
            <div class="nPrice">{{goods.newPrice}}</div>
            <div class="oPrice"><s>{{goods.oldPrice}}</s></div>
            <div class="discount"
            :style="{ backgroundColor: goods.discountBgColor }"
            v-if="goods.discount">
                {{goods.discount}}
            </div>
        </div>
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length - 1].name}}</span>
        </div>
        <div class="info-service">
            <span
                :key="index"
                class="info-service-item"
                v-for="index in goods.services.length - 1"
                v-if="goods.services[index - 1].icon">
                <img :src="goods.services[index - 1].icon" alt="" />
                <span>{{ goods.services[index - 1].name }}</span>
            </span>
        </div>
  </div>
</template>

<script>
export default {
    name:'detailBaseText',
    // 获取父元素传递的数据
    props: {
        goods: {
            type: Object,
            default() {
                return {};
            }
        }
    }
}

</script>
<style scoped>
    .base-info{
        width: 100%;
    }
    .goodsTitle{
        width: 98%;
        margin-left: 2%;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 500;
    }

    .goodsPrice{    
        margin-left: 2%;
        margin-top: 10px;
    }

    .nPrice{
        float: left;
        font-size: 25px;
        color: red;
        margin-right: 7px;
    }
    .oPrice{
        float: left;
        color: #818181;
        margin-top: 8px;
        margin-right: 7px;
    }
    .discount{
        float: left;
        padding: 3px 8px;
        font-size: 12px;
        color: #ffffff;
        border-radius: 8px;
        margin-top: 4px;
    }

    .info-other{
        width: 95%;
        font-size: 13px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        margin-top: 45px;
        margin-left: 7px;
        border-bottom: 1px solid rgba(100, 100, 100, 0.1);
    }

    .info-service {
       width: 95%;
       margin-left: 7px;
       line-height: 35px;
       display: flex;
       justify-content: space-between;
    }

    .info-service-item img {
       position: relative;
       top: 2px;
       width: 13px;
       height: 13px;
    }

    .info-service-item span {
       font-size: 12px;
       margin-left: 5px;
       color: #333333;
    }
</style>
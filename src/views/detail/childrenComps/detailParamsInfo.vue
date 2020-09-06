<template>
  <div class="detailParamsInfo">
      <div class="goodsP">
          <table>
              <tr class="goodsPar" v-for="(item,index) in goodsParams.set" :key="index">
                  <td class="goodsKv goodsKey">{{item.key}}</td>
                  <td class="goodsKv goodsValue">{{item.value}}</td>
              </tr>
          </table>
      </div>
      <div class="goodsR">
          <!-- 判断 goodsParams.disclaimer 的数据是否为空 空则不显示 -->
          <p v-if="goodsParams.disclaimer">{{goodsParams.disclaimer}}</p>
          <table v-for="(item,index) in goodsParams.tables" :key="index">
              <tr v-for="(tr,index) in item" :key="index">
                  <td class="tdValue" v-for="(td,index) in tr" :key="index">
                      {{td}}
                  </td>
              </tr>
          </table>
      </div>
  </div>
</template>

<script>
export default {
    name:'detailParamsInfo',
    props: ['goodsParams']
}

</script>
<style scoped>
    .detailParamsInfo{
        margin-top: 15px;
        width: 100%;
        border-top: 6px solid rgb(231, 231, 231);
    }
    .goodsP{
        width: 95%;
        margin-top: 10px;
        margin-left: 2%;
        font-size: 14px;
    }
    .goodsP table{
        border-collapse: collapse;
        width: 100%;
    }
    .goodsPar{
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    .goodsKv{
        padding-top: 10px;
        padding-bottom: 10px;     
    }
    .goodsKey{
        width: 90px;
    }
    .goodsValue{
        color:red;
    }

    .goodsR{
        width: 95%;
        margin-top: 20px;
        margin-left: 2%;
        font-size: 14px;
    }
    .goodsR p{
        color: red;
    }
    .goodsR table{
        width: 100%;
        border-collapse: collapse;
    }
    .goodsR table tr{
        border-bottom:1px solid rgba(0, 0, 0, 0.2);
    }
    .tdValue{
        text-align: center;
        padding: 8px 0;
    }

    .info-img{
        width: 100%;
        margin-top: 10px;
    }
    .info-img img{
        width: 100%;
    }
</style>
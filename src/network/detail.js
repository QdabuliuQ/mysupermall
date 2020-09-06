import {requestGoods} from './request'

// 请求商品详情数据
export function getDetail(iid){
    return requestGoods({
        url:'/detail',
        // 商品参数
        params:{
            iid,
        }
    })
}

// 请求商品推荐数据
export function getRecommend(){
    return requestGoods({
        url:'/recommend',
    })
}

// 创建一个构造函数 
// es6 语法
// 商品函数
export class Goods {
    constructor(itemInfo, columns, services) {
      this.title = itemInfo.title;
      this.desc = itemInfo.desc;
      this.newPrice = itemInfo.price;
      this.lowNowPrice = itemInfo.lowNowPrice;
      this.oldPrice = itemInfo.oldPrice;
      this.discount = itemInfo.discountDesc;
      this.discountBgColor = itemInfo.discountBgColor;
      this.columns = columns;
      this.services = services;
      this.nowPrice = itemInfo.highNowPrice;
    }
  }

// 店铺信息  
export class Shop {
    constructor(shopInfo){
        this.cGoods = shopInfo.cGoods;
        this.cSells = shopInfo.cSells;
        this.name = shopInfo.name;
        this.score = shopInfo.score;
        this.shopLogo = shopInfo.shopLogo;
    }
}

// 商品详情参数
export class Params {
    constructor(info,rule){
        this.set = info.set;
        this.tables = rule.tables;
        this.disclaimer = rule.disclaimer;
    }
}
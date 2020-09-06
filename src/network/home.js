// 在 home.js 文件中，可以写入多个方法来发送网络请求
// 主要用于 home 组件的网络请求
// 调用 函数 来自 request 文件
import {request} from 'network/request'

import {requestGoods} from 'network/request'

// 在 home 组件中调用 getHomeMultidata 方法接收请求数据
export function getHomeMultidata(){
    // 将 request 函数返回
    return request({
        // 传入 请求 地址
        url:'/home/multidata',
    })
}

// 商品数据网络请求
export function getHomeGoods(type,page){
    return requestGoods({
        url:'/home/data',
        // get 请求使用 params 传递参数
        params:{
            type,
            page
        }
    })
}
export default {
    // 修改 Vuex 的数据建议在 mutations 定义函数
    // payload 作为参数
    addCartList(context,payload){
        // 返回一个 Promise 通过 if判断是否真正将商品添加到数据中 利用 resolve 输出
        return new Promise(( resolve, reject) => {
            let oldProduct = null
        
            // for 循环遍历数组中的 iid
            for (let i = 0; i < context.state.cartList.length; i++) {
                // 发现数组中的 iid === payload 传递过来的参数的 iid 一致的时候
                if(context.state.cartList[i].iid === payload.iid){
                    oldProduct = context.state.cartList[i]
                }       
            } 

            // 判断 oldProduct 是否有值
            if (oldProduct) {   // 数量+1
                context.commit('addGoodsCount',oldProduct)
                resolve('该商品数量+1')
            }else{  // 添加新商品
                payload.count = 1;
                context.commit('addToCart',payload)
                resolve('成功添加到购物车')
            }
        })
    }
}
export default {
    // 监听图片加载
    imgLoadNumMax(state) {
        state.imgLoadNum ++;
        if (state.imgLoadNum === 30) {
          state.imgLoadNum = 0
        }
      },
      
    // 增加数量
    addGoodsCount(state,payload) {
        // parseInt(payload.count++) ;
        payload.count ++;
        console.log(payload);
    },
    // 添加到购物车
    addToCart(state,payload) {
        // unshift 添加到最前面
        state.cartList.unshift(payload)
    }
}
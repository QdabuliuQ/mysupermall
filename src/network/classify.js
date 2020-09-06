import {requestGoods} from './request'

// 分类接口
export function getClassify(){
    return requestGoods({
        url: '/category'
    })
}

// 商品缩略图
export function getClassifyGoods(maitKey){
    return requestGoods({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}

// 分类商品推荐
export function getClassifyDetail(miniWallkey,type){
    return requestGoods({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}
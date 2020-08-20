// 安装 axios   npm install axios --save
// 引入 axios
import axios from 'axios'

export function request(config){
    // 创建 axios 实例
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout: 5000  // 请求时长 5000毫秒
    })

    // 直接将 实例对象 返回
    return instance(config) 

    // 拦截请求
    // use方法传递两个函数
    // 拦截器在发送请求成功后，对该请求进行拦截，在发送请求就会输出 err 
    // 通过 return 将拦截的内容返回，则不会触发 err
    instance.interceptors.request.use(function(success){
        // 请求发送成功
        console.log(success);
        // return 后才能收到请求的数据
        // 可以通过一个判断来 决定是否 return
        return success
    },function(err){
        // 请求发送失败
        console.log(err);
    })
}
//引入axios
import axios from 'axios';

//创建
export const request = (config) => {
    const instance = axios.create({
        baseURL:"http://127.0.0.1:8888/api/private/v1/",
        timeout:10000,
    })
    //响应拦截
    instance.interceptors.response.use( data => {
        return data.data
    })
    //请求拦截
    instance.interceptors.request.use( config => {
        return config
    })
    //返回实例
    return instance(config)
}
//外部使用方式：   import {request} from 'network/request';
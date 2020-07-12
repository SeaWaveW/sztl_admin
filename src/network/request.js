//引入axios
import axios from 'axios';

// import { Loading } from 'element-ui';
// let loadingInstance = ""

//nprogress
// import Vue from 'vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
// Vue.use(NProgress)

//创建
export const request = (config) => {
    const instance = axios.create({
        baseURL:"http://127.0.0.1:8888/api/private/v1/",
        timeout:10000,
    })
    //请求拦截
    instance.interceptors.request.use( config => {
        config.headers.Authorization = sessionStorage.getItem("token")
        
        // loadingInstance = Loading.service({
        //     lock: true,
        //     text: 'Loading',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.5)'
        // });

        NProgress.start();

        return config
    })
    //响应拦截
    instance.interceptors.response.use( data => {

        // loadingInstance.close();

        NProgress.done();

        return data.data
    })
    //返回实例
    return instance(config)
}
//外部使用方式：   import {request} from 'network/request';
import axios from "axios";
import { getToken } from "../utils";

// 创建axios实例
const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',// 根域名
    timeout: 5000,// 超时时间
});

// 请求拦截器
// 在请求发送之前做拦截，插入一些自定义的配置
request.interceptors.request.use(config => {
        // 注入token
        const token = getToken();
        if(token){
            // 将token添加到请求头中
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    err => Promise.reject(err)
)

// 响应拦截器
// 在响应返回之前做拦截，对数据进行一些处理
request.interceptors.response.use(response => {
        return response.data
    },
    err => {
        return Promise.reject(err)
    }
)

export default request;
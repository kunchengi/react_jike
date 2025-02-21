// utils 文件夹下所有文件统一暴露
import request from "./request";
import { getToken, setToken, removeToken } from "./token";
import echartsUtil from "./echarts";

// 这里要用分别暴露
export {
    request,
    getToken,
    setToken,
    removeToken,
    echartsUtil
}
// 文章相关的所有请求
import { request } from "@/utils";

// 获取频道列表
export function getChannelAPI() {
    return request({
        url: '/channels',
        method: 'GET'
    })
}

// 新建文章
export function createArticleAPI(articleData) {
    return request({
        // draft: false 表示发布文章，true表示存为草稿
        url: '/mp/articles?draft=false',
        method: 'POST',
        data: articleData
    })
}
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

// 获取文章列表
export function getArticleListAPI(params) {
    return request({
        url: `/mp/articles`,
        method: 'GET',
        params
    })
}

// 删除文章
export function delArticleAPI(articleId) {
    return request({
        url: `/mp/articles/${articleId}`,
        method: 'DELETE'
    })
}

// 获取文章详情
export function getArticleById(articleId) {
    return request({
        url: `/mp/articles/${articleId}`,
        method: 'GET'
    })
}

// 修改文章
export function updateArticleAPI(data) {
    return request({
        url: `/mp/articles/${data.id}?draft=false`,
        method: 'PUT',
        data
    })
}
import request from '@/utils/request'

// 请求获取文章数据

export const getArticles = params=>{
    return request({
        method:'get',
        url:'/v1_0/articles',
        params,
    })
}




export const getArticleById = articleId=>{
    return request({
        method:'get',
        url:`/v1_0/articles/${articleId}`,
    })
}


// 收藏
export const addCollect = target=>{
    return request({
        method:'post',
        url:`/v1_0/article/collections`,
        data:{
            target
        }
    })
}

// 取消收藏
export const deleteCollect = target=>{
    return request({
        method:'DELETE',
        url:`/v1_0/article/collections/${target}`,
        
    })
}


// 点赞
export const addLike = target=>{
    return request({
        method:'post',
        url:`/v1_0/article/likings`,
        data:{
            target
        }
    })
}

// 取消点赞
export const deleteLike = target=>{
    return request({
        method:'DELETE',
        url:`/v1_0/article/likings/${target}`,
        
    })
}
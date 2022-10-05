// 评论请求模块
import request from '@/utils/request'

// 获取文章评论
export const getComment = params=>{
    return request({
        method:'get',
        url:'/v1_0/comments',
        params,
    })
}



// 评论点赞
export const addCommentLike = target=>{
    return request({
        method:'post',
        url:'/v1_0/comment/likings',
        data:{
            target
        },
    })
}

// 取消评论点赞
export const deleteCommentLike = target=>{
    return request({
        method:'DELETE',
        url:`/v1_0/comment/likings/${target}`,
        
    })
}

// 发布评论，或回复评论
export const addComment = data=>{
    return request({
        method:'post',
        url:`v1_0/comments`,
        data
        
    })
}
import request from '../utils/request'
export const login = data=>{
    return request({
        method:'post',
        url:'/v1_0/authorizations',
        data
    })
}

export const sendSms = mobile=>{
    return request({
        method:'get',
        url:   `/v1_0/sms/codes/${mobile}`,
        
    })
}

// 获取用户自己的信息
export const getUserInfo = ()=>{
    
    return request({
        method:'get',
        url:   `/v1_0/user`,
        // 发送请求头数据
        
    })
}

// 获取用户频道列表
export const getUserChannels = ()=>{
    
    return request({
        method:'get',
        
        // url:"/v1_0/channels"
        url:   `/v1_0/user/channels`,
    })
}


// 关注用户
export const addFollow = target=>{
    
    return request({
        method:'post',
        // url:"/v1_0/channels"
        url:   `/v1_0/user/followings`,
        data:{
            target
        }
    })
}

// 取消关注用户
export const delteFollow = target=>{
    
    return request({
        method:'DELETE',
        // url:"/v1_0/channels"
        url:   `/v1_0/user/followings/${target}`,
        
    })
}

// 获取当前登录用户的个人资料
export const getUserProfile = ()=>{
    
    return request({
        method:'GET',
        url:   `/v1_0/user/profile`,
        
    })
}
// 更新用户资料

export const updateUserProfile = data=>{
    
    return request({
        method:'PATCH',
        url:   `/v1_0/user/profile`,
        data
        
    })
}




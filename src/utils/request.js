import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// 和json的用法差不多
// JSONBig.parse()
// JSONBig.stringify()
// 测试
/*
const jsonStr = '{"art_id":1245953273786007552}'

console.log(JSON.parse(jsonStr));
// 解析后不是数字了，转成一个对象，对象里面有个数字，把这个数字拆开了 ，需要用的时候转为字符串使用,转化为字符串后就可以用了
console.log(JSONBig.parse(jsonStr).art_id.toString());
*/
const request = axios.create({
    baseURL:'http://toutiao.itheima.net',
    
    //取axios的github找到后赋值过来改改
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
      
      try {
        return JSONBig.parse(data);
      } catch (error) {
        return data
      }
    }],

})
// 请求拦截器
request.interceptors.request.use(function (config) {
    // 请求发起会经过这里
    // config 本次请求的配置对象
    const {user} = store.state
    if(user && user.token){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // 这里必须return config这个对象，否则就停在这里出不去了
    return config;
  }, function (error) {
    // 请求出错（还没有发出去的）会进入这里
    
    return Promise.reject(error)
  });

  request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    
    return response;
  }, function (error) {
   
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.request.statusText==='Unauthorized'){
      console.log(111);
      location.href = '#/login'
    }
    
    return Promise.reject(error);
  });


export default request
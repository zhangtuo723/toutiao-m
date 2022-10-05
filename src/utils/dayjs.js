import Vue from 'vue'
import dayjs from 'dayjs'
// dayjs 默认语言是英文,我们这里配置为中文
import 'dayjs/locale/zh-cn'

// 导入和配置使用相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime' 
dayjs.extend(relativeTime) 

dayjs.locale('zh-cn') // 全局使用
// console.log(dayjs().locale('zh-cn').format('YYYY-MM-DD')) // 当前实例使用;

// console.log(dayjs().from(dayjs('2022:1:2:1:1:1')))

// 定义一个全局过滤器
Vue.filter('relativeTime',value=>{
    
    return dayjs().from(dayjs(value))
})
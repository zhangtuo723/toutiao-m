import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/login')
  },
  {
    path:"/",
    redirect: '/layout/home'
  },
  {
    path:'/search',
    name:'search',
    component:()=>import('@/views/search')
  },
  {
    path:'/article/:articleId',
    name:'article',
    component:()=>import('@/views/article'),
    // 这里组件中的props 要和这个动态参数重名才行，然后这个路由会个这个组件的porps传一个同名的参数
    props:true,//开启props传递参数

  },

  {
    path:'/layout',
    // name:'layout',
    component:()=>import('@/views/layout'),
    children:[
      
      {
        path:'home',//默认子路由，只能有一个 （path为空的情况）
        name:'/home',
        component:()=>import('@/views/home')
      },
      {
        path:'qa',
        name:'qa',
        component:()=>import('@/views/qa')
      },
      {
        path:'video',
        name:'video',
        component:()=>import('@/views/video')
      },
      {
        path:'my',
        name:'my',
        component:()=>import('@/views/my')
      },

    ]
  },

  {
    path:'/user/profile',
    name:'user-profile',
    component:()=>import('@/views/user-profile'),
  },
  
]

const router = new VueRouter({
  routes
})


export default router

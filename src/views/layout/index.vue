<template>
  <div class="layout-containner">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 标签导航栏 -->
    
    <van-tabbar  class="layout-tabbar" v-model="active" route>
      <van-tabbar-item to='/layout/home'>
        <i slot="icon" class="iconfont toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>

      <van-tabbar-item to='/layout/qa'>
        <i slot="icon" class="iconfont toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to='/layout/video'>
        <i slot="icon" class="iconfont toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to='/layout/my'>
        <i slot="icon" class="iconfont toutiao-wode"></i>
        <span class="text">{{$store.state.user?'我的':'未登录'}}</span>
      </van-tabbar-item>
      
    </van-tabbar>
  </div>
</template>

<script>


export default {
    data() {
    return {
      active: 0,
    };
  },
  
};
</script>

<style scoped lang='less'>
    .layout-containner{
      
        .layout-tabbar{
            i.iconfont{
                font-size: 40px;
            }
            span.text{
                font-size: 20px;
            }
        }
    }
</style>
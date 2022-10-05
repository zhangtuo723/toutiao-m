<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image
            round
            fit="cover"
            class="avatar"
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>

        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" class="mobile-img" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont toutiao-shoucang"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont toutiao-lishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 消息通知 小智同学 退出登录 -->

    <van-cell title="消息通知" is-link />
    <van-cell class="md9" title="小智同学" is-link />
    <van-cell
      v-if="user"
      clickable
      class="lgout-cell"
      title="退出登录"
      
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import {getUserInfo} from '@/api/user'

export default {
  name: "MyIndex",
  created () {
    if(this.user){
      // 如果用户登录了，则请求加载用户数据
      this.loadUserInfo()
    }
    
  },
  data () {
    return {
      userInfo:{}
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async loadUserInfo(){
      try {
        const {data} = await getUserInfo()
        // console.log(data);
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    onLogout() {
      // 退出提示
      // 确认退出：清除登录状态（容器中的user 和本地的user）
      this.$dialog.confirm({
        title: "标题",
        message: "弹窗内容",
      })
        .then(() => {
          this.$store.commit("setUser",null)
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  
};
</script>

<style scoped lang='less'>
.my-container {
  .header {
    height: 361px;
    // 无论文件在哪里 @都是指向src,css中@前要加~
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
      // background-color: pink;
      padding: 79px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      // background-color: #ccc;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 140px;
      i.iconfont {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .lgout-cell {
    text-align: center;
    color: #d86262;
  }
  .md9 {
    margin-bottom: 9px;
  }
}
</style>
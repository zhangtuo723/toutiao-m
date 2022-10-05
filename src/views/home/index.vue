<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel"></article-list>
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChennelEditShow=true">
        <i class="iconfont toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChennelEditShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
    <!-- 频道编辑组件 -->
    <channel-edit 
    :myChannels="channels"
    :active="active"
    @update-active='onUpdateActive'
    ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/article-list.vue";
import ChannelEdit from './components/channel-edit.vue'
import {mapState} from "vuex"
import {getItem} from '@/utils/storage'
export default {
  name: "HomeIndex",
  created() {
    this.loadChannels();
  },
  computed:{
    ...mapState(['user'])
  },
  methods: {
    onUpdateActive(index,a=true){
      // console.log('home',index);
      this.active = index
      this.isChennelEditShow = a
    },
    async loadChannels() {
      let channels = []
      try {
        // const { data } = await getUserChannels();
        // this.channels = data.data.channels;
        if(this.user){
          const { data } = await getUserChannels();
          channels = data.data.channels;
        }else{
          // 未登录
          const loadChannels = getItem("TOUTIAO_CHANNELS")
          if(loadChannels){
            channels = loadChannels
          }else{
            const { data } = await getUserChannels();
            channels = data.data.channels;
          }
        }

        this.channels = channels

      } catch (error) {
        this.$toast("获取频道数据失败");
      }
    },
  },
  components: {
    ArticleList,
    ChannelEdit,
  },

  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      isChennelEditShow:false,
    };
  },
};
</script>

<style scoped lang='less'>
.home-container {
  padding-bottom: 100px;
  padding-top: 174px;
  ::v-deep .van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__content {
      min-height: 79vh;
    }

    .van-tabs__wrap {
      position: fixed;
      top: 80px;
      z-index: 1;
      right: 0;
      left: 0;
      height: 82px;
    }

    .van-tab {
      min-width: 200px;
      // height: 82px;
      border: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
      &:before {
        content: "";
        width: 1px;
        height: 100%;
        // background-color: pink;
        position: absolute;
        left: 0;

        background-image: url("~@/assets/gradient-gray-line.png");
        background-size: contain;
      }
    }
  }
}
</style>
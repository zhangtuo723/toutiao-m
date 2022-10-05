<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh"  :success-text="refreshSuccessText" :success-duration='1500'>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
      <article-item v-for="(item, index) in list"
          :key="index"
          :article="item"
          >
      </article-item>
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from '@/components/article-item'
export default {
//   mounted(){
//     function findscroller(element){
//   element.onscroll = function(){console.log(element)}
//   Array.from(element.children).forEach(findscroller)
// }
// findscroller(document.body)
//   },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, //请求获取下一页数据时间戳
      error: false,
      isLoading: false,
      refreshSuccessText:''//下拉刷新成功提示文本
      
    };
  },
  methods: {
    async onRefresh() {
      // 请求获取数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1,
        });
        // 将数据放到列表顶部
        const {results} = data.data
        this.list.unshift(...results)
      // 关闭 下拉loding状态
        this.isLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        // console.log(error);
        this.isLoading = false
        this.refreshSuccessText = '刷新失败'
      }
      
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        });
        const { results } = data.data;
        // console.log(results);
        // this.list = this.list.concat(results)
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          // 下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (error) {
        // console.log("请求失败",error);
        // this.$toast('请求失败了')
        this.error = true;
        this.finished = false;
      }
      // finally{
      //   this.loading = false
      // }
    },
  },
  components:{
    ArticleItem
  }
};
</script>

<style scoped lang='less'>
.article-list{
  height:79vh;
  overflow-y:auto;
}
</style>
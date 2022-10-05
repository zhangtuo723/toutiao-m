<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，点击重试"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title"/>
    </van-list>
  </div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
  name: "searchResult",
  props:{
    searchText:{
        type:String,
        required:true,
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      perPage:20,
      error:false
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }

    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 1000);

    try {
        const {data} = await getSearchResult({
            page:this.page,
            per_page:this.perPage,
            q:this.searchText
        })
        const {results} = data.data
        
        // this.list = this.list.push(...results)
        this.list.push(...results)
       

        this.loading = false
        if(results.length){
            // 如果有，则更新下一个页码
            this.page++
        }else{
            this.finished = true
        }
    } catch (error) {
        this.error = true
        this.list = false
        // this.$toast('数据获取失败')
    }
    },

    


  },
};
</script>

<style>
</style>
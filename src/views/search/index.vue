<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form class="search-from" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus='isResultShow=false'
      />
    </form>


    <!-- 搜索栏 -->

    <!-- 搜索结果 -->
    <search-result
     v-if="isResultShow"
     :searchText="searchText"
     
    ></search-result>

    <!-- 联想建议 -->
    <search-suggestion 
    v-else-if="searchText"
    :search-text="searchText"
    @search="onSearch"
    ></search-suggestion>

    <!-- 搜索历史 -->
    <search-history v-else :searchHistorys="searchhistorys"
    @clear-search-histories="searchhistorys=[]"
    ></search-history>

    


    


  </div>
</template>

<script>
import { Toast } from 'vant';
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import {setItem,getItem}  from '@/utils/storage'
export default {
  name: "SearchIndex",
  components:{
    SearchHistory,SearchSuggestion,SearchResult
  },
  data() {
    return {
      searchText: '',
      isResultShow:false, // 控制搜索结果的展示
      searchhistorys:getItem("TOUTIAO_SEARCH_HISTORIES") || [] ,//搜索的历史记录数据
    };
  },
  watch:{
    searchhistorys:{
      deep:true,
      handler:(value)=>{
        // 保存本地
        setItem("TOUTIAO_SEARCH_HISTORIES",value)

      },
      
    }
  },
  methods: {
    onSearch(val) {
      // Toast(val);

      this.searchText = val

      const index = this.searchhistorys.indexOf(val)
      if(index!==-1){
        this.searchhistorys.splice(index,1)
      }
      this.searchhistorys.unshift(val)
      this.isResultShow = true


      // 搜索界面
    },
    onCancel() {
      this.$router.back()
    },
  },
};

</script>

<style scoped lang='less'>
.search-container{
  padding-top: 108px;
  .van-search__action{
  color:#fff
  }
  .search-from{
    position: fixed;
    top:0;
    left: 0;
    right:0;
    z-index:1;
  }

}
</style>
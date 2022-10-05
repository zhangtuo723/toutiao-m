<template>
  <div class="search-suggestion">
    <van-cell  icon="search" 
    v-for="(text,index) in suggestions"
    :key="index"
    @click="$emit('search',text)"
    >
    <span v-html="highlight(text)" slot="title"></span>
    </van-cell>
    
    <!-- 过滤器，貌似只能在插值绑定这里 -->
    
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";
import {debounce} from 'lodash'
export default {
  name: "searchSuggestion",
//   filters:{
//     aaaa:function(val){
//         return `<span style="color:red">${val}</span>`
//     }
//   },
  data () {
    return {
        suggestions:[],
        time :null,
        htmlStr:'Hello <span style="color:red">world</span>'
    }
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    searchText: {
      deep: true,
    // handler(newValue) {

    //     // 防抖
    //     // if(this.time!==null){
    //     //     clearTimeout(this.time)
    //     // }
    //     // this.time = setTimeout(()=>{
    //     //     this.loadSearchSuggestions(newValue)
    //     // },500)
    //     debounce(this.loadSearchSuggestions,500,newValue)
         

    //   },
    handler: debounce(function(newValue){ //这里不能用箭头函数，这个函数应该在debounce中做了很多的处理，最后返回出来一个函数给handler，this当时没有用，做了几次出来后在用的时候已经不知道指向谁了

            // console.log(this);
            this.loadSearchSuggestions(newValue)
    },200),

      // 第一次触发，因为第一次数据过了时候这个组件还没有（父组件穿过后才show的），所以不会被watch检测到变化
      immediate: true,
    },
  },
  methods:{
    highlight(text){
        // 这里后端返回的数据 有的式null???
        if(!text)return
        // return text.replace(this.searchText,`<span style="color:red">${this.searchText}</span>`)
        const highlightStr = `<span class='active'>${this.searchText}</span>`
        var reg = new RegExp(this.searchText, 'gi');
        return text.replace(reg,highlightStr)
    },
    async loadSearchSuggestions(q){
        try {
          const { data } = await getSearchSuggestion(q);
          this.suggestions = data.data.options
        //   console.log(data.data);
        } catch (error) {
            this.$toast('数据获取失败')
        }
    }
  }
};
</script>

<style scoped lang="less">
/deep/ span.active{
    color:#3296fa
}
</style>
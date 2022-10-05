<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error='error'
  error-text='加载失败点击重试'
  :immediate-check="false"
>
  
  <comment-item 
  v-for="(item,index) in list" 
  :key="index" 
  :comment='item'
  @replay-click="$emit('reply-click',$event)"
  />

</van-list>
</template>

<script>
import  {getComment} from '@/api/comment'
import  CommentItem from "./comment-item.vue"
export default {
  components:{
    CommentItem
  },
  created(){
    this.loading = true
    this.onLoad()
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset:null,
      limit:10,
      error:false,
    };
  },
  props:{
    source:{
        type:[Number,String,Object],
        required:true,
    },
    // value:{
    //     // type:Number,
    //     required:true,
    // },
    list:{
      type:Array,
      // props中默认值必须这样给
      // default:function(){
      //   return {}
      // }
      default:()=>[]
    },
    type:{
      type:String,
      default:'a',
      // 自定义props验证
      validator(value){
        return ['a','c'].includes(value)
      }
    }
  },
  methods: {
    async onLoad() {
    
    try {
        const {data} =  await getComment({
            type:this.type,
            source:this.source.toString(),//源id 文章id 或评论的id
            offset:this.offset,
            limit:this.limit, //每页数据量
            
        })
        // console.log(data);
        const {results,total_count:totalCount} = data.data
        this.list.push(...results)
        // console.log(totalCount);
        this.$emit('totalShow',totalCount)
        
        if(results.length){
           
            this.offset = data.data.last_id
        }else{
            
            this.finished = true
        }
        
        
    } catch (error) {
        this.error = true
        this.loading = false
        
    }
    
    this.loading=false


       
    },
  },
};
</script>

<style>

</style>
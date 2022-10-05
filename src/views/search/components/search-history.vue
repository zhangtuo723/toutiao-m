<template>
  <div class="search-history">
    <van-cell title="搜索历史" >
        
        <div v-if="isDeleteShow" >
            <!-- <span @click="searchHistorys.empty()">全部删除</span> --> 
            <span @click="$emit('clear-search-histories')">全部删除</span>
            &nbsp;&nbsp;
            <span @click="isDeleteShow=false">完成</span>
        </div>
        <van-icon v-else name="delete" @click="isDeleteShow=true"/>
        
    </van-cell>

    <van-cell :title="item" 
    v-for="(item,index) in searchHistorys"
    :key="index"
    @click="onSearchItemClick(item,index)"
    >
        <van-icon name="close" />
    </van-cell>

   
    
    

  </div>
</template>

<script>
export default {


    name:'SearchHistory',
    methods:{
        onSearchItemClick(item,index){
            if(this.isDeleteShow){
                this.searchHistorys.splice(index,1)
            }else{
                // 搜索
            }
        }
    },
    data () {
        return {
            isDeleteShow:false,
        }
    },
    props:{
        searchHistorys:{
            type:Array,
            required:true,
        }
    }
}
</script>

<style>

</style>
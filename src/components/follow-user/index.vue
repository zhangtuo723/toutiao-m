<template>
    <van-button
      v-if="!isFollowed"
      :loading="loading"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      @click="onFollow"
      >关注</van-button
    >
    <van-button
      :loading="loading"
      v-else
      class="follow-btn"
      round
      size="small"
      @click="onFollow"
    >
      已关注
    </van-button>
  
</template>

<script>
import {addFollow,delteFollow} from '@/api/user'
export default {
    data () {
        return {
            loading:false
        }
    },

    // 自定义v-model
    model: {
    prop: 'isFollowed',
    event: 'update-value'
  },
    props:{
        isFollowed:{
            type:Boolean,
            required:true,
        },
        userId:{
            type:[Number,String,Object],
            required:true
        }
    },
    methods:{
        async onFollow(){
        this.loading = true;
        try {
            
            if(this.isFollowed){
                // 已关注，取消关注
                await delteFollow(this.userId)
                
            }else{
               
                await addFollow(this.userId)
                
            }
            // this.isFollowed=!this.isFollowed
            // this.$emit('update-is_followed')

            // this.$emit('input',!this.value)
            this.$emit('update-value',!this.isFollowed)
            
           
            
        } catch (error) {
            let message = '操作失败'
            if(error.response && error.response.status===400){
                message = '不能关注自己'
            }
            this.$toast(message)
        }
        this.loading = false;
        
    },
    }

};
</script>

<style>
</style>
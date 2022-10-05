<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :loading="loading"
    :class="{ liked: value }"
    @click="onCollect"
  />
</template>

<script>
import { addLike, deleteLike } from "@/api/article";

export default {
  name: "LikeArticle",
  data() {
    return {
      loading: false,
    };
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onCollect() {
        this.loading=true
        try {
            if(this.value!==1){
                // 点赞
                
                await addLike(this.articleId)
            }else{
                //取消点赞
                
                await deleteLike(this.articleId)
            }
                
                this.$emit('input',this.value==1?-1:1)
           
            
            
        } catch (error) {
            this.$toast('点赞失败')
            console.log(error);
        }
        this.loading=false
      
    },
  },
};
</script>

<style scoped lang='less'>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
<template>
  <div class="comment-reply">
    


    <van-nav-bar
      :title="comment.reply_count>0? `${comment.reply_count}'条回复'`:'暂无回复'"
    >
    <van-icon name="cross" slot="left"
    @click="$emit('close')"
    ></van-icon>
    </van-nav-bar>
    <div class="scroll_wrap">

        

        <!-- 当前评论项 -->
    <comment-item :comment="comment"></comment-item>
    <!-- /当前评论项 -->

    <!-- 评论回复列表 -->
        <van-cell title="全部回复"/>
        <comment-list
        :list='commentList'
        :source="comment.com_id"
        type="c"
        ></comment-list>
    <!-- /评论回复列表 -->


   

    </div>
     <!-- 发布评论 -->

    <div class="post-wrap">
        <van-button class="post-btn" size="small" round @click="isPostShow=true">写评论</van-button>
    </div>
    <!-- 发布评论 -->

    <van-popup v-model="isPostShow" position="bottom">
        <comment-post
        :target="comment.com_id"
        @post-success="onPostSuccess"
        ></comment-post>
    </van-popup>


    

  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post'
export default {
    data () {
        return {
            isPostShow:false,
            commentList:[],// 评论的回复列表
        }
    },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  components:{
    CommentItem,
    CommentList,
    CommentPost,
  },
  methods:{
    onPostSuccess(data){
        // console.log(data);
        this.comment.reply_count++
        this.isPostShow = false
        this.commentList.unshift(data.new_obj)
    }
  }
};
</script>

<style scoped lang='less'>

.comment-reply{
    height: 100vh;
}

.scroll_wrap{
    position: fixed;
    top: 92px;
    left:0;
    right:0;
    bottom: 88px;

    overflow-y: auto;
    background-color: #fff;
}
.post-wrap{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-top: #d8d8d8;
    .post-btn{
        width: 60%;
    }
}
</style>
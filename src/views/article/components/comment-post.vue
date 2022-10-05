<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button 
    class="post-btn" 
    @click="onPost"
    :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from "@/api/comment";
export default {
  name: "CommentPost",
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  // inject:['articleId'],
  inject:{
    articleId:{
      type:[Number,String,Object],
      default:null,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      this.$toast.loading({
        // 持续时间默认两秒
        message: "发布中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 为0时候不会消失
      });

      try {
        const { data } = await addComment({
          target: this.target.toString(),
          content: this.message,
          art_id: this.articleId?this.articleId.toString():null,
        });
        console.log(data);

        this.message = "";
        this.$emit("post-success", data.data);
        this.$toast.success("发布成功");
      } catch (error) {
        this.$toast.fail("发布失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>

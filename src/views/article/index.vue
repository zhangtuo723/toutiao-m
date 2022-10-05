<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>

          <!-- 关注组件 -->
          <!-- 模板中的$event是事件参数，应该是：$event是事件的默认第一个参数，不传的话$event应该是事件源，emit不传参的话好像是默认传入undefined参数 -->

          <!-- <follow-user class="follow-btn" :is-followed='article.is_followed' :user-id='article.aut_id' 
            @update-is_followed='article.is_followed=$event'/> -->

          <!-- 当传递给子组件的数据需要修改的时候，可以使用v-mode -->
          <!-- v-mode会给子组件传递一个value的props -->
          <!--
                相当于下面的简写
                value = 'article.is_followed'
                @input = 'article.is_followed = $event'  

            -->

          <!-- 
                一个组件上只能用一次v-model,如果有多个数据需要实现类似与 v-model 的效果，
                可以使用.sync修饰符合，相当于多次使用的v-model
             -->

          <follow-user
            class="follow-btn"
            v-model="article.is_followed"
            :user-id="article.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 文章评论 -->
        <comment-list
          :source="article.art_id"
          
          :list="commentList"
          @reply-click="onReplyClick"
          @totalShow='totalCommentCount=$event'
        ></comment-list>
        <!-- 文章评论 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >

          <van-icon name="comment-o" :info="totalCommentCount" color="#777" />

          <!--  -->
          <collect-article
            class="btn-item"
            v-model="article.is_collected"
            :article-id="article.art_id"
          />

          <like-article
            v-model="article.attitude"
            :article-id="article.art_id"
          ></like-article>

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 发布评论 -->
        <van-popup v-model="isPostShow" position="bottom">
          <comment-post
            :target="article.art_id"
            @post-success="onPostSuccess"
          ></comment-post>
        </van-popup>
        <!-- 发布评论 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 评论回复 -->
    <van-popup 
    v-model="isReplyShow" 
    position="bottom"

    
    >
      <comment-reply :comment='currentComment'
       
      v-if='isReplyShow'
      @close='isReplyShow=false'
      
      ></comment-reply>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getArticleById } from "@/api/article";
import { ImagePreview } from "vant";
import FollowUser from "@/components/follow-user";
import CollectArticle from "@/components/collect-article";
import LikeArticle from "@/components/like-article";
import CommentList from "./components/comment-list.vue";
import CommentPost from "./components/comment-post.vue";
import CommentReply from "./components/comment-reply.vue";

// ImagePreview({
//   images: [
//     'https://img01.yzcdn.cn/vant/apple-1.jpg',
//     'https://img01.yzcdn.cn/vant/apple-2.jpg',
//   ],
//   startPosition: 1,
//     onClose() {
//     // console.log('onclose');
//   },
// });

export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply,
  },
// 给所有后代提供数据
provide: function () {
  return {
    articleId:this.articleId
  }
},

  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      followLoading: false,
      article: {},
      loading: true,
      errStatus: 0, //失败的状态码
      totalCommentCount: null,
      isPostShow: false, // 控制发布评论的显示状态
      commentList: [],
      isReplyShow: false,
      currentComment:{},//当前回复评论对象
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle();
  },
  mounted() {},
  methods: {
    onPostSuccess(data) {
      (this.isPostShow = false), this.commentList.unshift(data.new_obj);
    },

    previewImage() {
      // 得到所有的image阶段
      const articleContent = this.$refs["article-content"];

      // document 是获取body
      const imgs = articleContent.querySelectorAll("img");
      const images = [];
      imgs.forEach((img, index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
            onClose() {
              // console.log('onclose');
            },
          });
        };
      });
    },
    async loadArticle() {
      try {
        const { data } = await getArticleById(this.articleId);
        this.article = data.data;

        // 初始化图片点击预览，这个虽然可以在渲染完毕后执行，但是不使用与这种情况，渲染后还需要v-if判断是否显示的情况，
        // this.$nextTick(()=>{
        //     console.log(this.$refs['article-content']);
        // })

        setTimeout(() => {
          this.previewImage();
        }, 0);
      } catch (error) {
        if (error.response && error.response.status === 404)
          this.errStatus = 404;
        console.log("获取数据失败", error);
      }
      //  请求成功 关闭loading
      this.loading = false;
      //   console.log(this.article);
    },
    onReplyClick(comment) {
      console.log(comment);
      this.isReplyShow = true;
      this.currentComment = comment
    },
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
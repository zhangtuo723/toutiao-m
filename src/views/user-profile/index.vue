<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow=true"></van-cell>
    <van-cell title="性别" :value="user.gender===0?'男':'女'" is-link @click="isUpdateGenderShow=true"></van-cell>
    <van-cell title="生日" :value="user.birthday" is-link></van-cell>
    <!-- /个人信息 -->

    <!-- 编辑昵称 -->
    <van-popup 
    
    v-model='isUpdateNameShow' 
    
    style="height:100%"
    position="bottom"
    
    >
      <updae-name
       @close="isUpdateNameShow=false"
       v-model.trim='user.name'
       v-if="isUpdateNameShow"
       
       ></updae-name>
    </van-popup>
    <!-- 编辑昵称 -->

    <!-- 编辑性别 -->

    <van-popup 
    
    v-model='isUpdateGenderShow' 
    position="bottom"
   

    >
      <update-gender
       @close="isUpdateGenderShow=false"
       v-if="isUpdateGenderShow"
       v-model="user.gender"
       
      ></update-gender>
    </van-popup>

    <!-- /编辑性别 -->

  </div>
</template>

<script>
import {getUserProfile} from '@/api/user'
import UpdaeName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
export default {
  components:{
    UpdaeName,
    UpdateGender
  },
  created(){
    this.loadUserProfile()
  },
  methods:{
    async loadUserProfile(){
      try{
        const {data} = await getUserProfile();
        this.user = data.data
      } catch(err){
        this.$toast('数据获取失败')
      }
    }
  },

  data () {
    return {
      user:{},
      isUpdateNameShow:false,
      isUpdateGenderShow:false,
    }
  }


};
</script>

<style scoped lang='less'>
.user-profile{
  .avatar{
    width:60px;
    height:60px;
  }
  .van-popup{
    background-color: #f5f7f9;
  }
}
</style>
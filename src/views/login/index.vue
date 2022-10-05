<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon name="cross" 
      slot="left" 
      color="#fff"
      @click="$router.back()"
      />
      <!-- back是退回上一层路由 -->
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
      >
        <!-- <template v-slot:left-icon>
        <i class="iconfont toutiao-shouji"></i>
      </template> -->

        <i class="iconfont toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down :time="time" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false"/>
          <van-button
            v-else
            class="send-sms-btn"
            size="small"
            type="default"
            native-type="button"
            round
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// import Vue from 'vue';
// import { Toast } from 'vant';

// Vue.use(Toast);

import { login,sendSms } from "@/api/user";
export default {
  data() {
    return {
      isCountDownShow:false,
      time: 6*1000,
      user: {
        mobile: "17630360038",
        code: "246810",
      },
      userFormRules: {
        mobile: [
          { message: "不能为空", required: true },
          { message: "格式有误", pattern: /1[3|5|7|8]\d{9}/ },
        ],
        code: [
          { message: "不能为空", required: true },
          { message: "格式有误", pattern: /\d{6}/ },
        ],
      },
    };
  },
  methods: {
    async onSendSms() {
      // 1，校验手机号码
      try {
        await this.$refs.loginForm.validate("mobile");
        console.log("验证通过");
      } catch (error) {
        console.log("验证失败", error);
        return;
      }

      // 2 验证通过显示倒计时
      this.isCountDownShow = true
      // 3 请求发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        
      } catch (error) {
        if(error.response.status===429){
          this.$toast('发送太频繁了')
        }else{
          this.$toast('发送失败，请稍后重试')
        }
        this.isCountDownShow = false
      }



    },
    async onSubmit() {
      //   console.log("submit", values);
      const user = this.user;
      // todo 表单验证
      // Toast是全局的，想要使用需要替换this.$toast
      this.$toast.loading({
        // 持续时间默认两秒
        message: "登录中中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 为0时候不会消失
      });

      // 提交表单登录请求
      try {
        const {data} = await login(this.user);
        
        this.$store.commit('setUser',data.data)
        this.$toast.success("登录成功"); // 任何一个新的toast别调用就会关闭老的
        // 跳转会原来页面
        // back不严谨，
        this.$router.back()

      } catch (err) {
        console.log("登录失败", err);
        this.$toast.fail("登录失败，请重试");
      }

      // console.log(res);
      // 根据相应处理后续操作
    },
  },
};
</script>

<style scoped lang='less'>
.send-sms-btn {
  width: 152px;
  height: 46px;
  background-color: #ededed;
  line-height: 46px;

  font-size: 22px;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fc;
    border: none;
  }
}
</style>
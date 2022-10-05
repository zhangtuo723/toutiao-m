<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
    <!-- 导航栏 -->

    <!-- 输入框 -->
    <div class="field-wrap">
        <van-field

      
      v-model="localName"
      rows="2"
      autosize
      
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
    <!-- 输入框 -->
  </div>
    </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
    props:{
        value:String,
        required:true
    },
    data () {
        return {
            localName:this.value,
        }
    },
    methods:{
        async onConfirm(){
            this.$toast.loading({
                message:"保存中...",
                forbidClick:true,
                duration:0
            })
            try {
                const localName = this.localName
                console.log(localName);
                if(!localName.length){
                    this.$toast('昵称不能为空')
                    return
                }

                const {data} =  await updateUserProfile({
                    name:localName
                })
                // console.log(data);
                this.$emit('input',localName)
                this.$toast.success('更新成功')
            } catch (error) {
                this.$toast.fail('更新失败')
            }
            this.$emit('close')
        }
    }
};
</script>

<style scoped lang='less'>
.field-wrap{
    padding:20px
}
</style>
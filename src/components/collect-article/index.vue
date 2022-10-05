<template>
    <van-button  
    :icon='value?"star":"star-o"'
    :loading="loading"
    :class="{collected:value}"
    @click="onCollect"
    />
</template>

<script>
import {addCollect,deleteCollect} from '@/api/article'


export default {
    name:'CollectArticle',
    data () {
        return {
            loading:false
        }
    },
    props:{
        value:{
            type:Boolean,
            required:true,
        },
        articleId:{
            type:[Number,String,Object],
            required:true
        }
    },
    methods:{
        async onCollect(){
            this.loading=true
            try {
                if(this.value){
                    await deleteCollect(this.articleId)
                }else{
                    await addCollect(this.articleId)
                }
            } catch (error) {
                this.$toast('操作失败')
            }
            this.loading=false

            this.$emit('input',!this.value)
            this.$nextTick(()=>{
                this.$toast.success(this.value?'收藏成功':"取消收藏")
            })
            

        }
    }

}
</script>

<style scoped lang='less'>
    .collected{
        color:#ffa500;
    }
</style>
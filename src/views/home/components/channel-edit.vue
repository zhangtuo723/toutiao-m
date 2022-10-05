<template>
  <div class="channel-edit">
    <van-cell>
      <div slot="title" class="title-text">我的频道</div>
      <van-button 
      type="danger" 
      plain round size="mini" 
      class="edit-btn"
      @click="isEdit=!isEdit"
      >
        {{isEdit?'完成':'编辑'}}
      </van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        
        class="grid-item"
        v-for="(channel,index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel,index)"
      >
      <span class="text" 
      :class="{active:index===active}"
      slot="text">{{channel.name}}</span>

        <van-icon 
        v-show="isEdit && !fiexChannels.includes(channel.id)"
        slot="icon"
        name='clear'>

        </van-icon>

      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell>
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recomment-grid">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(channels,index) in recommendChannels"
        :key="index"
        :text="channels.name"
        @click="onAddChannel(channels)"
      />
    </van-grid>
  </div>
</template>

<script>
import {getAllChannels,
addUserChannel,
deleteUserChannel} from '@/api/channel'
import {mapState} from 'vuex'
import {setItem} from '@/utils/storage'
export default {
  name: "ChannelEdit",
  data () {
    return {
        allChannels:[],
        isEdit:false, //控制编辑状态的显示
        fiexChannels:[0] // 固定频道，不允许删除
    }
  },
  computed:{
    // recommendChannels(){
    //     const channels = []
    //     this.allChannels.forEach(channel=>{
    //         const ret =  this.myChannels.find(myChannel=>{
    //             return myChannel.id === channel.id
    //         })
    //         // 如果我的频道中包括该频道项，则收集到推荐频道中
    //         if(!ret){
    //             channels.push(channel)
    //         }
    //     })

    //     return channels  
    // }
    ...mapState(['user']),

    recommendChannels(){
        // const channels = []
        return this.allChannels.filter(item=>{
            return !this.myChannels.find(myChannel=>myChannel.id===item.id)
        })    
    }


  },
  created(){
    this.loadAllChannels()
  },
  methods:{
    async deleteChannel(channel){
        if(this.user){
            // 一登陆，数据更新到线上
            try {
                await deleteUserChannel(channel.id)
            } catch (error) {
                this.$toast('操作失败请重试')
            }
        }else{
            // 未登录，将数据保存到本地
            setItem('TOUTIAO_CHANNELS',this.myChannels)
        }
    },

    onMyChannelClick(channel,index){
        // console.log(channel,index);
        // 如果是编辑就删除

        if(this.fiexChannels.includes(channel.id) && this.isEdit){
            // 如果是固定频道则不删除
            return
        }

        if(this.isEdit){
            // console.log("del");
            if(index<=this.active){
                // 激活频道的索引 - 1
                // 把这个-1的active传个父亲
                this.$emit("update-active",this.active-1,true)
            }
            // 处理持久化
            this.deleteChannel(channel)

            this.myChannels.splice(index,1)
        }else{
            // console.log('change');
            this.$emit('update-active',index,false)
        }
        // 非编辑就切换状态
    },

    async loadAllChannels(){
        try {
            const {data} =  await getAllChannels()
            this.allChannels = data.data.channels
        } catch (error) {
            this.$toast('数据获取失败')
        }
    },
    async onAddChannel(channel){
        // console.log(channel);
        // 父亲穿过来的是个对象，操作对象内部的值，全局的都会变化
        this.myChannels.push(channel)

        // 持久化
        if(this.user){
            // 已登录，把数据放到线上
            try {
                await addUserChannel({
                id:channel.id,
                seq:this.myChannels.length //序号
                })
                // this.$toast('保存成功')
            } catch (error) {
                this.$toast('保存失败')
            }
        }else{
            // 未登录把数据存到本地
            setItem('TOUTIAO_CHANNELS',this.myChannels)
        }


    },
  },
  props:{
    myChannels:{
        type:Array,
        require:true,
    },
    active:{
        type:Number,
        require:true,
    }
  }
};
</script>

<style scoped lang='less'>
.channel-edit {
  padding-top: 85px;
  .title-text {
    font-size: 32px;
    color: #3333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;

     .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text,.text {
        white-space: nowrap;
        font-size: 28px;
        color: #222;
        margin-top: 0;
        
      }
        .active{
            color: red;
        }
        .van-grid-item__icon-wrapper{
            position: unset;
        }

    }
  }

  /deep/ .my-grid {
    .grid-item {
        
      .van-icon-clear{
        position: absolute;
        font-size: 30px;
        right: -10px;
        top: -10px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recomment-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
        
      }
    }
  }
}
</style>
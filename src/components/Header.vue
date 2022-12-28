<template>
  <div class="header">
    <van-icon name="arrow-left" class="icon" @click="toBack"/>
    <div>{{ title }}</div>
    <div class="edit" v-if="edit" @click="handleEdit">
      {{ store.state.edit ? "编辑" : "完成" }}
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {Toast} from 'vant'
export default {
    props:['title', 'edit',],
    setup(){
      const router = useRouter()//创建路由实例
      const store = useStore()//创建vuex实例
      // 创建返回方法
      const toBack = ()=>{
        router.back()//返回上级路由
      }

      // 点击编辑事件
      const handleEdit = ()=>{
        if(store.state.cartList.length){
          store.commit('changeDelete')
        }else{
          Toast.fail('请添加商品到购物车!')
        }
      }
      return{
        toBack,
        handleEdit,
        store,
      }
    }
}
</script>

<style lang="less" scoped>
.header {
  background-color: #fff;
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
  .edit {
    font-size: 16px;
    position: absolute;
    right: 15px;
    font-weight: normal;
  }
  .icon {
    position: absolute;
    left: 10px;
  }
}
</style>
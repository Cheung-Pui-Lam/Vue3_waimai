<template>
    <div class="cart">
      <!-- 将编辑设为true传过去给子组件 -->
    <Header title="购物车" :edit="true"/>
    <CartDetail v-if="isShow" :changeShow="changeShow"/>
    <Empty v-else/>
    <Footer />
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue'
import Empty from '../../components/Empty.vue'
import Header from '../../components/Header.vue'
import CartDetail from './components/CartDetail.vue'
import {onMounted,ref} from 'vue'
import {useStore} from 'vuex'
export default {
  components:{
    Footer,
    Empty,
    Header,
    CartDetail,
  },
  setup() {
    const isShow = ref(true)//设置一个表示位用于展示空页面还是购物车订单页面
    const store = useStore()

    // 判断函数,判断vuex中是否有订单数据来控制标志位
    const init = ()=>{
      if(store.state.cartList.length === 0){
        isShow.value = false
      }
      // console.log(store.state.cartList);
    }
    // 全部商品删除则将显示空页面标志位取反
    const changeShow = () => {
      isShow.value = false;
    };
    // 页面一挂载酒判断数据
    onMounted(()=>{
      init()
    })

    return{
      isShow,
      store,
      init,
      changeShow,
    }
  }
}
</script>

<style lang="less" scoped>
.cart{
  display: flex;
  flex-flow: column;
  height: 100%;
  font-size: 12px;
  .content{
    flex: 1;
    overflow-y: auto;
  }
}
</style>
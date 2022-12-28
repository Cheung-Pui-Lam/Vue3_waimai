<template>
  <div class="create-order">
    <Header title="生成订单"/>
    <!-- 编辑联系人(用户资料区) -->
    <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
    <!-- 商品区 -->
    <div class="content">
      <div v-for="(item, index) in store.state.orderList" :key="index">
        <!-- 使用vant卡片来描述信息 -->
        <van-card
          :num="item.num"
          :price="item.price"
          :title="item.title"
          :thumb="item.pic"
        />
      </div>
    </div>
    <!-- 商品金额以及生成订单区域 -->
    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>￥{{ totalPrice }}</span>
      </div>
      <van-button
        type="primary"
        class="pay-btn"
        block
        color="skyblue"
        @click="handleCreateOrder"
        >生成订单</van-button
      >
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import { reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { Dialog } from "vant";
export default {
  components: {
    Header,
  },
  setup(){
    const data = reactive({
      name: "lam",
      tel: "123456",
      totalPrice: 0,
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    // 点击编辑跳转到地址编辑区域
    const onEdit = () => {
      router.push("/address");
    };
    // 商品价钱
    const initPrice = () => {
      let price = 0;
      if (store.state.orderList.length) {
        store.state.orderList.forEach((item) => {
          price += item.num * item.price;//下单商品的总价
        });
      }
      data.totalPrice = price;//商品总价钱传递给totalPrice
    };
    // 初始化用户的地址(信息)
    const initUser = () => {
      store.state.userAddress.forEach((item) => {
        if (item.isDefault) {
          data.name = item.name;//用户名(vuex中)
          data.tel = item.tel;//用户电话(vuex中)
        }
      });
    };
    // 生成订单
    const handleCreateOrder = () => {
      Dialog({
        title: "提示",
        message: "生成订单成功",
      }).then(() => {
        // 要和购物车联系起来(你提交结算的商品在购物车中应该相对应的要减少)
        let newList = store.state.cartList.filter((item) => {
            // 将传过来的id在购物车中对应删除(即保留没有被勾选上的,保留id没有传过来的)
          return !route.query.list.includes(item.id + "");
        });
        store.commit("delete", newList);
        store.commit("orderListEnd");
        router.push("/order");
      });
    };
    // 订单页面一挂载就开始计算传过来的商品价格以及用户信息
    onMounted(() => {
      initPrice();
      initUser();
    });
    return {
      ...toRefs(data),
      onEdit,
      store,
      initPrice,
      handleCreateOrder,
    };
  }
}
</script>

<style lang="less" scoped>
.create-order {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }
  .pay-wrap {
    padding: 10px 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: #999;
        font-size: 18px;
      }
    }
    .pay-btn {
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>
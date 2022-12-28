<template>
    <!-- 店铺页面 -->
    <div class="storeDetails">
        <Header title="店铺"/>
        <!-- 内容区域 -->
        <div class="content">
            <!-- 商店图片 -->
            <div class="img"></div>
            <!-- 商品区域 -->
            <div class="foodSort">
                <div class="name">
                    {{ title }}
                    <img :src="img" alt="" class="store-img">
                </div>
                <van-tabs color="skyblue">
                    <van-tab v-for="(item,index) in storeData" :key="index"
                        :title="item.name">
                        <!-- 菜品组件(将索引值和菜品数据传过去) -->
                        <FoodList :index="index" :foodData="item.data"/>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <!-- 底部购买区域 -->
        <van-action-bar>
            <van-action-bar-icon icon="chat-o" text="客服"/>
            <van-action-bar-icon 
                icon="cart-o" 
                text="购物车" 
                :badge="store.state.cartList.length" 
                @click="goCart"    
            />
            <van-action-bar-button 
                text="加入购物车" 
                @click="handleAddCart"
                color="skyblue"
            />
            <van-action-bar-button 
                text="立即购买" 
                @click="goBuy"
                color="#0799fb"
            />
        </van-action-bar>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted} from "vue";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import Header from '../../components/Header.vue'
import FoodList from './components/FoodList.vue'
import { Toast } from 'vant';
import { getApiStoreData } from "../../api/api";//引入mock接口
export default {
    components:{
        Header,
        FoodList,
    },
    setup() {
        let router = useRouter()//路由实例
        let store = useStore()//store实例,类比于vue2中略有不同
        let storeDataRes = reactive({//商店数据(通过mock获取)
            title: "鱼拿酸菜鱼",
            img: "https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440",
            storeData: [],
        });
        // 封装mock获取数据方法
        const getStoreData = () => {
            getApiStoreData().then((res) => {
                storeDataRes.storeData = res;//商店数据
            });
        };
        // 页面一挂载就获取商店数据
        onMounted(() => {
            getStoreData();
        });

        // 添加进购物车的方法
        const handleAddCart = (type)=>{
            // 创建一个新数组用于存取当前数据中菜品的num数(即用户的菜品下单数)
            const newList = store.state.cartList || []//保证先取到是vuex中的数据,否者一换页面,就会新增一个newList空数组会出现bug
            storeDataRes.storeData.forEach(item=>{
                item.data.items?.forEach(item=>{
                    item.children.forEach(item=>{
                        if(item.num > 0){
                            newList.push(item)
                        }
                    })
                })
            })
            if(newList .length === 0){
                Toast('请选择商品!')
                return
            }
            store.commit('addCart',newList)//将购物车数据存入vuex中
            // 判断当前是否为立即购买,是则跳转到购物车页面
            type === 'buy'? goCart():''
        }
        // 点击跳转到购物车页面
        const goCart = ()=>{
            router.push('/cart')
        }
        // 点击购买
        const goBuy = ()=>{
            // 添加到购物车
            handleAddCart('buy')
        }
        return{
            ...toRefs(storeDataRes),
            handleAddCart,
            store,
            goCart,
            goBuy,
        }
    }
}
</script>

<style lang="less" scoped>
.storeDetails {
  height: 100%;
  display: flex;
  flex-flow: column;
  .content {
    flex: 1;
    overflow-y: auto;
    .img {
      background: url("../../assets/yuna.jpg") no-repeat center/cover;
      width: 100%;
      height: 150px;
    }
    .foodSort {
      height: 500px;
      background-color: #fff;
      margin-top: -30px;
      border-radius: 20px 20px 0 0;

      .sort {
        margin-top: 10px;
      }
      .name {
        display: flex;
        padding: 20px;
        justify-content: space-between;
        .store-img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          margin-top: -30px;
        }
      }
    }
  }
}
</style>
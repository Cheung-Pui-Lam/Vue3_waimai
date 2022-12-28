<template>
  <div class="cartDetail">
    <div class="content">
        <van-checkbox-group v-model="checked" @change="groupChange">
            <!-- 将数据以及是否展示多悬空传过去给子组件 -->
            <div v-for="(item,index) in store.state.cartList" :key="index" >
                <ListItem :item="item" :handleChange="handleChange" :showCheckBox="true"/>
            </div>
        </van-checkbox-group>
    </div>
    <!-- 提交订单 -->
    <van-submit-bar 
        :price="allPrice" 
        button-text="结算" 
        @submit="onSubmit" 
        class="submit-all" 
        button-color="skyblue"
        v-if="store.state.isDelete"
        >
        <van-checkbox v-model="submitChecked" checked-color="skyblue" @click="choseAll">全选</van-checkbox>
    </van-submit-bar>
    <!-- 编辑删除 -->
    <div class="buy" v-else>
        <div class="left">
            <van-checkbox v-model="submitChecked" checked-color="skyblue" @click="choseAll">全选</van-checkbox>   
        </div>
        <div class="delete" @click="handleDelete">删除</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ListItem from "../../../components/ListItem.vue";
import { Toast } from "vant";
export default {
    props: ["changeShow"],
    components:{
        ListItem,
    },
    setup(props) {//如果后面要用到props属性就引入进来
        const router = useRouter();
        const store = useStore()
        const data =  reactive({
            checked:[],
            submitChecked:true,
        })

        // 价格
        const allPrice = computed(() => {
            let countList = updateData();
            let sum = 0;//总价
            countList.forEach((item) => {
                sum += item.num * item.price;//总价
            });
            return sum * 100;
        });
        // 更新数据函数
        const updateData = (type) => {
            return store.state.cartList.filter((item) => {
            return type === "delete"
            ? !data.checked.includes(item.id)
            : data.checked.includes(item.id);
        });
    };
        // 更改菜品数量的同时修改vuex中的数据(购物车)
        const handleChange = (value,detail)=>{
            store.state.cartList.map((item)=>{
                if(item.id === detail.name){
                    item.num = value
                }
            })
        }
        // 点击跳转到购物车的时候默认全选
        const init = ()=>{
            // 全选菜品
            data.checked = store.state.cartList.map((item)=>item.id)
        }
        // 结算按钮(提交订单,路由跳转到订单页)
        const onSubmit = ()=>{
          if (data.checked.length) {//判断当前菜品是否有勾选中
            store.commit("pay", updateData());
            router.push({
            path: "/createorder",
            query: {
                // 将勾选上的商品id提交过去,用于结算后在购物车中删除该商品
                list: data.checked,
            },
          });
      } else {
        Toast.fail("请选择要结算的商品！！！");
      }
        }
        // 全选按钮1
        const choseAll = ()=>{
            // 如果当前没有全部选中菜品的话,点击全选
            if(data.checked.length !== store.state.cartList.length){
                init()
            }else{
                // 否者全部置为空(没选中)
                data.checked = []
            }
        }
        // 全选按钮2
        const groupChange = (result)=>{
            // console.log(111,result);
            if(result.length === store.state.cartList.length){
                data.submitChecked = true
            }else{
                data.submitChecked = false
            }
            data.checked = result;
        }
        // 删除商品按钮
        const handleDelete = ()=>{
            // 部分删除
                  // 判断 data的checked是否有值
            if (data.checked.length) {
                store.commit("delete", updateData("delete"));
                data.checked = [];//将未删除的商品设置位未选中
                // 购物车没有数据的时候
                if (!store.state.cartList.length) {
                    props.changeShow();
                    store.commit("edit", "delete");
                }
            } else {
                Toast.fail("请选择要删除的商品");
              }

            // 全部删除
        }
        // 页面一挂载,立刻获取全选数据
        onMounted(()=>{
            init()
        })
        return{
            ...toRefs(data),
            store,
            handleChange,
            init,
            onSubmit,
            choseAll,
            groupChange,
            allPrice,
            handleDelete,
        }
    },
}
</script>

<style lang="less" scoped>
.cartDetail {
  font-size: 14px;
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding: 20px 20px 55px;
  .submit-all {
    position: fixed;
    bottom: 46px;
  }

  .buy {
    position: fixed;
    bottom: 48px;
    right: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    height: 50px;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
    }
    .delete {
      color: #fff;
      background-color: skyblue;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      width: 110px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }

  .content {
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
  }
}
</style>
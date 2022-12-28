<template>
  <!-- 判断点击的是否为第一个子路由(点菜) -->
  <div class="food-list" v-if="index === 0">
    <!-- 侧边栏选择器 -->
    <van-tree-select
      v-model:main-active-index="activeIndex"
      height="88vw"
      :items="items"
      @click-nav="navClick"
    >
      <template #content>
        <!-- 菜品组件 -->
        <div v-for="(item,index) in subItem" :key="index"
        class="item-bg">
        <ListItem :item="item" :handleAdd="handleAdd" :handleChange="handleChange"/>
        </div>
      </template>
    </van-tree-select>
  </div>

  <!-- 否则显示评价或商家 -->
  <div v-else>
    {{ foodData.content }}
  </div>
</template>

<script>
import { reactive, toRefs, } from "vue";
import FoodListItem from './FoodListItem.vue'
import ListItem from '../../../components/ListItem.vue'
export default {
  components:{
    FoodListItem,
    ListItem,
  },
  // 接收父组件传过来的数据
  props:['index','foodData'],
  setup(props) {
    let data = reactive({
      activeIndex:0,
      items: [],//套餐选择
      subItem:[],//菜品数据
    })

    // 初始化数据
    const initData =()=>{
      let newArray = []
      // 有对应数据才进行数组压入
      props.foodData?.items?.forEach((item,index)=>{
        newArray.push({
          text:item.text
        })
        if(data.activeIndex === index){
          data.subItem = item.children
        }
      })
      data.items = newArray;//数据替换便于与侧边栏选择器对接
    }

    initData();

    // 点击套餐跳转(里面传入当前点击的路由index)
    const navClick=(i)=>{
      data.activeIndex = i;
      initData();//重新初始化以下数据
    }
    // 点击添加菜品数量,再通过props传过去给子组件
    const handleAdd = (id)=>{
      data.subItem.forEach((item,index)=>{
        if(item.id === id){
          item.add = false
          item.num += 1//这段代码可能会报错
        }
      })
    }
    // 增加菜品数量时同步修改真实数据
    const handleChange = (value,detail)=>{
      data.subItem.forEach((item)=>{
        if(item.id === detail.name){
          item.num = value;
        }
      })
      // console.log(data.subItem);//测试是否能够成功修改数据
    }
    return{
      ...toRefs(data),
      navClick,
      handleAdd,
      handleChange,
    }
  }
}
</script>

<style lang="less" scoped>
.food-list {
  margin-top: 20px;
.item-bg {
  padding: 10px;
}
}
/deep/ .van-tree-select__item--active {
  color: skyblue;
}
/deep/ .van-sidebar-item--select::before {
  background-color: skyblue;
}
</style>
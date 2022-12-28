<template>
    <div class="item" @click="toStore">
        <!-- 接收父级组件传过来的数据 -->
        <img :src="itemContent.pic">
        <div class="item-right">
            <div class="title">{{ itemContent.title }}</div>
            <div class="sales">{{ itemContent.sales }}</div>
            <div class="price">起送费 ￥{{ itemContent.price }} 免配送费</div>
            <!-- 可能会存在多个标签 -->
            <div class="label">
                <div v-for="(i,index) in itemContent.label" :key="index">
                    {{ i }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router";//vue3新特性,引入路由调用函数
export default {
    props:['itemContent'],
    setup() {
    const router = useRouter();//创建路由实例
    const toStore = () => {
      router.push("/store");//路由跳转
    };
    return {
      toStore,
    };
  },
}
</script>

<style lang="less" scoped>
    // 除去第一个商品的其余设置边距
    .item:not(:first-child) {
    margin-top: 10px;
    }
    .item {
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    padding: 10px;
    img {
        width: 120px;
        height: 120px;
        border-radius: 10px;
        margin-right: 20px;
    }
    .item-right {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        .title {
        font-size: 18px;
        }
        .label {
        display: flex;
        div {
            background-color: skyblue;
            padding: 2px 5px;
            border-radius: 5px;
        }
        // 标签边距的设置(除去第一个标签)
        div:not(:first-child) {
            margin-left: 5px;
        }
        }
    }
    }
</style>
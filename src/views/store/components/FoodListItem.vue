<template>
  <!-- 菜品小组件 -->
  <div class="content-item">
    <div class="left">
      <img :src="item.pic">
      <!-- 菜品文字描述区域 -->
      <div class="text">
        <div class="title">{{ item.title }}</div>
        <!-- 选择数量 -->
        <van-icon name="add-o" v-if="item.add" @click="handleAdd(item.id)"/>
        <van-stepper v-else :v-model="item.num" @change="handleChange" :name="item.id"/>
      </div>
    </div>
    <!-- 价格 -->
    <div class="price">￥{{ item.price }}</div>
  </div>
</template>

<script>
export default {
  props:['item','handleAdd','handleChange']
}
</script>

<style lang="less" scoped>
 .content-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .price {
      font-size: 16px;
      font-weight: 600;
    }
    .left {
      display: flex;
      align-items: center;
      flex: 1;
      img {
        margin-left: 10px;
        width: 60px;
        height: 60px;
        margin-right: 10px;
        border-radius: 10px;
      }
      .text {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        height: 100%;
        position: relative;
        flex: 1;
        .title {
          font-size: 16px;
        }
        .van-icon {
          color: red;
          font-size: 20px;
          position: absolute;
          right: 4px;
          bottom: 4px;
        }
      }
    }
  }
</style>
<template>
  <div v-for="(item,index) in navList" :key="index">
    <!-- 将每一个路由中的美食数据传过去 -->
    <nav-list-item :itemContent="item"></nav-list-item>
  </div>
</template>

<script>
import NavListItem from './NavListItem.vue'
export default {
    props:['navList'],//接收父组件传过来的数据
    components:{
        NavListItem,
    }
}
</script>

<style>

</style>
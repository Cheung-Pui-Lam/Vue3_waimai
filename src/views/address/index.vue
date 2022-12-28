<template>
    <Header title="地址管理" />
    <!-- vant组件库地址编辑模块 -->
    <van-address-list
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </template>
  
  <script>
  import Header from "../../components/Header.vue";
  import { reactive, toRefs, onMounted } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  export default {
    components: {
      Header,
    },
    setup() {
      const store = useStore();
      const router = useRouter();
      // 添加地址  
      const onAdd = () => {
        router.push({
          path: "/addressedit",
          query: {
            type: "add",
          },
        });
      };
      // 编辑地址
      const onEdit = (item) => {
        router.push({
          path: "/addressedit",
          query: {
            id: item.id,//将要修改的地址对应的id传过去
            type: "edit",
          },
        });
      };
      const data = reactive({
        list: [],//地址群组
      });
      //地址初始化,将vuex中存储的初始地址投到页面上
      const init = () => {
        data.list = store.state.userAddress.map((item) => {
          return {
            id: item.id,
            name: item.name,
            tel: item.tel,
            address: `${item.province}${item.city}${item.county}${item.addressDetail}`,
            isDefault: item.isDefault,
          };
        });
      };
      onMounted(() => {
        init();//页面一挂载初始化地址
      });
      return {
        onEdit,
        onAdd,
        ...toRefs(data),
      };
    },
  };
  </script>
  
  <style lang="less" scoped>
  /deep/ .van-button--danger {
    background-color: skyblue;
    border-color: skyblue;
  }
  /deep/ .van-switch--on {
    background-color: skyblue;
  }
  /deep/ .van-radio__icon {
    display: none;
  }
  </style>
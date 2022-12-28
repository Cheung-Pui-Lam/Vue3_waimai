<template>
    <Header :title="address" />
    <!-- vant组件库地址编辑组件 -->
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :address-info="addressInfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </template>
  
  <script>
  import Header from "../../components/Header.vue";
  import { reactive, toRefs, onMounted, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useStore } from "vuex";
  import { Toast } from "vant";
  export default {
    components: {
      Header,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const store = useStore();
      const data = reactive({
        
        areaList: {
          // 省级选项
          province_list: {
            110000: "广东省",
          },
          // 市级选项
          city_list: {
            110100: "江门市",
            110200: "深圳市",
            110300: "广州市",
            110400: "东莞市",
          },
          // 区级选项
          county_list: {
            110101: "蓬江区",
            110102: "江海区",
            110103: "新会区",
            110104: "开平市",
          },
        },
        // 用户信息
        addressInfo: {},
      });
      // 保存地址(content:表示当前地址的对象)
      const onSave = (content) => {
        console.log('当前地址:',content);
        // 新增地址 以及 编辑地址
        if (route.query.type === "add") {// 新增
          store.commit("addaddress", content);
        } else {// 编辑
          store.commit("editaddress", content);
        }
        Toast("保存成功");
        setTimeout(() => {
          router.back();
        }, 1000);
      };
      // 删除地址
      const onDelete = (content) => {
        store.commit("deleteaddress", content);
        Toast("删除成功");
        setTimeout(() => {
          router.back();
        }, 1000);
      };
      // 初始化用户数据(通过id来获取vuex中对应的用户数据)
      const init = () => {
        store.state.userAddress.forEach((item) => {
            // 将路由跳转时携带过来的url参数进行配对,获取vuex中对应的id数据
          if (item.id === Number(route.query.id)) {
            console.log(item);
            data.addressInfo = item;
          }
        });
      };
      // 判断地址操作类型  
      const address = computed(() => {
        return route.query.type === "add" ? "地址新增" : "地址编辑";
      });
      onMounted(() => {
        init();
      });
      return {
        ...toRefs(data),
        onSave,
        onDelete,
        address,
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
  </style>
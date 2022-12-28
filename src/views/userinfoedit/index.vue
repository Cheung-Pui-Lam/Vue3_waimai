<template>
    <Header />
    <div>
        <!-- 头部表单 -->
      <van-field v-model="name" label="昵称" placeholder="请输入昵称" />
      <van-field
        v-model="sign"
        label="个性签名"
        placeholder="个性签名"
      />
      <van-field v-model="pass" label="密码" placeholder="请输入密码" />
    </div>
    <van-button
      type="primary"
      color="skyblue"
      round
      block
      class="save-btn"
      @click="save"
      >保存</van-button
    >
    <van-button
      type="primary"
      color="skyblue"
      round
      block
      class="save-btn"
      @click="logOut"
      >退出登录</van-button
    >
  </template>
  
  <script>
  import Header from "../../components/Header.vue";
  import { reactive, toRefs } from "vue";
  import { Toast } from "vant";
  import { useRouter } from "vue-router";
  export default {
    components: {
      Header,
    },
    setup() {
      const data = reactive({
        name: "",
        sign: "🦸‍♂️努力才能成就自己!",
        pass: "",
      });
      const router = useRouter();
      // 用户信息修改后保存方法
      const save = () => {
        // 判断条件是:你新填入的数据中要包含用户名和密码
        if (data.name && data.pass) {
          // 将浏览器缓存中的用户数据(账号密码)通过对象的像是解析出来
          let userInfo = JSON.parse(localStorage.userInfo);
          let newUserInfo = {//将新的数据赋值给存储账号密码的对象
            user: data.name || userInfo.name,
            sign: data.sign || "🦸‍♂️努力成为自己想要成为的人!",
            pass: data.pass || userInfo.pass,
          };
          // 将存有新的账号密码的对象重新填入到浏览器缓存中
          localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
          Toast("修改成功");
          router.push("/mine");
        } else {
          Toast("请输入内容");
        }
      };
      // 退出登录方法
      const logOut = () => {
        // 清除登录标志即可(类似token)
        localStorage.removeItem("isLogin");
        router.push("/login");
        Toast("退出成功");
      };
      return {
        ...toRefs(data),
        save,
        logOut,
      };
    },
  };
  </script>
  
  <style lang="less" scoped>
  .save-btn {
    width: 80%;
    margin: 20px auto;
  }
  </style>
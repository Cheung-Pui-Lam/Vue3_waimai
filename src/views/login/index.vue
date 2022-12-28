<template>
    <div class="login">
      <Header title="登录" />
      <div class="img">外卖</div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="user"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="pass"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            color="skyblue"
          >
            登录
          </van-button>
          <van-button
            round
            block
            type="info"
            color="skyblue"
            class="register"
            @click="toRegister"
          >
            去注册
          </van-button>
        </div>
      </van-form>
    </div>
  </template>
  <script>
  import Header from "../../components/Header.vue";
  import { useRouter } from "vue-router";
  import { reactive, toRefs } from "vue";
  import { Toast } from "vant";
  export default {
    components: {
      Header,
    },
    setup() {
      const router = useRouter();
      // 与注册页面的函数用法是基本一致的
      const onSubmit = (value) => {
        // 判断浏览器缓存中不存在userInfo项即表示当前用户未注册
        if (!localStorage.userInfo) {
          Toast("账号未注册");
          return;
        } else {
          // 将浏览器缓存中的用户数据解析成对象
          let userInfo = JSON.parse(localStorage.userInfo);
          if (userInfo["user"] === value["user"]) {//判断输入的信息与浏览器缓存中的信息是否一致
            if (userInfo["pass"] === value["pass"]) {
              Toast("登录成功");
              // 登陆成功,设置已登录的标志位,相当于token
              localStorage.setItem("isLogin", "login");
              router.push("/home");//路由重定向到首页
            } else {
              // 第二个判断体出现错误即表示浏览器缓存中存在该用户但是账号输入错误
              Toast("密码错误");
            }
          } else {
            // 第一个判断体出现错误即表示浏览器缓存中不存在该用户
            Toast("账号不存在");
          }
        }
      };
      // 定向到注册路由页面
      const toRegister = () => {
        router.push("/register");
      };
      const data = reactive({
        username: "",
        password: "",
      });
      return {
        onSubmit,
        toRegister,
        ...toRefs(data),
      };
    },
  };
  </script>
  <style scoped lang="less">
  .login {
    .img {
      width: 200px;
      height: 200px;
      background-color: skyblue;
      font-size: 80px;
      line-height: 200px;
      text-align: center;
      border-radius: 40px;
      margin: 20px auto;
    }
    .register {
      margin-top: 20px;
    }
  }
  </style>
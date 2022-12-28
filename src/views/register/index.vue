<template>
    <div class="login">
      <Header title="注册" />
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
            注册
          </van-button>
          <van-button
            round
            block
            type="info"
            color="skyblue"
            class="register"
            @click="toLogin"
          >
            去登录
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
      // 表单提交函数   
      const onSubmit = (value) => {
        // console.log(value);//表单的提交函数可以使得我们能够获取到我们输入的数据
        if (localStorage.userInfo) {
          // 判断我们输入的账号密码是否已经存在浏览器缓存中
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          if (userInfo["user"] === value["user"]) {//(存在则无法注册)
            Toast("该用户已经存在");
            return;
          }
        } else {
          // 不存在则可注册(将我们的写入的form表单传入到注册函数中) 
          register(value);
        }
      };
      //注册函数
      const register = (value) => {
        // 将我们的输入内容(账号密码信息)保存到浏览器缓存中
        localStorage.setItem("userInfo", JSON.stringify(value));//需要将form数据转换成json数据
        Toast("注册成功");
        router.push("/login");// 路由定向到登陆页面
      };
      // 定向登陆页面
      const toLogin = () => {
        router.push("/login");
      };
      const data = reactive({
        username: "",
        password: "",
      });
      return {
        onSubmit,
        toLogin,
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
<template>
  <div class="me">
    <!-- 顶部区域 -->
    <Header title="我的" />
    <!-- 内容区域 -->
    <div class="content">
      <!-- 用户展示(信息)区域 -->
      <div class="user-info">
        <div class="info">
          <img src="../../assets/tx.jpg" />
          <div class="user-desc">
            <span>昵称：{{ name }}</span>
            <span class="name">座右铭：{{ describe }}</span>
          </div>
        </div>
      </div>
      <!-- 用户业务区域 -->
      <ul class="user-list">
        <li class="van-hairline--bottom" @click="go('./order')">
          <span>我的订单</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="go('./address')">
          <span>地址管理</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="go('./userinfoedit')">
          <span>账号管理</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  components:{
    Footer,
    Header,
  },
  setup() {
    const router = useRouter();
    // 获取当前的用户信息(解析浏览器中的用户数据)
    let userInfo = JSON.parse(localStorage.userInfo);
    const data = reactive({
      name: userInfo.user,//展示解析出来的用户名
      describe: userInfo.sign||"🦸‍♂️努力才能成就自己!",//展示解析出来的个性签名
    });
    // 页面跳转方法(指定业务指定路由页面)
    const go = (path) => {
      router.push(path);
    };
    return {
      ...toRefs(data),
      go,
    };
  },
}
</script>

<style lang="less" scoped>
.me {
  height: 100%;
  display: flex;
  flex-flow: column;
  .content {
    flex: 1;
    overflow-y: auto;
    .user-info {
      width: 94%;
      margin: 10px;
      height: 115px;
      background: linear-gradient(90deg, skyblue, #049eeb);
      box-shadow: 0 2px 5px skyblue;
      border-radius: 6px;
      .info {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        padding: 25px 20px;
        box-sizing: border-box;
        img {
          border-radius: 50%;
          margin-top: 4px;
        }
        .user-desc {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          line-height: 20px;
          font-size: 14px;
          color: #fff;
          justify-content: space-between;
          span {
            color: #fff;
            font-size: 14px;
            padding: 2px 0;
          }
        }
        .account-setting {
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 13px;
          color: #fff;
          .van-icon-setting-o {
            font-size: 16px;
            vertical-align: -3px;
            margin-right: 4px;
          }
        }
      }
    }
    .user-list {
      padding: 0 20px;
      margin-top: 20px;
      background-color: #fff;
      li {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        .van-icon-arrow {
          margin-top: 13px;
        }
      }
    }
  }
}
</style>
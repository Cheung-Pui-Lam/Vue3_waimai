<template>
  <div class="home">
    <!-- 上部内容区 -->
    <div class="content">
      <!-- 头部区域 -->
      <div class="header">
        <div class="text">饿了美外卖</div>
        <div class="location" @click="toBlog('https://cheung-pui-lam.github.io/')">
          <van-icon name="location" />
          <span>肥林の仓库</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <!-- 主体内容区域 -->
      <div class="main">
        <!-- 背景区域 -->
        <div class="main-bg">
          <!-- 搜索区域 -->
          <div class="search">
            <input type="text">
            <div class="search-text">搜索</div>
          </div>
          <!-- 分类区域 -->
          <div class="sort">
            <!-- 大图标 -->
            <div class="big-sort">
              <div v-for="(item,index) in big_sort" :key="index">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
                {{ item.name }}
              </div>
            </div>
            <!-- 小图标 -->
            <div class="small-sort">
              <div v-for="(item,index) in small_sort" :key="index">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <!-- 标签页(路由跳转) -->
        <van-tabs v-model:active="active" class="van-tabs" color="skyblue">
          <van-tab :title="item.tab" 
            v-for="(item,index) in centent_nav_list" 
            :key="index"
          >
            <nav-list :navList="item.data"></nav-list>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 底部路由跳转区 -->
    <Footer />
  </div>
</template>

<script>
import { reactive,toRefs,ref,onMounted } from 'vue'
import Footer from '../../components/Footer.vue'
import NavList from './components/NavList.vue'
import { getApiHomeData } from "../../api/api";//引入我封装好的mock接口
export default {
  components:{
    Footer,
    NavList,
  },
  setup() {
    let data = reactive({
      big_sort: [],//大图标分类
      small_sort: [],//小图标分类
      centent_nav_list: [],//导航栏分类
    })  
    const active = ref(0);
    // 封装mock获取数据方法
    const getHomeData = () => {
      getApiHomeData().then((res) => {
        console.log(res);
        data.big_sort = res.big_sort;//大图标分类(我mock的数据)
        data.small_sort = res.small_sort;//小图标分类(我mock的数据)
        data.centent_nav_list = res.centent_nav_list;//导航栏分类(我mock的数据)
      });
    };
    // 前往博客函数
    const toBlog = (url)=>{
      window.open(url,"_blank")
    }
    // 页面一挂载就调用我的mock数据接口获取数据
    onMounted(() => {
      getHomeData();
    });
    return{
      ...toRefs(data),
      active,
      toBlog
    }
  }

}
</script>

<style lang="less" scoped>
.home{
  display: flex;
  flex-flow: column;
  height: 100%;
  font-size: 12px;
  // 内容区域样式
  .content{
    flex: 1;
    overflow-y: auto;
    // 头部区域样式
    .header{
      background-image: linear-gradient(#87ceeb, #fff);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px 40px 20px;
      .text{
        font-size: 20px;
        font-weight: 600;
      }
      .location{
        span{
          margin:0 5px;
        }
        font-size: 14px;
      }
    }
    // 内容区域
    .main{
      margin-top: -30px;
      // 渐变背景
      .main-bg{
        background-image: linear-gradient(#fff,#f5f5f5);
        padding: 10px 20px 0px 20px;
        border-radius: 30px 30px 0 0; 
        // 搜索区域样式
        .search{
          position: relative;//子绝父相配合定位
          input{
            width: 100%;
            border: 1px solid skyblue;
            border-radius: 20px;
            height: 30px;
          }
          .search-text{
            position: absolute;//子绝父相配合定位
            right: -6px;
            top: 1px;
            background-color: skyblue;
            border-radius: 16px;
            width: 50px;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            text-align: center;
          }
        }
        // 分类区域样式
        .sort{
          padding: 20px 0;
          .big-sort{
            display: flex;
            div{
              flex: 1;
              display: flex;
              justify-content: center;
              flex-flow: column;
              align-items: center;
              .icon{
                width: 50px;
                height: 50px;
                margin-bottom: 5px;
              }
            }
          }
          .small-sort{
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            div{
              display: flex;
              justify-content: center;
              align-items: center;
              flex-flow: column;
              width: 20%;
            }
            .icon{
              width: 30px;
              height: 30px;
              margin: 10px;
            }
          }
        }
      }
      // 标签页样式
      .van-tabs{
        padding: 0 20px 10px ;
      }
      .van-tabs__line{
        background-color: #0adfee !important;
      }
    }
  }
}

// 深度选择样式,用于突破scoped限制,更改全局样式
/deep/ .van-tabs_wrap{
  border-radius: 10px;
} 
</style>
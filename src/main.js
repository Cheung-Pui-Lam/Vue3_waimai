import { createApp } from 'vue'
import App from './App.vue'
import './assets/reset.css'//清除浏览器默认样式
import 'amfe-flexible';//实现移动端的宽高适配
import router from './router'//引入路由
import store from './store'//引入vuex
import 'vant/es/toast/style'//引入vant中的弹框图示
import 'vant/es/dialog/style'//引入vant中的对话框图示
import './api/mock'//引入mock创建全局拦截数据

const app = createApp(App)//创建app实例


app.use(router)//挂载路由
app.use(store)//挂载vuex
app.mount('#app')//挂载app实例

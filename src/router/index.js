// 引入创建路由函数以及创建的路由模式
import {createRouter,createWebHashHistory} from 'vue-router'
import { Toast } from 'vant'

// 创建路由
const router = createRouter({
    history:createWebHashHistory(),//路由的模式
    routes: [
        // 默认指向路由首页
        {
            path:'/',
            component:()=>import('../views/home')
        },
        // 首页
        {
            path:'/home',
            component:()=>import('../views/home')
        },
        // 购物车
        {
            path:'/cart',
            component:()=>import('../views/cart'),
            // meta为路由守卫标识,用于判断当前路由页面是否需要路由守卫
            meta: {
                isAuth: true
            }
        },
        // 订单页
        {
            path:'/order',
            component:()=>import('../views/order'),
            meta: {
                isAuth: true
              }
        },
        // 我的
        {
            path:'/mine',
            component:()=>import('../views/mine'),
            meta: {
                isAuth: true
            }
        },
        // 商店(店铺)
        {
            path:'/store',
            component:()=>import('../views/store')
        },
        // 生成订单页
        {
            path:'/createOrder',
            component:()=>import('../views/createOrder'),
            meta: {
                isAuth: true
            }
        },
        // 地址页
        {
            path: '/address',
            component: () => import('../views/address'),
            meta: {
              isAuth: true
            }
        },
        // 地址编辑页
        {
            path: '/addressedit',
            component: () => import('../views/addressEdit'),
            meta: {
              isAuth: true
            }
        },
        // 账号编辑页面
        {
            path: '/userinfoedit',
            component: () => import('../views/userinfoedit'),
            meta: {
              isAuth: true
            }
        },
        // 登陆页面 
        {
            path: '/login',
            component: () => import('../views/login')
        },
        // 注册页面
        {
            path: '/register',
            component: () => import('../views/register')
        }
    ]
})

// 设置路由守卫(判断当前用户登陆状态)
router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {//对需要进行登录校验的路由页面进行登陆判断
      // 一会登录了以后 会在localstorage里面 存储一个标识
      if (localStorage.isLogin === 'login') {
        next()// 路由页面放行
      } else {
        next('/login')
        Toast('需要先登录才能访问哦!')
      }
    } else {
      next()
    }
  })
// 暴露路由
export default router
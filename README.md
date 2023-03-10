# vue3饿了美外卖(移动端)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
# 项目介绍

- 饿了美外卖是一个基于Vue3框架 , VantUI组件库和mock开发的项目
- 实现功能(主要):
  - 注册:注册信息通过对比浏览器本地的缓存(localStorage)的信息来实现注册功能(不存在该信息则能注册,反之则不能注册)
  - 登录:对比浏览器缓存中的注册信息,存在则能登录成功,反之则登陆失败
  - 用户修改:同样是修改浏览器本地的缓存信息来实现
  - 数据来源:mock模拟数据,拦截发送的axios请求,返回我模拟的数据

- 开发工具 ：VSstudio  、Chrome
- 使用到的技术栈 ：
  - Vue-cli
  - axios（axios的二次封装）
  - Vuex
  - promise
  - VantUI组件库
  - Vue-router
  - mock
- 项目源码: https://github.com/Cheung-Pui-Lam
- 项目预览地址(需要挂vpn访问): https://vue3-waimai.vercel.app/#/
- 项目后端接口使用的是mock

# 项目展示

![image](/public/img/1.png)
![image](/public/img/2.png)
![image](/public/img/3.png)
![image](/public/img/4.png)
![image](/public/img/5.png)
![image](/public/img/6.png)
![image](/public/img/7.png)


# 可能会出现的报错以及警告:

# 报错一：

- **`vue.config.js`报错:**

- **报错信息:**

  - **Invalid options object. PostCSS Loader has been initialized using an options object that does not match the API schema.**

    **options has an unknown property ‘plugins’. These properties are valid:
    bject { postcssOptions?, execute?, sourceMap?, implementation? }**

## 解决办法:

- **报错信息的大概意思是: `postcss`应该是个对象，但是这个对象没有`plugins`,只有`{ postcssOptions?, execute?, sourceMap?, implementation?}`这四个属性，修改后用`postcssOptions`包住`plugins`就好了，下面是修改后的配置，其实好多报错我们认证读一下就能找到解决方法**

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions:{
          plugins: [
            // 项目的根元素大小为16px,若我们设置成160px的元素则为10rem
            require('postcss-pxtorem')({ rootValue: 16 , propList: ['*']}),
          ],
        }
      },
    },
  },
})

```

# 实现移动端的适配

- **用到两个插件**

1. **`amfe-flexible`: 用于配置可伸缩布局方案，主要是将`1rem`设为`viewWidth/10`。(直接在项目中的`main.js`中引入即可)**
2. **`postcss-pxtorem`: 它是是`postcss`的插件，用于将像素单元生成`rem`单位。(在配置`vue.config.js`中引用同时设置默认的根元素大小,即`1rem`等于多少)**

# 报错二

- **`vue3`默认使用驼峰命名法,如果组件的命名不是使用驼峰命名法的话会报编译错误的(`eslint `错误)**
- **根据 `ESLint` 官方风格指南，除了根组件（`App.vue`）外，自定义组件名称应该由多单词组成（使用大驼峰命名方式或者用“-”连接单词），防止和 `html `标签冲突;最新的 `vue-cli `创建的项目使用了最新的 `vue/cli-plugin-eslint` 插件，在 `vue/cli-plugin-eslint v7.20.0`版本之后就引用了 `vue/multi-word-component-names` 规则，所以在编译的时候判定此次错误。**


## 解决方法:

- **方法一:重命名,定义组件重新使用`驼峰命名法`**

- **方法二:配置 `vue.config.js` 文件,在里面配置`lintOnSave: false // 关闭eslint校验`**
- **方法三: 配置` .eslintrc.js `里面找到` rules`配置项 里面加上这么一句`'vue/multi-word-component-names': "off" // 关闭名称校验`**

- **`.eslintrc.js`**

```js
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'vue/multi-word-component-names': "off" // 关闭名称校验
  },
};
```

# 可能会出先错误的地方

- **`FoodList.vue`中的`handleAdd`函数中的一段代码:`item.num += 1//这段代码可能会报错`**

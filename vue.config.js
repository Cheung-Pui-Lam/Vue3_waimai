// 配置vant组件库的按需加载
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false, // 关闭eslint校验(解决组件的驼峰命名报错)
  transpileDependencies: true,
  // 配置移动端的响应式rem适配
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions:{
          plugins: [
            // 项目的根元素大小为16px,若我们设置成160px的元素则为10rem
            require('postcss-pxtorem')({ rootValue: 37.5 , propList: ['*']}),
          ],
        }
      },
    },
  },
  // 配置vant组件库的按需加载
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
})

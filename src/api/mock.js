// mock设置:拦截请求,返回我模拟的数据
import Mock from 'mockjs'
import homeApi from './mockData/homeApi'
import storeApi from './mockData/storeApi'
Mock.mock('/home/getHomeData', homeApi.getHomeData)//拦截首页数据的请求,返回我模拟首页的数据
Mock.mock('/home/getStoreData', storeApi.getStoreData)//拦截商店数据请求,返回我模拟的商店数据
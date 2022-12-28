// 对项目的接口做统一管理
import axios from './request'
// 这是首页的接口
export const getApiHomeData = (param) => {
  return axios.request({
    url: '/home/getHomeData',
    method: 'get',
    data: param
  })
}
// 这是商店数据的接口
export const getApiStoreData = (param) => {
  return axios.request({
    url: '/home/getStoreData',
    method: 'get',
    data: param
  })
}
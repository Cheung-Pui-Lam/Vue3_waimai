import axios from 'axios'
// 真实的企业级的项目中 会根据当前的环境 进行一个配置
const baseUrl = ''
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,
      header: {}
    }
    return config
  }

  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么,如添加登陆标志(tokne)到请求体中用于登录校验
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      const { data, code } = response.data//提取响应回来的数据中的一些标志判断
      if (code == 200) {
        return data//在状态码为200时直接返回数据,不返回其他无用项
      } else {
        // 
      }
      // return response;

    }, function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }

  // 封装请求方法
  request(options) {
    const instance = axios.create()
    options = { ...this.getInsideConfig(), ...options }//请求参数
    this.interceptors(instance)//拦截器
    return instance(options)
  }
}
export default new HttpRequest(baseUrl)
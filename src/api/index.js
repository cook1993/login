// 配置axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [
  (data) => {
    try {
      return JSONBig.parse(data)
    } catch (e) {
      return data
    }
  }
]
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 在每次请求之前 获取token信息， 追加在headers中
// 请求拦截器 ，在每次请求之前， 做某些事情
axios.interceptors.request.use((config) => {
  // 修改config
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
},
(error) => {
  // 错误处理
  return Promise.reject(error)
})
// 响应拦截器：在每次响应后，做某一些事情
axios.interceptors.response.use((res) => {
  // 成功的时候做些事情
  return res
},
(err) => {
  // 请求失败做
  // 获取响应状态码，err对象包含响应对象 err.response 响应对象中包含状态码
  // 响应对象中包含状态码 err.response.status
  if (err.response.status === 401) {
    // 跳转到登录页面this.$router.push('/login')
    // 方法1；$router.push('/login)地址栏改成'#/login' ==》location.hash="#/login"
    // 方法2：此时没有vue实例 $router对象获取不到，通过router实例直接获取
    router.push('/login')
  }
  return Promise.reject(err)
})
// 进行导出
export default axios

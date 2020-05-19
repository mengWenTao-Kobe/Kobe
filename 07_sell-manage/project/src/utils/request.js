import axios from 'axios'
import Qs from 'qs'
import { Message } from "element-ui"
import local from '@/utils/local'

axios.defaults.baseURL = 'http://127.0.0.1:5000' //通用后台地址
axios.defaults.timeout = 5000 //设置请求超时

// 请求拦截器
axios.interceptors.request.use(config => {
  // 请求头携带token
  let token = local.get('token')
  config.headers.Authorization = `Bearer ${token}`
  console.log('请求拦截')
  return config
})

// 响应拦截器
axios.interceptors.response.use(res => {
  let { code, msg } = res.data
  if (msg) {
    if (code === 0) { Message.success(msg); }
    else if (code === 1) { Message.error(msg); }
    else if (code === 5001) { Message.warning(msg); }
    else { Message(msg); }
  }
  console.log('响应拦截')
  return res
}, err => {  //没有token或token过期会响应错误
  if (err.response.status === 401) {
    Message.error('token不存在或已过期，请验证帐号和密码')
    local.clear() //token过期时就要清掉
    location.href = '/#/login' 
  }
})

// 暴露请求函数
export default {
  get: (url, params = {}) => new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(res => { resolve(res.data) })
      .catch(err => { reject(err) })
  }),
  post: (url, params = {}) => new Promise((resolve, reject) => {
    axios.post(url, Qs.stringify(params))
      .then(res => { resolve(res.data) })
      .catch(err => { reject(err) })
  })
}
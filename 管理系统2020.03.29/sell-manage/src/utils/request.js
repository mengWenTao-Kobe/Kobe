/* 
  ajax请求封装
  created by 孟文韬  2020/4/1
*/

// 单独引入弹框组件
import { Message } from 'element-ui';

// 引入axios和qs
import axios from 'axios';
import qs from 'qs';
// 引入local工具函数
import local from './local';
// 引入路由
import router from 'vue-router';



// 统一配置
// 请求地址
axios.defaults.baseURL = 'http://localhost:5000';
// 请求超时：5秒
axios.defaults.timeouts = 5000;

// 请求拦截器
axios.interceptors.request.use(config => {
  // console.log('请求拦截', config) config是一个请求对象（包含请求方式地址参数等）
  // 获取token
  let token = local.get('token')
  // 请求头携带token
  config.headers.Authorization = `Bearer ${token}`;
  console.log('请求拦截')
  return config;
})

// 响应拦截器
axios.interceptors.response.use(res => {
  if (res.data.code !== undefined && res.data.msg !== undefined) {
    let { code, msg } = res.data;
    if (code === 0) {
      Message({
        message: msg,
        type: "success"
      });
    } else if (code === 1) {
      Message.error(msg);
    } else if (code === 5001) {
      Message({
        message: msg,
        type: 'warning'
      });
    }
  }
  console.log('响应拦截')
  return res;
},
  // 当token过期时，响应错误时，跳转到登录页面
  err => {
    console.dir(err)
    Message.error('token已过期，请重新验证帐号和密码')
    local.remove('token')
    location.href = '/#/login'
  })

// 暴露默认对象
export default {

  // get方式发送ajax 传参方式统一了
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      })
        .then(res => { resolve(res.data) })
        .catch(err => { reject(err) })
    })
  },

  // post方式发送ajax
  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(params))
        .then(res => { resolve(res.data) })
        .catch(err => { reject(err) })
    })
  }

}
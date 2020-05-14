/*
  帐号相关所有请求
  created by 孟文韬 2020/4/1
*/

// 引入工具函数
import Ajax from '@/utils/request.js';

// 添加帐号,进一步封装，调用的时候方式和地址都不用写了
export let addAcc = params => Ajax.post('/users/accountadd', params)
// 获取帐号列表
export let getAccList = params => Ajax.get('/users/accountlist', params)
// 删除帐号
export let delAcc = params => Ajax.get('/users/accountdel', params)
// 批量删除帐号
export let batchDelAcc = params => Ajax.get('/users/accountbatchdel', params)
// 保存修改
export let saveEditAcc = params => Ajax.post('/users/accountedit', params)
// 登录验证
export let checkLogin = params => Ajax.post('/users/checkLogin', params)
// 获取当前登录帐号的请求
export let getInfo = params => Ajax.get('/users/accountinfo', params)
// 修改用户头像
export let saveAvatar = params => Ajax.get('/users/avataredit', params)
// 验证旧密码请求
export let checkOld = params => Ajax.get('/users/checkoldpwd', params)
// 修改密码
export let modifyPwd = params => Ajax.post('/users/passwordedit', params)




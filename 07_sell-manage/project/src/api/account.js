/* 
  账号相关接口
*/

import req from '@/utils/request'

// 登录
export let checkLogin = params => req.post('/users/checkLogin', params)
// 获取帐号列表
export let getAccountList = params => req.get('/users/accountlist', params)
// 添加帐号
export let accountAdd = params => req.post('/users/accountadd', params)
// 批量删除帐号
export let accountBatchDel = params => req.get('/users/accountbatchdel', params)
// 修改帐号
export let accountEdit = params => req.post('/users/accountedit', params)
// 删除帐号
export let accountDel = params => req.get('/users/accountdel', params)
// 检查旧密码是否正确
export let checkOldPwd = params => req.get('/users/checkoldpwd', params)
// 修改密码
export let passwordEdit = params => req.post('/users/passwordedit', params)
// 获取账号（个人中心）信息
export let getAccountInfo = params => req.get('/users/accountinfo', params)
// 修改用户头像
export let avatarEdit = params => req.get('/users/avataredit', params)




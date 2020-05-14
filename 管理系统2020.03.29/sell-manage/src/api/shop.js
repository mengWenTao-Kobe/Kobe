/*
  店铺相关所有请求
  created by 孟文韬 2020/4/6
*/

// 引入工具函数
import Ajax from '@/utils/request.js';

// 获取店铺详情
export let shopInfo = params => Ajax.get('/shop/shopinfo', params)
// 店铺内容修改
export let shopEdit = params => Ajax.post('/shop/shopedit', params)








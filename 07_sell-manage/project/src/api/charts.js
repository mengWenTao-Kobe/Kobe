/* 
  报表类接口
*/


import req from '@/utils/request'


// 订单报表接口
export let orderTotal = params => req.get('/order/ordertotal', params)
// 首页报表接口
export let totalData = params => req.get('/order/totaldata', params)


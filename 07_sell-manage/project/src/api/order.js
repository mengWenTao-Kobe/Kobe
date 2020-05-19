/* 
  订单相关接口
  created by 孟文韬 for 2020/05/05
*/

import req from '@/utils/request'

// 获取订单列表（含查询）
export let getOrderList = params => req.get('/order/orderlist', params)
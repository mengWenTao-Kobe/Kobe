/*
  订单相关所有请求
  created by 孟文韬 2020/4/6
*/

// 引入工具函数
import Ajax from '@/utils/request.js';

// 获取订单列表（含查询）
export let getOrderList=params=>Ajax.get('/order/orderlist',params)
// 获取订单详情
export let getOrderDetail=params=>Ajax.get('/order/orderdetail',params)
// 修改订单
export let orderEdit=params=>Ajax.post('/order/orderedit',params)






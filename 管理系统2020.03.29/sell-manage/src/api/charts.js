/*
  报表相关所有请求
  created by 孟文韬 2020/4/6
*/


// 引入Ajax工具函数
import Ajax from '@/utils/request';

// 首页报表请求
export let getTotalData = params => Ajax.get('/order/totaldata', params)
// 订单报表接口
export let getOrderTotal = params => Ajax.get('/order/ordertotal', params)
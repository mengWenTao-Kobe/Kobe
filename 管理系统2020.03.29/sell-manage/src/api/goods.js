/*
  商品相关所有请求
  created by 孟文韬 2020/4/6
*/

// 引入工具函数
import Ajax from '@/utils/request.js';

// 添加商品
export let addGoods = params => Ajax.post('/goods/goodsadd', params)
// 获取商品列表
export let getGoodsList = params => Ajax.get('/goods/goodslist', params)
// 删除商品
export let goodsDelete = params => Ajax.get('/goods/goodsdel', params)
// 编辑商品
export let goodsEdit = params => Ajax.post('/goods/goodsedit', params)





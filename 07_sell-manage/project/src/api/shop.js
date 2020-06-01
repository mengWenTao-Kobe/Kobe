/* 
  店铺相关接口
*/

import req from "@/utils/request"

// 获取店铺详情
export let getShopInfo = params => req.get("/shop/shopinfo", params)



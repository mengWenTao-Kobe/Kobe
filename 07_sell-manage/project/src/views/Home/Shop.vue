<template>
  <div class="shop">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 卡片标题 -->
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
      </div>
      <!-- 卡片内容 -->
      <div class="content">
        店铺内容
      </div>
    </el-card>
  </div>
</template>

<script>
import {getShopInfo} from "@/api/shop"

export default {
  created(){
    getShopInfo()
  }
};
</script>

<style lang="less" scoped>
</style>
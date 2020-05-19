<template>
  <div>
    <!-- 后台首页 -->
    <el-menu-item index="/home/index">
      <i class="iconfont icon-shouye-"></i>
      <span slot="title">后台首页</span>
    </el-menu-item>
    <!-- 订单管理 -->
    <el-menu-item index="/home/order">
      <i class="iconfont icon-dingdan"></i>
      <span slot="title">订单管理</span>
    </el-menu-item>
    <!-- 商品管理 -->
    <el-submenu index="/home/goods">
      <!-- 标题 -->
      <template slot="title">
        <i class="iconfont icon-shangpin"></i>
        <span>商品管理</span>
      </template>
      <!-- 内容 -->
      <el-menu-item index="/home/goods/goodslist">商品列表</el-menu-item>
      <el-menu-item index="/home/goods/goodsadd">添加商品</el-menu-item>
    </el-submenu>
    <!-- 店铺管理 -->
    <el-menu-item index="/home/shop">
      <i class="iconfont icon-dianpu"></i>
      <span slot="title">店铺管理</span>
    </el-menu-item>
    <!-- 帐号管理 -->
    <el-submenu index="/home/account">
      <!-- 标题 -->
      <template slot="title">
        <i class="iconfont icon-zhanghaoguanli"></i>
        <span>帐号管理</span>
      </template>
      <!-- 内容 -->
      <el-menu-item index="/home/account/accountlist">帐号列表</el-menu-item>
      <el-menu-item index="/home/account/accountadd">添加帐号</el-menu-item>
      <el-menu-item index="/home/account/modifypwd">修改密码</el-menu-item>
    </el-submenu>
    <!-- 销售统计 -->
    <el-submenu index="/home/total">
      <!-- 标题 -->
      <template slot="title">
        <i class="iconfont icon-xiaoshoutongji"></i>
        <span>销售统计</span>
      </template>
      <!-- 内容 -->
      <el-menu-item index="/home/total/goodstotal">商品统计</el-menu-item>
      <el-menu-item index="/home/total/ordertotal">订单统计</el-menu-item>
    </el-submenu>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
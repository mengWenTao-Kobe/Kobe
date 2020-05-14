<template>
  <div class="nav">
    <h2>
      <i class="iconfont icon-ziyuan"></i> 外卖商家中心
    </h2>
    <!-- 导航 -->
    <el-menu
      router
      :default-active="path"
      background-color="#304156"
      class="left-nav"
      text-color="#fff"
      unique-opened
    >
    <template v-for="(v,i) in menus">
      <!-- 没有儿子 -->
      <el-menu-item :index="v.index" :key="i" v-if="!v.children">
          <i :class="v.icon"></i>
          <span slot="title">{{v.title}}</span>
      </el-menu-item> 
      <!-- 有儿子 -->
      <el-submenu :index="v.index" :key="i" v-else>
        <template slot="title">
          <i :class="v.icon"></i>
          <span>{{v.title}}</span>
        </template>
        <el-menu-item v-for="(vv,ii) in v.children" :key="ii" :index="vv.index">{{vv.title}}</el-menu-item>
      </el-submenu>
    </template>
    
      <!-- 1 后台首页 -->
      <!-- <el-menu-item index="/index/home">
        <i class="iconfont icon-shouye-"></i>
        <span slot="title">后台首页</span>
      </el-menu-item> -->
      <!-- 2 订单管理 -->
      <!-- <el-menu-item index="/index/order">
        <i class="el-icon-document"></i>
        <span slot="title">订单管理</span>
      </el-menu-item> -->
      <!-- 3 商品管理 -->
      <!-- <el-submenu index="index/goodslist">
        <template slot="title">
          <i class="iconfont icon-shangpin"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/index/goodslist">商品列表</el-menu-item>
        <el-menu-item index="/index/goodsadd">添加商品</el-menu-item>
      </el-submenu> -->
      <!-- 4 店铺管理 -->
      <!-- <el-menu-item index="/index/shop">
        <i class="iconfont icon-dianpu"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item> -->
      <!-- 5 帐号管理 -->
      <!-- <el-submenu index="/index/accountlist">
        <template slot="title">
          <i class="iconfont icon-zhanghao"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item index="/index/accountlist">账号列表</el-menu-item>
        <el-menu-item index="/index/accountadd">添加帐号</el-menu-item>
        <el-menu-item index="/index/modifypass">修改密码</el-menu-item>
      </el-submenu> -->
      <!-- 6 销售统计 -->
      <!-- <el-submenu index="/index/goodstotal">
        <template slot="title">
          <i class="iconfont icon-xiaoshoutongji"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item index="/index/goodstotal">商品统计</el-menu-item>
        <el-menu-item index="/index/ordertotal">订单统计</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
// 引入local工具函数
import local from "@/utils/local";

export default {
  // 生命周期函数
  created(){
    // 获取本地角色
    let role=local.get('role')
    // console.log(role)
    // 把menus根据role进行过滤（权限过滤）当前role能访问的过滤出来
    this.menus=this.menus.filter(v=>v.roles.includes(role))
  },
  // 计算属性
  computed: {
    path() {
      if (this.$route.path == "/index/goodsedit") {return "/index/goodslist";}
      if (this.$route.path == "/index/orderdetail") {return "/index/order";}
      return this.$route.path;
    }
  },
  // 数据
  data(){
    return {
      menus:[
        // 1.后台首页
        {roles:['super','normal'], index:'/index/home',icon:'iconfont icon-shouye-',title:'后台首页'},
        // 2.订单管理
        {roles:['super','normal'], index:'/index/order',icon:'el-icon-document',title:'订单管理'},
        // 3.商品管理
        {roles:['super','normal'], index:'index/goodslist',icon:'iconfont icon-shangpin',title:'商品管理',children:[
          {index:'/index/goodslist',title:'商品列表'},
          {index:'/index/goodsadd',title:'添加商品'}
        ]},
        // 4.店铺管理
        {roles:['super','normal'], index:'/index/shop',icon:'iconfont icon-dianpu',title:'店铺管理'},
        // 5.账号管理
        {roles:['super'], index:'/index/accountlist',icon:'iconfont icon-zhanghao',title:'账号管理',children:[
          {index:'/index/accountlist',title:'账号列表'},
          {index:'/index/accountadd',title:'添加账号'},
          {index:'/index/modifypass',title:'修改密码'}
        ]},
        // 6.销售统计
        {roles:['super'], index:'/index/goodstotal',icon:'iconfont icon-xiaoshoutongji',title:'销售统计',children:[
          {index:'/index/goodstotal',title:'商品统计'},
          {index:'/index/ordertotal',title:'订单统计'}
        ]}
      ]
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  h2 {
    color: white;
    font-size: 18px;
    line-height: 60px;
    text-align: center;
  }
  .icon-ziyuan {
    background: #1296db;
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 30px;
    vertical-align: middle;
    color: #304156;
  }
  flex: 0 0 200px;
  background: #304156;
  .el-menu {
    border-right: solid 1px #304156;
    .el-submenu {
      /deep/.el-menu--inline {
        .el-menu-item {
          background: #202f3f !important;
        }
      }
    }
  }
}
.icon-shouye- {
  font-size: 22px;
  margin-right: 8px;
}
.icon-shangpin {
  font-size: 20px;
  margin-right: 8px;
}
.icon-dianpu {
  font-size: 20px;
  margin-right: 8px;
}
.icon-zhanghao {
  font-size: 24px;
  margin-right: 5px;
}
.icon-xiaoshoutongji {
  font-size: 19px;
  margin-right: 8px;
}
</style>
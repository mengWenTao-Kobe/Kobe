<template>
  <div class="nav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      unique-opened
      router
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409eff"
    >
      <template v-for="v in navData">
        <!-- 没有儿子的 -->
        <el-menu-item :index="v.index" :key="v.index" v-if="!v.children">
          <i :class="v.icon"></i>
          <span slot="title">{{v.title}}</span>
        </el-menu-item>

        <!-- 有儿子的 -->
        <el-submenu :index="v.index" :key="v.index" v-else>
          <!-- 标题 -->
          <template slot="title">
            <i :class="v.icon"></i>
            <span>{{v.title}}</span>
          </template>
          <!-- 内容 -->
          <el-menu-item v-for="child in v.children" :key="child.index" :index="child.index">{{child.title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  created(){
    // 一进来就重置navData，包含当前用户的过滤出来,也就是用户能访问的过滤出来
    let currentRole=local.get('role')
    this.navData=this.navData.filter(v=>v.roles.includes(currentRole))
  },
  data(){
    return {
      navData:[
        // 后台首页
        {roles:['super','normal'],index:'/home/index',icon:'iconfont icon-shouye-',title:'后台首页'},
        // 订单管理
        {roles:['super','normal'],index:'/home/order',icon:'iconfont icon-dingdan',title:'订单管理'},
        // 商品管理
        {roles:['super','normal'],index:'/home/goods',icon:'iconfont icon-shangpin',title:'商品管理',children:[
          {index:'/home/goods/goodslist',title:'商品列表'},
          {index:'/home/goods/goodsadd',title:'添加商品'}
        ]},
        // 店铺管理
        {roles:['super','normal'],index:"/home/shop",icon:'iconfont icon-dianpu',title:'店铺管理'},
        // 账号管理
        {roles:['super'],index:'/home/account',icon:'iconfont icon-zhanghaoguanli',title:'账号管理',children:[
          {index:'/home/account/accountlist',title:'帐号列表'},
          {index:'/home/account/accountadd',title:'添加账号'},
          {index:'/home/account/modifypwd',title:'修改密码'}
        ]},
        // 销售统计
        {roles:['super'],index:'/home/total',icon:"iconfont icon-xiaoshoutongji",title:'销售统计',children:[
          {index:'/home/total/goodstotal',title:'商品统计'},
          {index:'/home/total/ordertotal',title:'订单统计'}
        ]}
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    }
  },
  computed:{
    activeIndex(){
      if(this.$route.path.includes('/home/order')){
        return '/home/order'
      }else{
        return this.$route.path
      }
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  background: purple;
  .el-menu {
    border: none;
    .el-menu--inline {
      .el-menu-item{
        background-color: #202f3f !important;
      }
    }
    .iconfont {
      margin-right: 8px;
      font-size: 20px;
    }
  }
}
</style>
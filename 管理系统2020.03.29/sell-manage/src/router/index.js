import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入组件
import Login from '../views/Login.vue'

// 配置路由
const routes = [
  // 登录
  {
    path: '/login',
    component: Login
  },
  // 测试
  {
    path: '/test',
    component: () => import('../views/Test.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  // 后端首页
  {
    path: '/index',
    meta: { bread: { path: "/index/home", title: "首页" }, role: ['super', 'normal'] },
    component: () => import('../views/Index.vue'),  //路由的懒加载
    redirect: '/index/home',
    children: [
      // 后台首页
      {
        path: '/index/home',
        meta: { bread: { path: "/index/home", title: "首页" }, role: ['super', 'normal'] },
        component: () => import("../views/Home/Home.vue")
      },
      // 个人中心
      {
        path: '/index/personal',
        meta: { bread: { path: "/index/personal", title: "个人中心" }, role: ['super', 'normal'] },
        component: () => import("../views/Home/Account/Personal.vue")
      },
      // 订单管理
      {
        path: '/index/order',
        meta: {bread:{ path: "/index/order", title: "订单管理" },role: ['super', 'normal']},
        component: () => import("../views/Home/Order.vue")
      },
      // 订单详情
      {
        name: 'OrderDetail',
        path: '/index/orderdetail',
        meta: {bread:{ path: "/index/orderdetail", title: "订单详情" },role: ['super', 'normal']},
        component: () => import("../views/Home/OrderDetail.vue")
      },
      // 商品
      // 商品-列表
      {
        path: '/index/goodslist',
        meta: {bread:{ path: "/index/goodslist", title: "商品列表" },role: ['super', 'normal']},
        component: () => import("../views/Home/Goods/GoodsList.vue")
      },
      // 商品-添加
      {
        path: '/index/goodsadd',
        meta: {bread:{ path: "/index/goodsadd", title: "商品添加" },role: ['super', 'normal']},
        component: () => import("../views/Home/Goods/GoodsAdd.vue")
      },
      // 商品-编辑
      {
        path: '/index/goodsedit',
        meta: {bread:{ path: "/index/goodsedit", title: "商品编辑" },role: ['super', 'normal']},
        component: () => import("../views/Home/Goods/GoodsEdit.vue")
      },
      // 店铺管理
      {
        path: '/index/shop',
        meta: {bread:{ path: "/index/shop", title: "店铺管理" },role: ['super', 'normal']},
        component: () => import("../views/Home/Shop.vue")
      },
      //  帐号
      // 帐号-帐号列表
      {
        path: '/index/accountlist',
        meta: {bread:{ path: "/index/accountlist", title: "账号列表" },role: ['super']},
        component: () => import("../views/Home/Account/AccountList.vue")
      },
      // 帐号-添加账号
      {
        path: '/index/accountadd',
        meta: {bread:{ path: "/index/accountadd", title: "帐号添加" },role: ['super']},
        component: () => import("../views/Home/Account/AccountAdd.vue")
      },
      // 帐号-修改密码
      {
        path: '/index/modifypass',
        meta: {bread:{ path: "/index/modifypass", title: "修改密码" },role: ['super']},
        component: () => import("../views/Home/Account/ModifyPass.vue")
      },
      // 销售统计
      // 销售统计-商品统计
      {
        path: '/index/goodstotal',
        meta: {bread:{ path: "/index/goodstotal", title: "商品统计" },role: ['super']},
        component: () => import("../views/Home/Total/GoodsTotal.vue")
      },
      // 销售统计-订单统计
      {
        path: '/index/ordertotal',
        meta: {bread:{ path: "/index/ordertotal", title: "订单统计" },role: ['super']},
        component: () => import("../views/Home/Total/OrderTotal.vue")
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

// 导出路由
export default router;

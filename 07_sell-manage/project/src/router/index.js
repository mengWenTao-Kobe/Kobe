import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 配置路由
const routes = [
  // 登录
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  // 测试
  {
    path:'/test',
    component:()=>import('../views/Test.vue')
  },
  // 后台
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    redirect: '/home/index',
    children: [
      // 后台首页
      {
        path: '/home/index',
        component: () => import('../views/Home/Index.vue'),
        meta:{
          bread:[{to:'/home/index',title:'首页'}],
          role:['super','normal']
        }
      },
      // 个人中心
      {
        path: '/home/personal',
        component: () => import('../views/Home/Personal.vue'),
        meta:{
          bread:[{to:'/home/personal',title:'个人中心'}],
          role:['super','normal']
        }
      },
      // 订单管理
      {
        path: '/home/order',
        component: () => import('../views/Home/Order.vue'),
        meta:{
          bread:[{to:'/home/order',title:'订单管理'}],
          role:['super','normal']
        }
      },
      // 订单详情
      {
        path: '/home/orderdetail',
        name:'order-detail',
        component: () => import('../views/Home/Orderdetail.vue'),
        meta:{
          bread:[{to:'/home/order',title:'订单管理'},{to:'/home/orderdetail',title:'订单详情'}],
          role:['super','normal']
        }
      },
      // 商品管理
      {
        path: '/home/goods',
        component: () => import('../views/Home/Goods.vue'),
        redirect:'/home/goods/goodslist',
        children: [
          // 商品列表
          {
            path: '/home/goods/goodslist',
            component: () => import('../views/Home/Goods/GoodsList.vue'),
            meta:{
              bread:[
                {to:'/home/goods',title:'商品管理'},
                {to:'/home/goods/goodslist',title:'商品列表'}
              ],
              role:['super','normal']
            }
          },
          // 添加商品
          {
            path: '/home/goods/goodsadd',
            component: () => import('../views/Home/Goods/GoodsAdd.vue'),
            meta:{
              bread:[
                {to:'/home/goods',title:'商品管理'},
                {to:'/home/goods/goodsadd',title:'添加商品'},
              ],
              role:['super','normal']
            }
          }

        ]
      },
      // 店铺管理
      {
        path: '/home/shop',
        component: () => import('../views/Home/Shop.vue'),
        meta:{
          bread:[{to:'/home/shop',title:'店铺管理'}],
          role:['super','normal']
        }
      },
      // 账号管理
      {
        path: '/home/account',
        component: () => import('../views/Home/Account.vue'),
        redirect:'/home/account/accountlist',
        children:[
          // 账号列表
          {
            path: '/home/account/accountlist',
            component: () => import('../views/Home/Account/AccountList.vue'),
            meta:{
              bread:[
                {to:'/home/account',title:'账号管理'},
                {to:'/home/account/accountlist',title:'账号列表'}
              ],
              role:['super']
            }
          },
          // 添加账号
          {
            path: '/home/account/accountadd',
            component: () => import('../views/Home/Account/AccountAdd.vue'),
            meta:{
              bread:[
                {to:'/home/account',title:'账号管理'},
                {to:'/home/account/accountadd',title:'添加账号'}
              ],
              role:['super']
            }
          },
          // 修改密码
          {
            path: '/home/account/modifypwd',
            component: () => import('../views/Home/Account/ModifyPwd.vue'),
            meta:{
              bread:[
                {to:'/home/account',title:'账号管理'},
                {to:'/home/account/modifypwd',title:'修改密码'}
              ],
              role:['super']
            }
          }
        ]
      },
      // 销售统计
      {
        path: '/home/total',
        component: () => import('../views/Home/Total.vue'),
        redirect:'/home/total/goodstotal',
        children:[
          // 商品统计
          {
            path:'/home/total/goodstotal',
            component:()=>import('@/views/Home/Total/GoodsTotal.vue'),
            meta:{
              bread:[
                {to:'/home/total',title:'销售统计'},
                {to:'/home/total/goodstotal',title:'商品统计'}
              ],
              role:['super']
            }
          },
          // 订单统计
          {
            path:'/home/total/ordertotal',
            component:()=>import('@/views/Home/Total/OrderTotal.vue'),
            meta:{
              bread:[
                {to:'/home/total',title:'销售统计'},
                {to:'/home/total/ordertotal',title:'订单统计'}
              ],
              role:['super']
            }
          }
        ]
      }
    ]
  }
]


export default new VueRouter({
  routes
})

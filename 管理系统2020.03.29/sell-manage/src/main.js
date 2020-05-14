import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'

// 引入重置样式
import './assets/css/reset.css'
// 引入iconfont.css
import './assets/fonts/iconfont/iconfont.css'

// 引入本地存储工具函数
import local from '@/utils/local';

// 1.引入elementUI模块
import ElementUI from 'element-ui';
// 2.引入全局样式
import 'element-ui/lib/theme-chalk/index.css';
// 3.全局注册elementUI模块
Vue.use(ElementUI)

// bus 在Vue类的原型上挂载一个实例$bus(组件通讯)
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false;

// 路由守卫 没有token只能从登录界面进去
router.beforeEach((to, from, next) => {
  let user = local.get('role')
  // 如果当前路由的用户组不包含role，就跳登录
  if (to.meta.role && !to.meta.role.includes(user)) {
    alert('哈哈，兄弟，权限不够想干嘛？')
    next('/login')  //这里可以自己写一个404页面
  }

  // 取出本地令牌
  let token = local.get('token')
  // 判断
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

// 挂载路由
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

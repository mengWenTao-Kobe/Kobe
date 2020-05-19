import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import local from './utils/local'
import session from './utils/session'
import { Message } from 'element-ui'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: require('./assets/images/timg.jpg'),
  loading: require('./assets/images/timg.gif'),// 懒加载使用的图片
})

Vue.config.productionTip = false

// 集成elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './assets/css/reset.css' // 集成reset.css
import './assets/fonts/iconfont.css' // 集成iconfont

// 中介传值
Vue.prototype.$bus=new Vue()

// 路由守卫(路由地址发生变化前，拦截所有路由，只有调用next方法才能放行)
router.beforeEach((to, from, next) => {
  // 如果要去的路由的meta里面的用户组不包含当前用户，就限制
  let currentRole=local.get('role')
  if(to.meta.role&&!to.meta.role.includes(currentRole)){
    alert('没有权限！')
    next('/login')
  }

  let token = local.get('token')
  if (token) {  //有token的情况下
    next() //放行
  } else {  //没有token的情况下，不能访问本网站的其他路由（除了login）
    if (to.path === '/login') {
      next()
    }
    else {
      Message.warning('登录之后才能访问！')
      next('/login')
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')






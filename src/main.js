import App from './App'
import 'element-ui/lib/theme-default/index.css'
import store from './vuex/store'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import Vuex from 'vuex'

import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

// import ajax from
// 设置axios请求的token
// axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'
//设置请求头
// axios.defaults.headers.post["Content-type"] = 'application/json;charset=utf-8'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
//NProgress.configure({ showSpinner: false });

Vue.prototype.$axios = axios //将axios挂载在Vue实例原型上

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = sessionStorage.getItem('user');
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 注册elm-ui
Vue.use(ElementUI);

//绑定到原型上
Vue.prototype.$axios=axios;
//设置基准路径
axios.defaults.baseURL="http://111.230.181.206:3000";

//设置一个添加基准路径的公共方法
Vue.prototype.$fullImageSrc=(src)=>{
    return src.includes('http')? src:axios.defaults.baseURL+src;
}

//设置路由守卫
router.beforeEach((to, from, next) => {
  let token=localStorage.getItem('token');

  let goToAuthority=[
    '/'
  ]

  if(goToAuthority.includes(to.path)){
    if(token){
      next();
    }else{
      next('/login');
      // router.replace('/login');
    }
  }else{
    next();
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

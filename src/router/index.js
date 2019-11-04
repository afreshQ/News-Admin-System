import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login';
import PostList from '@/components/PostList'
import PostArticle from '@/components/PostArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/postlist',
          name: 'postList',
          component: PostList,
        },
        {
          path: '/postarticle',
          name: 'postArticle',
          component: PostArticle,
        }
      ]
    },
    {
      path: '/login',
      name: 'loginPage',
      component: Login
    }
  ]
})

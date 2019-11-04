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
      meta: '首页',
      component: Home,
      children:[
        {
          path: '/postlist',
          name: 'postList',
          meta: '文章列表',
          component: PostList,
        },
        {
          path: '/postarticle',
          name: 'postArticle',
          meta: '发布文章',
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

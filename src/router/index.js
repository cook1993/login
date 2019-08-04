import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import Notfonud from '@/views/404'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [

    {
      path: '/login',
      name: 'login',
      component: Login

    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          component: Welcome

        },
        {
          path: '/article',
          name: 'article',
          component: Article
        }
      ]
    },
    // 处理404
    {
      path: '*', name: '404', component: Notfonud
    }
  ]
})
export default router

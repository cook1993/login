import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import Notfonud from '@/views/404'
import store from '@/store'
import Image from '@/views/image'
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
        },
        {
          path: '/image',
          name: 'image',
          component: Image
        }
      ]
    },
    // 处理404
    {
      path: '*', name: '404', component: Notfonud
    }
  ]
})
// 前置导航守卫
router.beforeEach((to, from, next) => {
  // // 1.判断是不是登录路由
  // if (to.path === '.login') return next()
  // // 2.判断是否登录
  // if (!store.getUser().token) return next('/login')
  // // 3.放行
  // next()
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router

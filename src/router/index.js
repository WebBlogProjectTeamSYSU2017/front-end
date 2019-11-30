import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import index from '@/components/index'
import page404 from '@/components/404'
import root from '@/components/root'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/votes',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/home/:email',
      name: 'home',
      component: home
    },
    {
      path: '/root',
      name: 'root',
      component: root
    },
    {
      path: '/*',
      name: '404',
      component: page404
    }
  ]
})

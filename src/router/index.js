import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import index from '@/components/index'

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
    }
  ]
})

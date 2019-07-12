import Vue from 'vue'
import Router from 'vue-router'
import Goods from './pages/Goods.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    //评价
    {
      path: '/evaluate',
      name: 'evaluate',
      component: () => import('./pages/Evaluate.vue')
    },
    //商家
    {
      path: '/merchant',
      name: 'merchant',
      component: () => import('./pages/Merchant.vue')
    },
  ]
})

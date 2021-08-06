import Vue from 'vue'
import Router from 'vue-router'
import produtos from './views/produtos.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'produtos',
      component: produtos
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
})
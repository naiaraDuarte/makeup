import Vue from 'vue'
import VueRouter from 'vue-router'
import produtos from './views/produtos.vue'

Vue.use(VueRouter)


const routes = [{
      path: '/',
      name: 'produtos',
      component: produtos
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
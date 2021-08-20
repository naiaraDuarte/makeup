import Vue from 'vue'
import VueRouter from 'vue-router'
import produtos from './views/produtos.vue'
import home from './views/Home.vue';
import usuario from './views/usuario.vue';
import adm from './views/administrador.vue';

Vue.use(VueRouter)


const routes = [{
      path: '/produtos',
      name: 'produtos',
      component: produtos
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: usuario
    },
    {
      path: '/adm',
      name: 'adm',
      component: adm
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
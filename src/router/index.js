import Vue from 'vue'
import VueRouter from 'vue-router'

import Inventario_P from '../views/Inventario_P.vue'
import Inventario_D from '../views/Inventario_D.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Inventario_P
  },
  {
    path: '/detalhe/:id',
    name: 'detalhes',
    component: Inventario_D
  }

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
 
})

export default router

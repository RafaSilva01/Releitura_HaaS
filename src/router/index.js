import Vue from 'vue'
import VueRouter from 'vue-router'

import Item_Configuracao from '../views/Item_Configuracao.vue'
import Item_Config_Detalhe from '../views/Item_Config_Detalhe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Item_Configuracao
  },
  {
    path: '/detalhe/:id',
    name: 'detalhes',
    component: Item_Config_Detalhe
  }

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
 
})

export default router

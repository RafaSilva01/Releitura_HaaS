<template>
    <div class="home">
      <Inventario_D/>
      <Inventario_I/>
      
    </div>
  </template>
  
  <script>
 
  import Inventario_D from '@/components/Inventario_D.vue'
  import Inventario_I from '@/components/Inventario_I.vue'



  export default {
    name: 'HomeView',
    components: {
      Inventario_D,
      Inventario_I,
      
    
    }
  }
  </script>
  
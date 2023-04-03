<template>
  <div class="home">
    <Item_Config_Detalhe />
    <Item_Config_Histo/>
 </div>
</template>

<script>
import Item_Config_Detalhe from '@/components/Item_Config_Detalhe.vue';
import Item_Config_Histo from '@/components/Item_Config_Histo.vue';

export default{
  name: 'HomeView',
  components: {
    Item_Config_Histo,
    Item_Config_Detalhe
  }
}
</script>
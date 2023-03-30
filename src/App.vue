<template>
  <v-app>
    <Layte_V/>
    <v-main> <router-view/> </v-main>
    <Footer_V/>
</v-app>
</template>
<script>
  import Footer_V from './components/footer_V.vue';
  import Layte_V from './components/Layte_V.vue';
    export default{
      components: {
    Layte_V,
    Footer_V
}
    }

</script>

  
<template>
  <v-app>
    <Layout_V/>
    <v-main> <router-view/> </v-main>
    <Footer_V/>
</v-app>
</template>
<script>
  import Footer_V from './components/Footer_V.vue';
  import Layout_V from './components/Layout_V.vue';
    export default{
      components: {
    Layout_V,
    Footer_V
}
    }

</script>

  
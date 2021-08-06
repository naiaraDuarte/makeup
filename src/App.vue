<template>
  <v-app>
    <navbar></navbar>
   <v-container fluid style="padding-top: 60px">
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import './assets/css/main.scss';
import navbar from './components/layout/navbar.vue';
// import appHeader from './components/layout/header.vue';

export default {
  name: 'App',

  components: {
    // appHeader,
    navbar
  },

  data: () => ({
    //
  }),
};
</script>

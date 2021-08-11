<template>
  <v-app>
    <!-- <navbar></navbar> -->
    <app-header></app-header>
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import "./assets/css/main.scss";
// import navbar from "./components/layout/navbar.vue";
import appHeader from './components/layout/header.vue';
export default {
  name: "App",
  components: {
    appHeader,
    // navbar,
  },
  data: () => ({
    //
  }),
};
</script>
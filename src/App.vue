<template>
  <v-app>
    <navbar v-if="$store.state.perfil == 'adm'"></navbar>
    <app-header v-if="$store.state.perfil == 'usuario'"></app-header>
    <v-content>
      <v-container fluid>
          <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import "./assets/css/main.scss";
import navbar from "./components/layout/navbar.vue";
import appHeader from "./components/layout/header.vue";
export default {
  name: "App",
  components: {
    appHeader,
    navbar,
  },
  data: () => ({
    //
  }),
};
</script>
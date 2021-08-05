<template>
  <v-app class="grey lighten-4">
    <appnavbar />

    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
    
  </v-app>
</template>

<script>
import appnavbar from "@/components/layout/navbar.vue";

export default {
  components: { appnavbar },
  name: 'App',
  data () {
    return {
      
    }
  }
}
</script>

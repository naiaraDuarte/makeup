<template>
  <v-container fluid>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, i) in 5" :key="i">
        <v-expansion-panel-header border="left" colored-border-color="deep-purple accent-4" > Item </v-expansion-panel-header>
      </v-expansion-panel>
    </v-expansion-panels>
    <div>
      <v-alert
        border="left"
        colored-border
        color="deep-purple accent-4"
        elevation="2"
      >
        Aliquam eu nunc. Fusce commodo aliquam arcu. In consectetuer turpis ut
        velit. Nulla facilisi.. Morbi mollis tellus ac sapien. Fusce vel dui.
        Praesent ut ligula non mi varius sagittis. Vivamus consectetuer
        hendrerit lacus. Suspendisse enim turpis, dictum sed, iaculis a,
        condimentum nec, nisi.
      </v-alert>
    </div>
  </v-container>
</template>
<script>
export default {
  mounted() {
    this.$store.state.perfil = "adm";
  },
};
</script>
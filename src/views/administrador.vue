<template>
  <v-container>
    <v-row>
      <v-card elevation="3" class="mt-5">
         <listagemUsuario></listagemUsuario>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import listagemUsuario from '@/components/pages/administrador/listagemUsuarios.vue';
export default {
  components: {
    listagemUsuario
  },
  mounted() {
    this.$store.state.perfil = "adm";
  },
};
</script>
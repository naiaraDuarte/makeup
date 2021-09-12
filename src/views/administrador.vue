<template>
  <v-container>
    <v-row>
      <v-card elevation="3" class="mt-5" v-if="troca == 1">
         <listagemUsuario></listagemUsuario>
      </v-card>
      <v-card elevation="3" class="mt-5" v-if="troca == 2">
         <pedidos></pedidos>
      </v-card>
       <v-card elevation="3" class="mt-5" v-if="troca == 3">
         <cupons></cupons>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import listagemUsuario from '@/components/pages/administrador/listagemUsuarios.vue';
import pedidos from '../components/pages/administrador/pedidos.vue';
import cupons from '../components/pages/administrador/cupons.vue';

export default {
  components: {
    listagemUsuario,
    pedidos,
    cupons
  },
  mounted() {
    this.$store.state.perfil = "adm";
  },
  computed: {
    troca(){
      return this.$store.state.trocaDeComponentesAdm;
    }
  }
};
</script>
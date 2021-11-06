<template>
  <v-container>
    <v-row>
      <v-card elevation="3" class="mt-5" v-if="troca == 0">
         <dashboard></dashboard>
      </v-card>
      <v-card elevation="3" class="mt-5" v-if="troca == 1">
         <listagemUsuario></listagemUsuario>
      </v-card>
      <v-card elevation="3" class="mt-5" v-if="troca == 2">
         <pedidos></pedidos>
      </v-card>
       <v-card elevation="3" class="mt-5" v-if="troca == 3">
         <cupons></cupons>
      </v-card>
       <v-card elevation="3" class="mt-5" v-if="troca == 4">
         <produtos></produtos>
      </v-card>
      <v-card elevation="3" class="mt-5" v-if="troca == 5">
         <categorias></categorias>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import listagemUsuario from '@/components/pages/administrador/listagemUsuarios.vue';
import pedidos from '../components/pages/administrador/pedidos.vue';
import cupons from '../components/pages/administrador/cupons.vue';
import dashboard from '../components/pages/administrador/dashboard.vue';
import produtos from '../components/pages/administrador/produtos.vue';
import categorias from '../components/pages/administrador/categorias.vue';

export default {
  components: {
    listagemUsuario,
    pedidos,
    cupons,
    dashboard,
    produtos,
    categorias
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
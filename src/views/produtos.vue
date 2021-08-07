<template>
  <div>
    <v-row class="mt-5">
      <v-col lg="10">
        <h1 class="namePage">
          <v-icon x-large>mdi-chevron-double-right</v-icon> Produtos
        </h1>
      </v-col>
      <v-col class="mt-4" lg="2">
        <v-btn
          elevation="5"
          color="black"
          class="nameBtn"
          @click="trocaDeValores()"
          >{{ componente }}</v-btn
        >
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <component :is="componente" />
  </div>
</template>

<script>
import Cadastrar from "../components/pages/produtos/cadastro.vue";
import Visualizar from "../components/pages/produtos/visualizacao.vue";

export default {
  components: {
    Cadastrar,
    Visualizar,
  },

  data: () => ({
    componente: "Cadastrar",
  }),
  methods: {
    trocaDeValores() {
      this.componente == "Cadastrar" ? this.componente = "Visualizar" : this.componente = "Cadastrar" ;
    },
  },
};
</script>


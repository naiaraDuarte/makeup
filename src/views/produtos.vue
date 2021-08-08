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
          >{{ txtDoBotao }}</v-btn
        >
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <component :is="componente" />
  </div>
</template>

<script>
import adicionarProduto from "../components/pages/produtos/cadastro.vue";
import Visualizar from "../components/pages/produtos/visualizacao.vue";

export default {
  components: {
    adicionarProduto,
    Visualizar,
  },

  data: () => ({
    componente: "adicionarProduto",
    txtDoBotao: "Visualizar"
  }),
  methods: {
    trocaDeValores() {
      if (this.componente == "adicionarProduto") {
        this.componente = "Visualizar";
        this.txtDoBotao = "Adicionar";
      }else{
        this.componente = "adicionarProduto";
        this.txtDoBotao = "Visualizar";
      }
      // this.componente == "Cadastrar" ? this.componente = "Visualizar" : this.componente = "Cadastrar" ;
    },
  },
};
</script>


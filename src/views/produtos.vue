<template>
  <div>
    <v-row class="mt-5">
      <v-col lg="8">
        <h1 class="namePage">
          <v-icon x-large>mdi-chevron-double-right</v-icon> Produtos
        </h1>
      </v-col>
      <v-col class="mt-4 text-right" lg="4">
        <v-btn elevation="0" @click="drawer = !drawer" v-if="componente ==  'visualizar'" class="btnFilter mr-4"
          > <v-icon>
           mdi-filter-outline 
          </v-icon>
           </v-btn
        >
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
    <component :is="componente" :drawer="drawer"/>
  </div>
</template>

<script>
import adicionarProduto from "../components/pages/produtos/cadastro.vue";
import visualizar from "../components/pages/produtos/visualizacao.vue";

export default {
  components: {
    adicionarProduto,
    visualizar,
  },

  data: () => ({
    componente: "adicionarProduto",
    txtDoBotao: "Visualizar",
    drawer: true,
  }),
  methods: {
    trocaDeValores() {
      if (this.componente == "adicionarProduto") {
        this.componente = "visualizar";
        this.txtDoBotao = "Adicionar";
      } else {
        this.componente = "adicionarProduto";
        this.txtDoBotao = "Visualizar";
      }
    },
  },
};
</script>


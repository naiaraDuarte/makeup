<template>
  <div>
    <h3>Produtos</h3>
    <v-btn elevation="8" v-if="componente === 'cadastro'" @click="componente = 'visualizacao'">Visualização</v-btn>
    <v-btn elevation="8" v-if="componente === 'visualizacao'" @click="componente = 'cadastro'">Cadastro</v-btn>
    <component :is="componente" />
  </div>
</template>

<script>
import cadastro from "../components/pages/produtos/cadastro.vue";
import visualizacao from "../components/pages/produtos/visualizacao.vue";

export default {
  components: {
    cadastro,
    visualizacao

  },

  data: () => ({
    componente: "cadastro",
  }),
};
</script>



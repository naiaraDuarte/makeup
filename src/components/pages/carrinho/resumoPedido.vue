<template>
  <v-container>
    <h2>Resumo do pedido</h2>
    <v-row v-if="$store.state.carrinho.length > 0">
      <v-col lg="12" class="px-2">
        <v-row
          v-for="(item, i) in $store.state.carrinho"
          :key="i"
          class="centraliza"
        >
          <v-col lg="3">
            <v-img height="50" width="50" :src="getImgUrl(item.src)"></v-img>
          </v-col>
          <v-col lg="7">
            <p>{{ item.nome }}</p>
          </v-col>

          <v-col lg="2">
            <p>{{ item.preco }}</p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-col>
      <v-col lg="12">
        <v-row>
          <v-col lg="12">
            <v-card class="separa" elevation="0">
              <p>{{ $store.state.carrinho.length + 1 }} Produtos</p>
              <p>{{ $n(parseFloat(totalProdutos), "currency") }}</p>
            </v-card>
            <v-card class="separa" elevation="0">
              <p>Frete</p>
              <p>{{ $n(parseFloat(totalFrete), "currency") }}</p>
            </v-card>
            <v-divider></v-divider>
            <v-card class="separa" elevation="0">
              <h3>Total</h3>
              <h3>
                {{ $n(parseFloat(totalProdutos + totalFrete), "currency") }}
              </h3>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      totalProdutos: 0,
      totalFrete: 0,
    };
  },
  mounted() {
    if (this.$store.state.carrinho.length > 0) {
      this.$store.state.carrinho.forEach((item) => {
        this.totalProdutos += item.qtd * item.preco;
      });
    }
  },
  methods: {
    getImgUrl(pic) {
      return require("../../../assets/images/" + pic);
    },
  },
};
</script>
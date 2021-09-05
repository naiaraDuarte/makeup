<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card elevation="0">
          <h2>Meu carrinho</h2>
          <v-divider></v-divider>
          <v-row>
            <v-col lg="12" class="px-2">
              <v-row
                v-for="(item, i) in $store.state.carrinho"
                :key="i"
                class="centraliza"
              >
                <v-col lg="3">
                  <v-img
                    height="100"
                    width="100"
                    :src="getImgUrl(item.src)"
                  ></v-img>
                </v-col>
                <v-col lg="5">
                  <p>{{ item.nome }}</p>
                </v-col>
                <v-col lg="2">
                  <v-row>
                    <v-col lg="4">
                      <v-btn
                        icon
                        small
                        elevation="1"
                        @click="atualizarCarrinho(item, 'add')"
                      >
                        <v-icon> mdi-plus </v-icon>
                      </v-btn>
                    </v-col>
                    <v-col lg="4">
                      <p>5</p>
                    </v-col>
                    <v-col lg="4">
                      <v-btn
                        icon
                        small
                        elevation="1"
                        @click="atualizarCarrinho(item, 'sub')"
                      >
                        <v-icon> mdi-minus </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col lg="2">
                  <h3>{{ item.preco }}</h3>
                </v-col>
              </v-row>
               <v-divider></v-divider>
            </v-col>
            <v-col lg="12">
              <v-row>
                <v-col lg="8">
                  <v-row>
                    <v-col lg="4">
                      <p>Calcular o frete</p>
                      <p>estimados para a sua região</p>
                    </v-col>
                    <v-col lg="4">
                      <v-text-field
                        v-model="cep"
                        v-mask="['#####-###']"
                        label="CEP"
                        @blur="pesquisarCep"
                        id="cep"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col lg="4">
                        <v-btn color="primary"> Calcular </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col lg="4">
                    <v-card class="separa" elevation="0">
                        <p>03 Produtos</p>
                        <p><b>R$ 96,00</b></p>
                    </v-card>
                    <v-card class="separa" elevation="0">
                        <p>Frete</p>
                        <p><b>R$ 96,00</b></p>
                    </v-card>
                    <v-divider></v-divider>
                    <h3>Total</h3>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      pesquisarCep: "",
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("../../../assets/images/" + pic);
    },
  },
};
</script>
<style>
.separa{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
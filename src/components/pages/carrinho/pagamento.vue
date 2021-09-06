<template>
  <v-container fluid>
    <v-card class="px-3">
      <v-row>
        <v-col lg="7">
          <h2>Pagamento</h2>
          <p>Você tem um cupom de pagamento <b>Desejo usá-lo agora</b></p>
          <v-card elevation="0" class="mt-3">
            <h4>
              <v-icon>mdi-credit-card-plus-outline</v-icon>Cartão de crédito
            </h4>
            
            <!-- <v-combobox
              class="mt-3"
              outlined
              dense
              v-model="cartoes"
              :items="itensDivisoes"
              label="Adicionar cartões"
            ></v-combobox> -->
          </v-card>
          <v-card> 
              <cartao></cartao>
          </v-card>
        </v-col>
        <v-col lg="5" class="red"></v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import cartao from "../usuario/pagamento.vue";

export default {
  components: { cartao },
  data() {
    return {
      cartoes: "",
      itensDivisoes: [
        "Pagar com 1 cartão",
        "Pagar com 2 cartões",
        "Pagar com 3 cartões",
      ],
    };
  },
};
</script>
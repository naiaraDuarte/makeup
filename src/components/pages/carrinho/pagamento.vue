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
            <v-row v-if="$store.state.cartoes.length > 0">
              <v-col
                lg="6"
                v-for="(item, i) in this.$store.state.cartoes"
                :key="i"
              >
                <v-card elevation="0" @click="marca(item.id)">
                  <cartao
                    :nome="item.nome"
                    :numero="item.numero"
                    :data="item.data_validade"
                    :id="i"
                  ></cartao>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col>
                <h4>Você ainda não possui cartões cadastrados</h4>
              </v-col>
            </v-row>

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
            <addCartao></addCartao>
          </v-card>
        </v-col>
        <v-col lg="5" class="red"></v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import addCartao from "../usuario/pagamento.vue";
import cartao from "../../ui/cartao.vue";
export default {
  components: { addCartao, cartao },
  data() {
    return {
      cartoes: "",
      marcados: [],
      itensDivisoes: [
        "Pagar com 1 cartão",
        "Pagar com 2 cartões",
        "Pagar com 3 cartões",
      ],
    };
  },
  mounted() {
    console.log(this.$store.state.carrinho);
  },
  methods: {
    marca(val) {
      this.marcados.push(val);
      console.log(this.marcados);
    },
  },
};
</script>
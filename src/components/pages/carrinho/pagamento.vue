<template>
  <v-container fluid>
    <v-card class="px-3" elevation="0">
      <v-row>
        <v-col lg="6">
          <h2>Pagamento</h2>
          <p>Você tem um cupom de pagamento <b>Desejo usá-lo agora</b></p>
          <v-card elevation="0" class="mt-3">
            <h4>
              <v-icon>mdi-credit-card-plus-outline</v-icon> Cartão de crédito
              <v-btn
                elevation="0"
                text
                v-if="mostrar == false"
                class="btnSubmit"
                @click="mostrar = true"
                ><v-icon left> mdi-plus </v-icon> add cartão</v-btn
              >
            </h4>
            <p>Selecione os cartões que deseja pagar</p>
            <v-row v-if="$store.state.cartoes.length > 0">
              <v-col
                lg="6"
                class="pl-0"
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

              <v-btn
                elevation="1"
                icon
                id="ir"
                v-if="mostrar == true"
                @click="mostrar = false"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </v-row>
            <v-row v-else>
              <v-col>
                <h4>Você ainda não possui cartões cadastrados</h4>
              </v-col>
            </v-row>
            <v-row v-if="$store.state.cartoes.length > 0 && mostrar == true">
              <v-col>
                <addCartao></addCartao>
              </v-col>
            </v-row>
            <v-row>
              <v-col lg="12">
                <h4><v-icon>mdi-ticket-percent-outline</v-icon> Cupom</h4>
                <v-row>
                  <v-col lg="10">
                    <v-text-field
                      v-model="cupom"
                      label="Cupom"
                      id="cupom"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col lg="2">
                    <v-btn color="primary">Utilizar</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col lg="12">
                <h4>
                  <v-icon>mdi-map-marker-radius-outline</v-icon> Endereço de
                  entrega
                </h4>
                <v-row
                  class="mt-3"
                  v-for="(item, i) in this.$store.state.enderecos"
                  :key="i"
                >
                  <v-col lg="6" v-if="item.tipo_endereco == 'Entrega'">
                    <v-card
                      elevation="0"
                      class="card-endereco p-2"
                      :class="[
                        enderecoEntrega == item.id ? 'marcado' : 'desmarcado',
                      ]"
                      @click="enderecoEntrega = item.id"
                    >
                      <v-row>
                        <v-col lg="12" class="centraliza">
                          <h4>{{ item.nome }}</h4>
                        </v-col>
                        <v-col lg="6" class="p-0 centraliza">
                          <p>{{ item.cep }}</p>
                        </v-col>
                        <v-col lg="6" class="p-0 centraliza">
                          <p>N° {{ item.numero }}</p>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
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
        </v-col>
        <v-col lg="1"></v-col>
        <v-divider vertical></v-divider>
        <v-col lg="5" class="pl-5">
          <resumoPedido></resumoPedido>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import addCartao from "../usuario/pagamento.vue";
import cartao from "../../ui/cartao.vue";
import resumoPedido from "../carrinho/resumoPedido.vue";
export default {
  components: { addCartao, cartao, resumoPedido },
  data() {
    return {
      cartoes: "",
      mostrar: false,
      cupom: "",
      enderecoEntrega: "",
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
<style>
.card-endereco {
  border: 2px solid #bbb !important;
  /* display: flex; */
  /* flex-direction: column;
  justify-content: center;
  align-items: center; */
}
.marcado {
  border: 2px solid #b38b57 !important;
}
.desmarcado {
  border: 2px solid #bbb !important;
}
/* .p-0{
  padding: 0 !important;
} */
</style>
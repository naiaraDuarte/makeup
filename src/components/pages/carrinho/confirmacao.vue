<template>
  <v-container fluid>
    <v-card class="px-3" elevation="0">
      <v-row>
        <v-col lg="6">
          <h2>Pagamento</h2>
          <v-card elevation="0" class="mt-3">
            <h4>
              <v-icon>mdi-credit-card-plus-outline</v-icon> Cartão de crédito
            </h4>
            <p>Selecione os cartões que deseja pagar</p>
            <v-row v-if="$store.state.cartoes.length > 0">
              <v-col
                lg="6"
                class="pl-0"
                v-for="(item, i) in this.$store.state.cartoes"
                :key="i"
              >
              {{ item }}
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
          <resumoPedido :frete="frete" :habilitaBotao="habilitaBotao" pag="confirmacao"></resumoPedido>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import resumoPedido from "../carrinho/resumoPedido.vue";
export default {
  components: { resumoPedido },
  data() {
    return {
      cartoes: "",
      mostrar: false,
      cupom: "",
      enderecoEntrega: "",
      pagConfirmacao: false,
      marcados: [],
      frete: "0",
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
  watch: {
    enderecoEntrega(newVal) {
      this.$store.state.enderecos.filter((endereco) => {
        if (newVal == endereco.id) {
          this.calculaFrete(endereco.cep);
        }
      });
    },
  },
  computed: {
    habilitaBotao(){
      if (this.frete != "" && this.marcados.length > 0) {
        return true;
      }
      return false;
    }
  },
  methods: {
    marca(val) {
      this.marcados.push(val);
      console.log(this.marcados);
    },
    calculaFrete(cep) {
      let frm = {
        cep: cep.replace("-", ""),
        peso: 1,
        comprimento: 50,
        altura: 8,
        largura: 10,
        diametro: 8,
      };
      this.$http.post(`/frete/`, frm).then((res) => {
        this.frete = res.data.valor[0].Valor;
        console.log("valor", res);
      });
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
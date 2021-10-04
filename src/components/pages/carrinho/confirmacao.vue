<template>
  <v-container fluid>
    <v-card class="px-3" elevation="0">
      <v-row>
        <v-col lg="6">
         <p class="mb-3 tituloModalCarrinho">
            <v-icon class="pb-1" large>mdi-chevron-double-right</v-icon>Confirmação
          </p>
          <v-divider class="mb-5"></v-divider>
          <v-card elevation="0" class="mt-3">
            <h4 class="mb-5">
              <v-icon class="pl-1">mdi-credit-card-plus-outline</v-icon> Cartões escolhidos
            </h4>
            
            <v-row v-if="$store.state.cartoesEscolhidos.length > 0">
              <v-col
                lg="12"
                class="pl-0"
                v-for="(item, i) in $store.state.cartoesEscolhidos"
                :key="i"
              >
                <div class="mt-2 px-5">
                  <v-card class="p-3 pl-2" elevation="1">
                    <v-row>
                      <v-col lg="3">
                        <p>{{ item.nome }}
                        </p>
                      </v-col>
                      <v-col lg="5">
                        <p>{{ item.numero }}</p>
                      </v-col>
                      <v-col lg="3">
                        <p>{{ item.valor }}</p>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col lg="6" class="mt-3" v-if="Object.keys($store.state.cupomUtilizado).length > 1">
                <h4>
                  <v-icon>mdi-ticket-percent-outline</v-icon> Cupom Utilizado
                </h4>
                <v-row class="mt-3">
                  <v-col lg="12">
                    <v-card elevation="0" class="card-endereco">
                      <v-row>
                        <v-col lg="12" class="centraliza p-0">
                          <h4>{{ $store.state.cupomUtilizado.cod  }}</h4>
                        </v-col>
                        <v-col lg="6" class="p-0 centraliza">
                          <p>{{ $store.state.cupomUtilizado.porcen }}%</p>
                        </v-col>
                        <v-col lg="6" class="p-0 centraliza">
                          <p>{{ $n( desconto, "currency") }}</p>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              <v-col lg="6" class="mt-3">
                <h4>
                  <v-icon>mdi-map-marker-radius-outline</v-icon> Endereço de
                  entrega
                </h4>
                <v-row class="mt-3">
                  <v-col lg="12">
                    <v-card elevation="0" class="card-endereco p-2">
                      <v-row>
                        <v-col lg="12" class="centraliza">
                          <h4>{{ $store.state.enderecoDeEntrega.nome }}</h4>
                        </v-col>
                        <v-col lg="6" class="p-0 centraliza">
                          <p>{{ $store.state.enderecoDeEntrega.cep }}</p>
                        </v-col>
                        <v-col lg="6" class="p-0 centraliza">
                          <p>N° {{ $store.state.enderecoDeEntrega.numero }}</p>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              
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
          <resumoPedido
            :frete="this.$store.state.freteCalculado"
            :cashback="cashback.valor"
            :desconto="desconto"
            :habilitaBotao="habilitaBotao"
            pag="confirmacao"
          ></resumoPedido>
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
      cashback: {
        valor: 0
      },
      itensDivisoes: [
        "Pagar com 1 cartão",
        "Pagar com 2 cartões",
        "Pagar com 3 cartões",
      ],
    };
  },
  mounted() {
    console.log(this.$store.state.carrinho);
    this.$http
      .get(`/cashback/${localStorage.getItem("usuarioId")}`)
      .then((res) => {
          this.cashback = res.data.cashback[0];
      });
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
    habilitaBotao() {
      if (this.frete != "" && this.marcados.length > 0) {
        return true;
      }
      return false;
    },
    desconto() {
      let frete = parseFloat(this.$store.state.freteCalculado);
      let total = 0;
      let porcen = this.$store.state.cupomUtilizado.porcen;
      if (this.$store.state.carrinho.length > 0) {
        this.$store.state.carrinho.forEach((item) => {
          total += item.qtd * item.preco;
        });
      }
      if (this.$store.state.cupomUtilizado.tipo == "frete") {
        return (frete * (porcen / 100));
      } else {
        return (total * (porcen / 100));
      }
    },
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
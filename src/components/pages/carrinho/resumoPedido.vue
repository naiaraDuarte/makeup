<template>
  <v-container fluid>
    <p class="mb-3 tituloModalCarrinho">
      <v-icon class="pb-1" large>mdi-chevron-double-right</v-icon>Resumo do
      pedido
    </p>
    <v-divider></v-divider>
    <v-row v-if="$store.state.carrinho.length > 0">
      <v-col lg="12" class="px-2 mt-1">
        <v-row
          v-for="(item, i) in $store.state.carrinho"
          :key="i"
          class="centraliza mt-1"
        >
          <v-col lg="2" v-if="item.qtd > 0">
            <v-img height="50" width="50" :src="getImgUrl(item.src)"></v-img>
          </v-col>
          <v-col lg="7" v-if="item.qtd > 0">
            <p>{{ item.nome }}</p>
          </v-col>

          <v-col lg="3" v-if="item.qtd > 0">
            <p>{{ $n(parseFloat(item.preco), "currency") }}</p>
          </v-col>
        </v-row>
        <v-divider class="mt-5"></v-divider>
      </v-col>
      <v-col lg="12">
        <v-row>
          <v-col lg="12">
            <v-card class="separa" elevation="0">
              <p>Total dos Produtos</p>
              <p>{{ $n(parseFloat(totalProdutos), "currency") }}</p>
            </v-card>
            <v-card class="separa" elevation="0">
              <p>Frete</p>
              <p>{{ $n(parseFloat(frete), "currency") }}</p>
            </v-card>
            <v-card class="separa" elevation="0" v-if="desconto > 0">
              <p>Desconto</p>
              <p>{{ $n(parseFloat(desconto), "currency") }}</p>
            </v-card>
            <v-divider></v-divider>
            <v-card class="separa" elevation="0">
              <h3>Total</h3>
              <h3>
                {{
                  $n(
                    parseFloat(totalProdutos + (parseFloat(frete) - desconto)),
                    "currency"
                  )
                }}
              </h3>
            </v-card>
          </v-col>
          <v-col lg="12">
            <v-btn
              v-if="pag == 'confirmacao'"
              class="btnFilter ampliarBtn"
              elevation="0"
              @click="prox()"
              >Tem algo errado, desejo voltar e arrumar</v-btn
            >
            <v-btn
              v-else
              class="btnFilter ampliarBtn mb-3"
              elevation="0"
              @click="$router.push(`/`)"
              >Continuar comprando</v-btn
            >
            <v-btn
              v-if="pag == 'confirmacao'"
              elevation="0"
              color="primary"
              @click="comprar"
              class="ampliarBtn mt-2"
            >
              Finalizar compra
            </v-btn>
            <v-btn
              v-else
              color="primary"
              :disabled="!habilitaBotao"
              class="ampliarBtn"
              @click="prox()"
              id="finalizarCompra"
              >Finalizar compra</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5 centraliza">
          Compra realizada
        </v-card-title>
        <v-card-text>
          <v-img width="300" src="../../../assets/images/check1.gif"></v-img>
          Sua compra foi finalizada com sucesso, você poderá acompranhar o
          status do seu pedido em: Minha conta > compras.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#b38b57" text @click="redireciona"> Ir pra Home </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  props: {
    frete: String,
    habilitaBotao: Boolean,
    pag: String,
    desconto: Number,
  },
  data() {
    return {
      totalProdutos: 0,
      totalFrete: 0,
      dialog: false,
    };
  },
  mounted() {
    if (this.$store.state.carrinho.length > 0) {
      this.$store.state.carrinho.forEach((item) => {
        this.totalProdutos += item.qtd * item.preco;
      });
    }
  },
  computed: {},
  methods: {
    ...mapMutations(["addPedido"]),
    getImgUrl(pic) {
      return require("../../../assets/images/" + pic);
    },
    prox() {
      if (this.pag == "confirmacao") {
        this.$store.state.concluir = false;
        return null;
      }
      this.$store.state.concluir = true;
    },
    comprar() {
      let produtos = [];
      let cartoes = [];
      this.$store.state.carrinho.forEach((e) => {
        produtos.push({
          id: e.id,
          quantidade: e.qtd,
          preco: e.preco,
        });
      });
      console.log(this.$store.state.cartoesEscolhidos);
      this.$store.state.cartoesEscolhidos.forEach((e) => {
        cartoes.push({
          id: e.cartao,
          credito: e.valor,
        });
      });

      console.log("PPPPPPPPPPP", this.$store.state.cupomUtilizado.id);

      let frmB = {
        valorTotal: parseFloat(
          this.totalProdutos + (parseFloat(this.frete) - this.desconto)
        ),
        frete: this.$store.state.freteCalculado,
        produto: produtos,
        cliente: {
          id: this.$store.state.usuario[1].id,
        },
        endereco: {
          cep: this.$store.state.enderecoDeEntrega.cep,
          numero: this.$store.state.enderecoDeEntrega.numero,
          id: this.$store.state.enderecoDeEntrega.id,
        },
        cartao: cartoes,
        cupom: {
          id: this.$store.state.cupomUtilizado.id,
        },
        cashback: {
          id: 2,
          valor: 10,
        },
        status: "EM PROCESSAMENTO",
      };
      console.log("FRM", frmB);

      this.$http.post(`/pedido/`, frmB).then((res) => {
        console.log("valor", res);
      });
      // let frm = {
      //   cliente: this.$store.state.usuario[1],
      //   carrinho: this.$store.state.carrinho,
      //   cartao: this.$store.state.cartoesEscolhidos,
      //   cupom: this.$store.state.cupomUtilizado,
      //   enderecoEntrega: this.$store.state.enderecoDeEntrega,
      //   freteCobrado: this.$store.state.freteCalculado,
      //   totalPago: parseFloat(
      //     this.totalProdutos + (parseFloat(this.frete) - this.desconto)
      //   ),
      //   status: "EM PROCESSAMENTO",
      //   prodTroca: [],
      // };
      // this.addPedido(frm);
      // console.log("Comprou");
      // this.dialog = true;
    },
    redireciona() {
      this.$store.state.carrinho = [];
      this.$store.state.cartoesEscolhidos = [];
      this.$store.state.enderecoEntrega = "";
      this.$store.state.freteCalculado = "";
      this.$store.state.cupomUtilizado = {
        porcen: 0,
      };
      this.$store.state.concluir = false;
      this.$router.push(`/`);
    },
  },
};
</script>
<style>
.ampliarBtn {
  width: 100% !important;
}
</style>
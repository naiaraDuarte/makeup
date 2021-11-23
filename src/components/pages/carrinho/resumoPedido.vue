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
              <p>-{{ $n(parseFloat(desconto), "currency") }}</p>
            </v-card>
            <v-card class="separa" elevation="0" v-if="cashback > 0">
              <p>Desconto do cashback</p>
              <p>-{{ $n(valorDescontoCashback, "currency") }}</p>
            </v-card>
            <v-divider></v-divider>
            <v-card class="separa" elevation="0">
              <h3>Total</h3>
              <h3>
                {{ $n(calculaTotal, "currency") }}
              </h3>
            </v-card>
          </v-col>
          <v-col lg="12">
            <v-btn
              v-if="pag == 'confirmacao'"
              class="btnFilter ampliarBtn"
              elevation="0"
              @click="teste(), prox()"
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
    cashback: Number,
    tipoDesconto: String,
  },
  data() {
    return {
      totalProdutos: 0,
      totalFrete: 0,
      dialog: false,
      total: 0,
      valorDescontoCashback: 0,
    };
  },
  mounted() {
    if (this.$store.state.carrinho.length > 0) {
      this.$store.state.carrinho.forEach((item) => {
        this.totalProdutos += item.qtd * item.preco;
      });
    }
  },
  computed: {
    calculaTotal() {
      return this.calcTotal();
    },
  },
  methods: {
    ...mapMutations(["addPedido"]),
    ...mapMutations(["editarCartao"]),
    getImgUrl(pic) {
      return require("../../../assets/images/" + pic);
    },
    teste(){
      console.log("AAAAAAAAAAA")
      this.$emit("clicou", 1)
      console.log("Era pra retornar")
    },
    prox() {
      // this.$emit("merda", this.total);
      if (this.pag == "confirmacao") {
        this.$store.state.concluir = false;
      } else {
        this.$store.state.concluir = true;
      }
    },
    editaCashback(val) {
      this.$http.put(`/cashback/${localStorage.getItem("usuarioId")}`, {
        valor: val,
      });
    },
    calcTotal() {
      let valorFinal = 0;
      if (this.tipoDesconto == "frete") {
        valorFinal = parseFloat(
          this.totalProdutos -
            this.cashback +
            (parseFloat(this.frete) - this.desconto)
        );
      } else {
        valorFinal = parseFloat(
          this.totalProdutos - this.desconto + parseFloat(this.frete)
        );
      }
      // 10 - 100 = 90
      if (valorFinal - this.cashback < 0) {
        let sobraCashbach = (valorFinal - this.cashback) * -1;
        this.$store.state.valeTroca = sobraCashbach;
        this.valorDescontoCashback = valorFinal;
        valorFinal = 0;
      } else {
        valorFinal = valorFinal - this.cashback;
        this.valorDescontoCashback = this.cashback;
        this.$store.state.valeTroca = 0;
      }
      this.total = valorFinal;
      this.$store.state.totalCompra = valorFinal;

      this.$emit("total", this.total);
      return valorFinal;
    },
    randomTime(start, end) {
      var diff = end.getTime() - start.getTime();
      var new_diff = diff * Math.random();
      var date = new Date(start.getTime() + new_diff);
      return date;
    },
    comprar() {
      // let conteudoSteps = [
      //   {
      //     nome: "EM PROCESSAMENTO",
      //     status: "normal",
      //   },
      //   {
      //     nome: "PAGAMENTO REALIZADO",
      //     status: "normal",
      //   },
      //   {
      //     nome: "EM TRANSPORTE",
      //     status: "normal",
      //   },
      //   {
      //     nome: "ENTREGA REALIZADA",
      //     status: "normal",
      //   },
      //   {
      //     nome: "TROCA SOLICITADA",
      //     status: "troca",
      //   },
      //   {
      //     nome: "TROCA AUTORIZADA",
      //     status: "troca",
      //     valor: "aceita",
      //   },
      //   {
      //     nome: "TROCA REJEITADA",
      //     status: "troca",
      //     valor: "rejeitada",
      //   },
      //   {
      //     nome: "EM TRANSITO",
      //     status: "troca",
      //   },
      //   {
      //     nome: "TROCA EFETUADA",
      //     status: "troca",
      //   },
      //   {
      //     nome: "CANCELAMENTO SOLICITADO",
      //     status: "cancelamento",
      //   },
      //   {
      //     nome: "CANCELAMENTO REJEITADO",
      //     status: "cancelamento",
      //   },

      //   {
      //     nome: "CANCELAMENTO ACEITO",
      //     status: "cancelamento",
      //   },
      //   {
      //     nome: "CANCELAMENTO EFETUADO",
      //     status: "cancelamento",
      //   },
      // ];
      // for (let i = 0; i < 100; i++) {
      //   // Produto do pedido

      //   let produtos = [];

      //   for (let t = 0; t < Math.floor(Math.random() * 5); t++) {
      //     let id_produto = Math.floor(Math.random() * 30);
      //     let qtd = Math.floor(Math.random() * 10);
      //     let preco = Math.floor(Math.random() * 50).toString() + ",00";

      //     produtos.push({
      //       id: id_produto,
      //       quantidade: qtd,
      //       preco: preco,
      //     });
      //   }

      //   //STATUS
      //   let status = conteudoSteps[Math.floor(Math.random() * 13)].nome;

      //   //Cliente
      //   let cliente = Math.floor(Math.random() * 10);
      //   let cashback = cliente;
      //   let valorCashback = Math.floor(Math.random() * 150).toString() + ",00";

      //   let decideCupom = Math.floor(Math.random() * 10);
      //   let cupom = null;
      //   if (decideCupom < 5) {
      //     cupom = Math.floor(Math.random() * 10);
      //   }

      //   let valor = Math.floor(Math.random() * 300).toString() + ",00";
      //   let frete = Math.floor(Math.random() * 50).toString() + ",00";

      //   let dataCompra = this.randomTime(new Date("10-01-2020 10:30"), new Date("10-30-2021 02:10"));
      //   let frm = {
      //     status: status,
      //     valor: valor,
      //     frete: frete,
      //     produto: produtos,
      //     dataCadastro: dataCompra,
      //     cliente: {
      //       id: cliente,
      //     },
      //     endereco: {
      //       cep: "",
      //       numero: "",
      //       id: cliente,
      //     },
      //     cartao: [
      //       {
      //         id: cliente + 1,
      //         credito: valor,
      //       }
      //     ],
      //     cupom: {
      //       id: cupom,
      //     },
      //     cashback: {
      //       id: cashback.toString(),
      //       valor: valorCashback,
      //     },
      //   };
      //   this.$http.post(`/pedido/`, frm).then(() => {
      //     console.log("FORMULARIO", frm);
      //   });
      // }

      this.$http.post(`/pedido/`, frm).then(() => {});
      this.editaCashback(this.$store.state.valeTroca);
      let produtos = [];
      let cartoes = [];
      this.$store.state.carrinho.forEach((e) => {
        produtos.push({
          id: e.id,
          quantidade: e.qtd,
          preco: e.preco,
        });
      });
      this.$store.state.cartoesEscolhidos.forEach((e) => {
        cartoes.push({
          id: e.id,
          credito: e.valor,
        });
      });
      let frmB = {
        valor: this.total,
        frete: this.$store.state.freteCalculado.frete,
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
        //cashback utilizado
        cashback: {
          id: this.$store.state.usuario[1].id,
          // valor: this.$store.state.valeTroca.valor
          // id: 2,
          // valor: 10,
        },
        status: "EM PROCESSAMENTO",
      };
      this.$http.post(`/pedido/`, frmB).then(() => {
        this.$store.state.cartoes.filter((cartao) => {
          cartao.selecionado = false;
          cartao.valor = 0;
          this.editarCartao(cartao);
        });
      });
      let frm = {
        cliente: this.$store.state.usuario[1],
        carrinho: this.$store.state.carrinho,
        cartao: this.$store.state.cartoesEscolhidos,
        cupom: this.$store.state.cupomUtilizado,
        enderecoEntrega: this.$store.state.enderecoDeEntrega,
        freteCobrado: this.$store.state.freteCalculado.frete,
        totalPago: parseFloat(
          this.totalProdutos + (parseFloat(this.frete) - this.desconto)
        ),
        status: "EM PROCESSAMENTO",
        prodTroca: [],
      };
      this.addPedido(frm);
      this.dialog = true;
    },
    redireciona() {
      this.$store.state.carrinho = [];
      this.$store.state.cartoesEscolhidos = [];
      this.$store.state.enderecoEntrega = "";
      this.$store.state.freteCalculado = {};
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
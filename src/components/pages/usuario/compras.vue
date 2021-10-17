<template>
  <v-container fluid>
    <h1>Compras</h1>

    <v-row class="mt-1 mx-3 my-3">
      <v-col lg="12" v-if="$store.state.pedidos.length > 0">
        <v-expansion-panels accordion>
          <v-expansion-panel
            v-for="(item, i) in $store.state.pedidos"
            :key="i"
          >
            <v-expansion-panel-header
              v-if="item.cliente.cpf == $store.state.usuario[1].cpf"
              @click="getDados(item.status)"
            >
              <v-row class="centraliza">
                <v-col lg="3">
                  <p>Pedido: {{ item.id }}</p>
                </v-col>
                <v-col lg="2">
                  <p>Data pedido: {{ $moment(item.data, "YYYY-MM-DD").format("DD/MM") }}</p>
                </v-col>
                <v-col lg="2">
                  <p></p>
                </v-col>
                <v-col lg="2">
                  <p></p>
                </v-col>
                <v-col lg="2">
                  <v-row>
                    <v-col lg="4">
                      <v-btn elevation="0" icon @click="verMais(item.id)">
                        <v-icon color="error">mdi-cancel</v-icon></v-btn
                      >
                    </v-col>
                    <v-col lg="4">
                      <v-btn elevation="0" icon v-if="verificaTroca(item.status) == true" @click="trocarPedido(item.id)"
                        ><v-icon
                          color="#b38b57"
                          >mdi-sync</v-icon
                        ></v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col lg="3">
                  <p>Produtos:</p>
                </v-col>
              </v-row>
              <v-row
                v-for="(prod, i) in item.carrinho"
                :key="i"
                class="alinhamentoProd"
              >
                <v-col lg="2">
                  <v-img
                    height="80"
                    width="80"
                    :src="getImgUrl(prod.imagem)"
                  ></v-img>
                </v-col>
                <v-col lg="3">
                  <p>{{ prod.nome }}</p>
                </v-col>
                <v-col lg="2">
                  <p>
                    <v-rating
                      :value="4.5"
                      color="#deb887"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>
                  </p>
                </v-col>
                <v-col lg="2">
                  <p>{{ $n(prod.custo, "currency") }}</p>
                </v-col>
                <v-col lg="2">
                  <v-btn class="btnFilter ampliarBtn" elevation="0"
                    >Avaliar</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-stepper alt-labels elevation="0" v-model="e1">
                    <v-stepper-header elevation="0" style="box-shadow: none">
                      <template v-for="(val, i) in steps">
                        <v-stepper-step
                          :key="`${i}-step`"
                          :complete="e1 > i"
                          :step="i"
                          class="centraliza letra"
                        >
                          {{ val.nome }}
                        </v-stepper-step>

                        <v-divider v-if="i !== steps" :key="i"></v-divider>
                      </template>
                    </v-stepper-header>
                  </v-stepper>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col lg="12" v-else class="centraliza mt-5">
        <p>
          Você ainda não efetuou nenhuma compra... Dê uma olhada nos nossos
          produtos... Tenho certeza que você vai gostar :)
        </p>
      </v-col>
    </v-row>
    <v-dialog v-model="cancelarPedido" persistent max-width="550px">
      <v-card>
        <v-card-title class="alinhamentoEntre">
          <span class="text-h5">Cancelar pedido</span>
          <span class="status">{{ pedidoSelecionado.status }}</span>
        </v-card-title>
        <v-card-text>
          <v-container v-if="$store.state.pedidos.length > 0">
            <v-card elevation="0">
              <p><b>Numero do pedido:</b> {{ pedidoSelecionado.id }}</p>
              <p><b>Produtos: </b></p>
              <v-row class="mt-2">
                <v-col
                  class="py-0"
                  lg="12"
                  v-for="(prod, i) in pedidoSelecionado.carrinho"
                  :key="i"
                >
                  <p>{{ pedidoSelecionado.carrinho[i].nome }}</p>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancelarPedido = false">
            Fechar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="efetuarCancelamento()"
            id="confirmarCancela"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="trocaModal" persistent max-width="750px">
      <v-card>
        <v-card-title class="alinhamentoEntre">
          <span class="text-h5">Trocar produto</span>
          <span class="status">{{ pedidoSelecionado.status }}</span>
        </v-card-title>
        <v-card-text>
          <v-container v-if="$store.state.pedidos.length > 0">
            <v-card elevation="0">
              <p><b>Numero do pedido:</b> {{ pedidoSelecionado.id }}</p>
              <p><b>Produtos: </b></p>
              <v-row class="mt-2">
                <v-col
                  class=""
                  lg="12"
                  v-for="(prod, i) in pedidoSelecionado.carrinho"
                  :key="i"
                >
                  <v-row>
                    <v-col lg="2" class="centraliza">
                      <v-img
                        height="80"
                        width="80"
                        :src="getImgUrl(prod.imagem)"
                      ></v-img>
                    </v-col>
                    <v-col lg="5" class="centraliza">
                      <p>{{ prod.nome }}</p>
                    </v-col>
                    <v-col lg="3" class="centraliza">
                      <p>
                        {{
                          $n(prod.custo, "currency")
                        }}
                      </p>
                    </v-col>
                    <v-col lg="2" class="centraliza">
                      <v-btn v-if="getStatusProduto(prod.status) == true"
                        elevation="0"
                        icon
                        @click="trocaComId(pedidoSelecionado, prod)"
                        ><v-icon color="#b38b57">mdi-sync</v-icon></v-btn
                      >
                       <v-btn v-else
                        elevation="0"
                        icon
                        :disabled="true"
                        @click="trocaComId(pedidoSelecionado, prod)"
                        ><v-icon color="#b38b57">mdi-sync</v-icon></v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="trocaModal = false"
            id="fecharTroca"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      <h4 style="font-weight: 100">{{ mensagem }}</h4>
      <template v-slot:action="{ attrs }">
        <v-btn text icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      troca: false,
      cancelado: false,
      modalMotivoTroca: false,
      cancelarPedido: false,
      trocaModal: false,
      pedidoSelecionado: "",
      mensagem: "",
      snackbar: false,
      snackbarColor: "",
      status: "CANCELAMENTO REJEITADO",
      conteudoSteps: [
        {
          nome: "EM PROCESSAMENTO",
          status: "normal",
        },
        {
          nome: "PAGAMENTO REALIZADO",
          status: "normal",
        },
        {
          nome: "EM TRANSPORTE",
          status: "normal",
        },
        {
          nome: "ENTREGA REALIZADA",
          status: "normal",
        },
        {
          nome: "TROCA SOLICITADA",
          status: "troca",
        },
        {
          nome: "TROCA AUTORIZADA",
          status: "troca",
          valor: "aceita",
        },
        {
          nome: "TROCA REJEITADA",
          status: "troca",
          valor: "rejeitada",
        },
        {
          nome: "EM TRANSPORTE",
          status: "troca",
        },
        {
          nome: "TROCA EFETUADA",
          status: "troca",
        },
        {
          nome: "CANCELAMENTO SOLICITADO",
          status: "cancelamento",
        },
        {
          nome: "CANCELAMENTO REJEITADO",
          status: "cancelamento",
        },

        {
          nome: "CANCELAMENTO ACEITO",
          status: "cancelamento",
        },
        {
          nome: "CANCELAMENTO EFETUADO",
          status: "cancelamento",
        },
      ],
      e1: 1,
      steps: [],
    };
  },
  mounted() {   
    this.$store.state.pedidos = [];
    this.$http
      .get(`/pedido/${localStorage.getItem("usuarioId")}`)
      .then((res) => {
        res.data.todosOsPedidos.forEach((ped) => {
          let carrinho = ped.pedido.produtos;
          let cartao = ped.pedido.cartoes;
          let cupom = ped.pedido.cupom;
          let endereco = ped.pedido.endereco[0];
          let frete = ped.pedido.frete;
          let status = ped.pedido.status;
          let id = ped.pedido.id;
          let data = ped.pedido.data_cadastro;

          this.$store.state.pedidos.push({
            id: id,
            cliente: this.$store.state.usuario[1],
            carrinho: carrinho,
            cartao: cartao,
            cupom: cupom,
            enderecoEntrega: endereco,
            freteCobrado: frete,
            data: data,
            totalPago: parseFloat(
              this.totalProdutos + (parseFloat(this.frete) - this.desconto)
            ),
            status: status,
            prodTroca: [],
          });
        });
      });
    // this.getDados("normal", "EM TRANSPORTE");
  },
  methods: {
    ...mapMutations(["editaStatus"]),
    verMais(id) {
      this.pedidoSelecionado = this.$store.state.pedidos.filter(
        (ped) => ped.id == id
      );
      this.pedidoSelecionado = this.pedidoSelecionado[0];
      this.cancelarPedido = !this.cancelarPedido;
      return this.pedidoSelecionado;
    },
    getStatusProduto(status){
      let fluxo = this.conteudoSteps.filter((val) => val.nome == status);
      fluxo = fluxo[0].status;
      if (fluxo == "troca") {
        return false;
      }else{
        return true;
      }
    },
    verificaTroca(status){
      let step = this.conteudoSteps.filter((val) => val.nome == status);
      if (step[0].status == "troca" || status == 'ENTREGA REALIZADA') return true;
      else return false;
    },
    getDados(status) {
      console.log("status", status)
      let fluxo = this.conteudoSteps.filter((val) => val.nome == status);
      fluxo = fluxo[0].status;
      let valor = "aceita";
      let stepProv = [];
      this.conteudoSteps.forEach((e) => {
        if (fluxo == "troca") {
          if (e.status == fluxo) {
            if (e.valor) {
              if (e.valor == valor) {
                stepProv.push(e);
              }
            } else {
              stepProv.push(e);
            }
          }
        } else {
          if (e.status == fluxo) {
            stepProv.push(e);
          }
        }
      });
      this.steps = stepProv;
      this.getStatus(status);
    },
    getStatus(status) {
      this.e1 = this.steps.findIndex((step) => step.nome == status);
      this.e1 += 1;
    },
    efetuarCancelamento() {
      this.editaStatus(
        [this.pedidoSelecionado.id, "CANCELAMENTO SOLICITADO"],
        null
      );
      this.exibeSnackBar("green", "Seu cancelamento foi pra análise");
      this.cancelarPedido = false;
    },
    trocarPedido(id) {
      this.pedidoSelecionado = this.$store.state.pedidos.filter(
        (ped) => ped.id == id
      );
      this.pedidoSelecionado = this.pedidoSelecionado[0];
      this.trocaModal = !this.trocaModal;
      return this.pedidoSelecionado;
    },
    trocaComId(item, prod) {
      let frm = {
        produto: {
          id: prod.id,
        },
        status: "TROCA SOLICITADA",
      };
      this.$http
        .put(`/pedido/troca/${item.id}`, frm)
        .then(() => {
          prod.status = "TROCA SOLICITADA";
          this.editaStatus([item.id, "TROCA SOLICITADA", prod.id]);
          this.exibeSnackBar("green", "Sua troca foi para análise");
        });
    },
    getImgUrl(pic) {
      return require("../../../assets/images/" + pic);
    },
    exibeSnackBar(cor, msg) {
      this.snackbarColor = cor;
      this.mensagem = msg;
      this.snackbar = true;
    },
  },
};
</script>
<style scoped>
.alinhamentoEntre {
  display: flex;
  justify-content: space-between;
}

.v-dialog > .v-card > .v-card__title > .status {
  font-size: 14px !important;
}

.alinhamentoProd {
  display: flex;
  align-items: center;
}
</style>
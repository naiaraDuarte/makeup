<template>
  <v-container fluid>
    <p class="mb-3 tituloModalCarrinho">
      <v-icon class="pb-1" large>mdi-chevron-double-right</v-icon>Compras
    </p>

    <v-row class="mt-1 mx-3 my-3">
      <v-col lg="12" v-if="$store.state.pedidos.length > 0">
        <v-expansion-panels accordion>
          <v-expansion-panel v-for="(item, i) in $store.state.pedidos" :key="i">
            <v-expansion-panel-header
              :class="getColor(item.status)"
              v-if="item.cliente.cpf == $store.state.usuario[1].cpf"
              @click="getDados(item.status)"
            >
              <v-row class="centraliza">
                <v-col lg="2">
                  <p>Pedido: {{ item.id }}</p>
                </v-col>
                <v-col lg="3">
                  <p>
                    Data pedido:
                    {{ $moment(item.data, "YYYY-MM-DD").format("DD/MM") }}
                  </p>
                </v-col>
                <v-col lg="4">
                  <p>
                    {{ item.status }}
                  </p>
                </v-col>
                <!-- <v-col lg="1">
                  <v-badge :color="getColor(item.status)" bordered></v-badge>
                </v-col> -->
                <v-col lg="2">
                  <v-row>
                    <v-col lg="4">
                      <v-btn elevation="0" icon @click="verMais(item.id)">
                        <v-icon color="error">mdi-cancel</v-icon></v-btn
                      >
                    </v-col>
                    <v-col lg="4">
                      <v-btn
                        elevation="0"
                        icon
                        v-if="verificaTroca(item.status) == true"
                        @click="trocarPedido(item.id)"
                        ><v-icon color="#b38b57">mdi-sync</v-icon></v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- <v-row>
                <v-col lg="3">
                  <p>Produtos:</p>
                </v-col>
              </v-row> -->
              <v-row
                v-for="(prod, i) in getItems(item.carrinho)"
                :key="i"
                class="alinhamentoProd centraliza"
              >
                <v-col lg="2">
                  <v-img
                    height="80"
                    width="80"
                    :src="getImgUrl(prod.imagem)"
                  ></v-img>
                </v-col>

                <v-col lg="3" class="centraliza">
                  <span>{{ prod.nome }}</span>
                </v-col>
                <v-col lg="2">
                  <p>Quant: {{ prod.quantity }}</p>
                </v-col>
                <v-col lg="2">
                  <p>{{ $n(prod.custo, "currency") }}</p>
                </v-col>
                <v-col lg="2">
                  <!-- <v-row class="centraliza p-0">
                    <v-col class="centraliza p-0">
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
                  </v-row> -->
                  <v-row class="p-0">
                    <v-col>
                      <v-btn class="btnFilter ampliarBtn" elevation="0"
                        >Avaliar</v-btn
                      >
                    </v-col>
                  </v-row>
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
                        {{ $n(prod.custo, "currency") }}
                      </p>
                    </v-col>
                    <v-col lg="2" class="centraliza">
                      <v-btn
                        v-if="getStatusProduto(prod.status) == true"
                        elevation="0"
                        icon
                        @click="efetuarTroca(pedidoSelecionado, prod)"
                        ><v-icon color="#b38b57">mdi-sync</v-icon></v-btn
                      >
                      <v-btn
                        v-else
                        elevation="0"
                        icon
                        :disabled="true"
                        @click="confirmarTroca = true"
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
    <v-dialog v-model="confirmarTroca" max-width="450">
      <v-card>
        <v-card-title class="text-h5">
          Vamos confirmar sua troca?
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="px-3">
              <v-textarea
                v-model="observacao"
                outlined
                name="input-7-4"
                label="Motivo da troca:"
                :counter="255"
                id="observacao"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text @click="confirmarTroca = false">
            Fechar
          </v-btn>

          <v-btn
            color=" blue darken-1"
            text
            @click="trocaComId(pedidoSelecionado)"
          >
            Confirmar
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
      confirmarTroca: false,
      prod: {},
      status: "CANCELAMENTO REJEITADO",
      conteudoSteps: [
        {
          nome: "EM PROCESSAMENTO",
          status: "normal",
          color: "ok",
        },
        {
          nome: "PAGAMENTO REALIZADO",
          status: "normal",
          color: "ok",
        },
        {
          nome: "EM TRANSPORTE",
          status: "normal",
          color: "ok",
        },
        {
          nome: "ENTREGA REALIZADA",
          status: "normal",
          color: "ok",
        },
        {
          nome: "TROCA SOLICITADA",
          status: "troca",
          color: "alerta",
        },
        {
          nome: "TROCA AUTORIZADA",
          status: "troca",
          valor: "aceita",
          color: "alerta",
        },
        {
          nome: "TROCA REJEITADA",
          status: "troca",
          valor: "rejeitada",
          color: "problema",
        },
        {
          nome: "EM TRANSITO",
          status: "troca",
          color: "alerta",
        },
        {
          nome: "TROCA EFETUADA",
          status: "troca",
          color: "ok",
        },
        {
          nome: "CANCELAMENTO SOLICITADO",
          status: "cancelamento",
          color: "problema",
        },
        {
          nome: "CANCELAMENTO REJEITADO",
          status: "cancelamento",
          color: "problema",
        },

        {
          nome: "CANCELAMENTO ACEITO",
          status: "cancelamento",
          color: "problema",
        },
        {
          nome: "CANCELAMENTO EFETUADO",
          status: "cancelamento",
          color: "problema",
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
    getStatusProduto(status) {
      let fluxo = this.conteudoSteps.filter((val) => val.nome == status);
      fluxo = fluxo[0].status;
      if (fluxo == "troca") {
        return false;
      } else {
        return true;
      }
    },
    getColor(status) {
      let fluxo = this.conteudoSteps.filter((val) => val.nome == status);
      fluxo = fluxo[0].color;
      return fluxo;
    },
    getItems(items) {
      let tempObj = {};
      let result = [];

      for (const item of items) {
        if (tempObj[item.id] == undefined) {
          tempObj[item.id] = 1;
          result.push(item);
        } else {
          tempObj[item.id] += 1;
        }
      }

      // And if you want to formet in a different way then
      for (const key in result) {
        result[key].quantity = tempObj[result[key].id];
      }
      return result;
    },
    removeItensDuplicados(arr) {
      var novaArr = arr.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
      }, Object.create(null));

      return novaArr;
    },
    verificaTroca(status) {
      let step = this.conteudoSteps.filter((val) => val.nome == status);
      if (step[0].status == "troca" || status == "ENTREGA REALIZADA")
        return true;
      else return false;
    },
    efetuarTroca(item, prod) {
      this.confirmarTroca = !this.confirmarTroca;
      this.prod = prod;
    },

    getDados(status) {
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
      let frm = {
        id: this.pedidoSelecionado.id,
        status: "CANCELAMENTO SOLICITADO",
      };
      this.$http
        .put(`/pedido/status/${this.pedidoSelecionado.id}`, frm)
        .then(() => {
          this.editaStatus(
            [this.pedidoSelecionado.id, "CANCELAMENTO SOLICITADO"],
            null
          );
          this.exibeSnackBar("green", "Seu cancelamento foi pra análise");
          this.cancelarPedido = false;
        });
    },
    trocarPedido(id) {
      this.pedidoSelecionado = this.$store.state.pedidos.filter(
        (ped) => ped.id == id
      );
      this.pedidoSelecionado = this.pedidoSelecionado[0];
      this.trocaModal = !this.trocaModal;
      return this.pedidoSelecionado;
    },
    trocaComId(item) {
      let prod = this.prod;

      let frm = {
        produto: {
          id: prod.id,
          observacao: this.observacao,
        },
        status: "TROCA SOLICITADA",
      };
      this.$http.put(`/pedido/troca/${item.id}`, frm).then(() => {
        prod.status = "TROCA SOLICITADA";
        this.editaStatus([item.id, "TROCA SOLICITADA", prod.id]);
        this.exibeSnackBar("green", "Sua troca foi para análise");
        this.confirmarTroca = !this.confirmarTroca;
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

.ok {
  border-left: 5px solid #81c784;
}

.alerta {
  border-left: 5px solid #fff59d;
}

.problema {
  border-left: 5px solid #e57373;
}
</style>
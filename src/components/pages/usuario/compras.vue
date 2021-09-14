<template>
  <v-container fluid>
    <h1>Compras</h1>

    <!-- <div class="compras"></div> -->
    <v-row class="mt-1 mx-3 my-3">
      <v-col lg="12" v-if="this.$store.state.pedidos.length > 0">
        <v-expansion-panels accordion>
          <v-expansion-panel
            v-for="(item, i) in this.$store.state.pedidos"
            :key="i"
          >
            <v-expansion-panel-header
              v-if="item.cliente.cpf == $store.state.usuario[1].cpf"
            >
              <v-row class="centraliza">
                <v-col lg="3">
                  <p>Pedido: {{ item.id }}</p>
                </v-col>
                <v-col lg="2">
                  <p>Data pedido: 12/09</p>
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
                      <v-btn elevation="0" icon @click="trocarPedido(item.id)"
                        ><v-icon
                          color="#b38b57"
                          v-if="e1 == 4 && troca == false && cancelado == false"
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
              <v-row v-for="(prod, i) in item.carrinho" :key="i">
                <v-col lg="3">
                  <p>{{ item.carrinho[i].nome }}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-stepper alt-labels elevation="0" v-model="e1">
                    {{ verificaStatus(item.status) }}
                    <!-- Troca -->
                    <v-stepper-header
                      elevation="0"
                      style="box-shadow: none"
                      v-if="troca == true"
                    >
                      <v-stepper-step step="1" :complete="e1 > 1">
                        Troca solicitada
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step step="2" :complete="e1 > 2">
                        Em análise
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step step="3" :complete="e1 > 3">
                        Emitindo cupom
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step step="4" :complete="e1 == 4">
                        Concluido
                      </v-stepper-step>
                    </v-stepper-header>

                    <!-- Cancelamento -->
                    <v-stepper-header
                      elevation="0"
                      style="box-shadow: none"
                      v-else-if="cancelado == true"
                    >
                      <v-stepper-step step="1" :complete="e1 > 1"
                        >Cancelamento solicitado
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step step="2" :complete="e1 > 2"
                        >Em análise
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step step="3" :complete="e1 > 3">
                        Concluído
                      </v-stepper-step>
                    </v-stepper-header>

                    <!-- Normal -->
                    <v-stepper-header
                      elevation="0"
                      style="box-shadow: none"
                      v-else
                    >
                      <v-stepper-step step="1" :complete="e1 > 1"
                        >Pedido realizado
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step step="2" :complete="e1 > 2"
                        >Aprovado
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step step="3" :complete="e1 > 3">
                        Em trânsito
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step step="4">
                        Entregue/Concluido
                      </v-stepper-step>
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
        <v-card-title class="alinhamento">
          <span class="text-h5">Cancelar pedido</span>
          <span class="status">{{ perfilSelecionado.status }}</span>
        </v-card-title>
        <v-card-text>
          <v-container v-if="$store.state.pedidos.length > 0">
            <v-card elevation="0">
              <p><b>Numero do pedido:</b> {{ perfilSelecionado.id }}</p>
              <p><b>Produtos: </b></p>
              <v-row class="mt-2">
                <v-col
                  class="py-0"
                  lg="12"
                  v-for="(prod, i) in perfilSelecionado.carrinho"
                  :key="i"
                >
                  <p>{{ perfilSelecionado.carrinho[i].nome }}</p>
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
            @click="efetuarCancelamento(perfilSelecionado.id)"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="trocaModal" persistent max-width="750px">
      <v-card>
        <v-card-title class="alinhamento">
          <span class="text-h5">Trocar produto</span>
          <span class="status">{{ perfilSelecionado.status }}</span>
        </v-card-title>
        <v-card-text>
          <v-container v-if="$store.state.pedidos.length > 0">
            <v-card elevation="0">
              <p><b>Numero do pedido:</b> {{ perfilSelecionado.id }}</p>
              <p><b>Produtos: </b></p>
              <v-row class="mt-2">
                <v-col
                  class=""
                  lg="12"
                  v-for="(prod, i) in perfilSelecionado.carrinho"
                  :key="i"
                >
                  <v-row>
                    <v-col lg="6">
                      <p>{{ perfilSelecionado.carrinho[i].nome }}</p>
                    </v-col>
                    <v-col lg="4">
                      <p>{{ perfilSelecionado.carrinho[i].preco }}</p>
                    </v-col>
                    <v-col lg="2">
                      <v-btn
                        elevation="0"
                        icon
                        @click="trocaComId(perfilSelecionado, prod)"
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
          <v-btn color="blue darken-1" text @click="trocaModal = false">
            Fechar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="efetuarCancelamento(perfilSelecionado.id)"
          >
            Cancelar
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
      e1: 4,
      cancelarPedido: false,
      trocaModal: false,
      perfilSelecionado: "",
      mensagem: "",
      snackbar: false,
      snackbarColor: "",
      status: "CANCELAMENTO REJEITADO",
    };
  },
  mounted() {
    console.log("pedidos", this.$store.state.pedidos);
  },

  methods: {
    ...mapMutations(["editaParaTroca"]),
    ...mapMutations(["removeItemPedido"]),
    ...mapMutations(["editarProduto"]),
    verMais(id) {
      this.perfilSelecionado = this.$store.state.pedidos.filter(
        (ped) => ped.id == id
      );
      this.perfilSelecionado = this.perfilSelecionado[0];
      this.cancelarPedido = !this.cancelarPedido;
      console.log("perfil", this.perfilSelecionado);
      return this.perfilSelecionado;
    },
    verificaStatus(status) {
      console.log("status", status);
      if (
        status == "EM PROCESSAMENTO" ||
        status == "TROCA SOLICITADA" ||
        status == "CANCELAMENTO SOLICITADO"
      ) {
        this.e1 = 1;
      }
      if (
        status == "PAGAMENTO REALIZADO" ||
        status == "TROCA AUTORIZADA" ||
        status == "CANCELAMENTO ACEITO" ||
        status == "TROCA REJEITADA" ||
        status == "CANCELAMENTO REJEITADO"
      ) {
        this.e1 = 2;
      }
      if (status == "EM TRANSPORTE") {
        this.e1 = 3;
      }
      if (
        status == "ENTREGA REALIZADA" ||
        status == "TROCA EFETUADA" ||
        status == "CANCELAMENTO EFETUADO"
      ) {
        this.e1 = 4;
      }
    },
    efetuarCancelamento(id) {
      // if (this.verificaId) {
      //   this.$http.delete(`/endereco/${id}`).then(() => {
      //     this.removeEnderecos(id);
      //   });
      // } else {
      this.removeItemPedido(id);
      this.exibeSnackBar("green", "Seu pedido foi cancelado");
      this.cancelarPedido = false;
    },
    trocarPedido(id) {
      this.perfilSelecionado = this.$store.state.pedidos.filter(
        (ped) => ped.id == id
      );
      this.perfilSelecionado = this.perfilSelecionado[0];
      this.trocaModal = !this.trocaModal;
      console.log("perfil", this.perfilSelecionado);
      return this.perfilSelecionado;
    },
    trocaComId(item, idProd) {
      this.editaParaTroca([item, idProd.id]);
      console.log(this.$store.state.listaProdutos, "||||", idProd.id);
      this.$store.state.listaProdutos.filter((prod) => {
        if (prod.cod == idProd.id) {
          this.$store.state.valeTroca.push(prod.preco);
        }
      });
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
.alinhamento {
  display: flex;
  justify-content: space-between;
}

.v-dialog > .v-card > .v-card__title > .status {
  font-size: 14px !important;
}
</style>
<template>
  <v-container style="width: 1200px" fluid>
    <v-card elevation="0">
      <v-card-title>
        <h2 class="nameTable">
          <v-icon x-large>mdi-chevron-double-right</v-icon> Pedidos
        </h2>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          id="search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        locale="pt-br"
        :search="search"
      >
        <template v-slot:[`item.avaliacao`]="{ item }">
          <v-row align="center" class="mx-0">
            <v-rating
              :value="item.avaliacao"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ms-4">{{ item.avaliacao }}</div>
          </v-row>
        </template>

        <template v-slot:[`item.acoes`]="{ item }">
          <v-row align="center" class="mx-0">
            <v-btn @click="verMais(item.acoes)" icon>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="1000px"
        v-if="idSelecionado != null"
      >
        <v-card>
          <v-card-title>
            <v-row>
              <v-col lg="12" class="espacamentoEntreEl px-5">
                <span class="text-h5"
                  >N° do pedido: {{ perfilSelecionado[0].pedido }}
                </span>
                <span class="text-h5"
                  >Cliente: {{ perfilSelecionado[0].nome }}
                </span>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-row class="espacamentoEntreEl px-2 mt-2">
                <v-col lg="12" class="dados">
                  <v-row>
                    <v-col lg="4" class="addBorder">
                      <p><b>Dados pessoais:</b></p>
                      <p><b>CPF:</b> {{ perfilSelecionado[0].cliente.cpf }}</p>
                      <p>
                        <b>Data nascimento:</b>
                        {{
                          $moment(
                            perfilSelecionado[0].cliente.data_nasc,
                            "YYYY-MM-DD"
                          ).format("DD/MM/YYYY")
                        }}
                      </p>
                      <p>
                        <b>Telefone:</b>
                        {{ perfilSelecionado[0].cliente.telefone }}
                      </p>
                    </v-col>
                    <v-col lg="4" class="addBorder">
                      <p><b>Endereco da Entrega</b></p>
                      <p>
                        <b>Logradouro:</b>
                        {{ perfilSelecionado[0].endereco.logradouro }}
                      </p>
                      <p>
                        <b>Numero:</b>
                        {{ perfilSelecionado[0].endereco.numero }}
                      </p>
                      <p><b>Cep:</b> {{ perfilSelecionado[0].endereco.cep }}</p>
                    </v-col>
                    <v-col lg="4" class="addBorder">
                      <p><b>Dados de pagamento</b></p>
                      <p>
                        <b>Data do pedido: </b>
                        {{
                          $moment(
                            perfilSelecionado[0].data,
                            "YYYY-MM-DD"
                          ).format("DD/MM")
                        }}
                      </p>
                      <p>
                        <b>Total da compra:</b>
                        {{
                          $n(
                            parseFloat(perfilSelecionado[0].totalPago),
                            "currency"
                          )
                        }}
                      </p>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  lg="12"
                  class="addBorder"
                  v-if="perfilSelecionado[0].troca.length > 0"
                >
                  <p>Produto de troca solicitada</p>
                  <v-row
                    v-for="(item, i) in perfilSelecionado[0].troca"
                    :key="i"
                  >
                    <v-col lg="2">
                      <p>{{ item.cod }}</p>
                    </v-col>
                    <v-col lg="5">
                      <p>{{ item.nome }}</p>
                    </v-col>
                    <v-col lg="2">
                      <p>{{ $n(parseFloat(item.custo), "currency") }}</p>
                    </v-col>
                    <v-col lg="2">
                      <p>{{ item.qtd }}</p>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col lg="12">
                  <p><b>Histórico de compras</b></p>

                  <v-stepper alt-labels elevation="0">
                    <v-stepper v-model="e1">
                      <v-stepper-header elevation="0" style="box-shadow: none">
                        <template v-for="(item, i) in steps">
                          <v-stepper-step
                            :key="`${i}-step`"
                            :complete="e1 > i"
                            :step="i"
                            class="centraliza letra"
                          >
                            {{ item.nome }}
                          </v-stepper-step>

                          <v-divider v-if="i !== steps" :key="i"></v-divider>
                        </template>
                      </v-stepper-header>
                    </v-stepper>
                  </v-stepper>

                  <div class="centraliza mt-5">
                    <v-btn
                      class="mx-2"
                      text
                      @click="nextStep('sub')"
                      :disabled="desabilita"
                    >
                      <!-- {{ steps[e1 - 1].nome }} -->
                      Voltar
                    </v-btn>
                    <v-btn
                      class="mx-2"
                      color="primary"
                      @click="nextStep('add')"
                      :disabled="desabilita"
                      v-if="e1 != steps.length - 1"
                    >
                      ir
                      <!-- {{ steps[e1 + 1].nome }} -->
                    </v-btn>
                    <!-- <v-btn
                      class="mx-2"
                      color="primary"
                      @click="nextStep('add')"
                      v-else
                    >
                      Finalizado
                    </v-btn> -->
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="limpa"> Cancelar </v-btn>
            <v-btn
              color="#b38b57"
              class="btnFilter"
              @click="salvar(perfilSelecionado[0])"
              text
            >
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-dialog v-model="voltaEstoque" max-width="450">
      <v-card>
        <v-card-title class="text-h5">
          Deseja voltar esses produtos para o estoque?
        </v-card-title>

        <v-card-text>
          Só é recomendado a volta ao estoque, caso o produto não esteja com
          defeito, caso contrário é recomendado entrar em contato com o
          fornecedor.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="mudaStatus(false)">
            Falar com o fornecedor
          </v-btn>

          <v-btn color="green darken-1" text @click="mudaStatus(true)">
            Voltar ao estoque
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="statusTroca" max-width="450">
      <v-card>
        <v-card-title class="text-h5"> Qual o status da troca? </v-card-title>

        <v-card-text
          v-for="(item, i) in perfilSelecionado[0].carrinho"
          :key="i"
        >
          <p>{{ item.observacao }}</p></v-card-text
        >

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="statusDaTroca(false)">
            Rejeitar
          </v-btn>

          <v-btn color="green darken-1" text @click="statusDaTroca(true)">
            Aceitar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="statusCancelamento" max-width="450">
      <v-card>
        <v-card-title class="text-h5">
          Qual o status da cancelamento?
        </v-card-title>

        <v-card-text> OBSERVAÇÃO DO USUÁRIO </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="statusDoCancelamento(false)"
          >
            Rejeitar
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="statusDoCancelamento(true)"
          >
            Aceitar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      situacao: true,
      perfilSelecionado: [
        {
          pedido: "",
          nome: "",
          cpf: "000.000.000-00",
          acoes: 2,
        },
      ],
      search: "",
      dialog: false,
      voltaEstoque: false,
      statusTroca: false,
      statusCancelamento: false,
      estoque: false,
      headers: [
        {
          text: "N° Pedido",
          align: "start",
          sortable: false,
          value: "pedido",
        },
        { text: "Nome", value: "nome" },
        { text: "CPF", value: "cpf" },
        { text: "Status", value: "status" },
        { text: "Ações", value: "acoes" },
      ],
      desserts: [],
      e1: 1,
      steps: [],
      idSelecionado: null,
      desabilita: false,
      stepsTroca: [
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
      ],
      stepsCancelamento: [
        {
          nome: "CANCELAMENTO ACEITO",
          status: "cancelamento",
        },
        {
          nome: "CANCELAMENTO REJEITADO",
          status: "cancelamento",
        },
      ],
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
          nome: "TROCA AUTORIZADA/REJEITADA",
          status: "troca",
        },
        {
          nome: "EM TRANSITO",
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
          nome: "CANCELAMENTO AUTORIZADO/REJEITADO",
          status: "cancelamento",
        },
        {
          nome: "CANCELAMENTO EFETUADO",
          status: "cancelamento",
        },
      ],
    };
  },
  mounted() {
    this.$http.get(`/pedido/`).then((res) => {
      res.data.todosOsPedidos.forEach((ped) => {
        let cliente = ped.pedido.cliente[0];
        let carrinho = ped.pedido.produtos;
        let cartao = ped.pedido.cartoes;
        let cupom = ped.pedido.cupom;
        let endereco = ped.pedido.endereco[0];
        let status = ped.pedido.status.toUpperCase();
        let total = ped.pedido.valor;
        let id = ped.pedido.id;
        let data = ped.pedido.data_cadastro;

        let troca = [];
        if (this.verificaTroca(status) == true && status != "TROCA EFETUADA") {
          carrinho.forEach((item) => {
            if (this.verificaTroca(item.status) == true) {
              troca.push(item);
            }
          });
        } else if (
          this.verificaTroca(status) == true &&
          status != "CANCELAMENTO EFETUADO"
        ) {
          troca = carrinho;
        }

        this.$store.state.pedidos.push({
          id: id,
          cliente: cliente,
          carrinho: carrinho,
          cartao: cartao,
          cupom: cupom,
          enderecoEntrega: endereco,
          totalPago: total,
          status: status,
          prodTroca: troca,
          data: data,
        });

        this.desserts.push({
          pedido: id,
          carrinho: carrinho,
          nome: cliente.nome,
          cpf: cliente.cpf,
          cliente: cliente,
          status: status,
          fluxo: ped.fluxo,
          totalPago: total,
          troca: troca,
          data: data,
          endereco: endereco,
          acoes: id,
        });
      });
    });
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
  },
  methods: {
    ...mapMutations(["editarPedido"]),
    ...mapMutations(["editaParaTroca"]),

    listarPedidos() {
      this.$http.get(`/pedido/`).then((res) => {
        res.data.dados.forEach((e) => {
          this.$store.state.pedidos.push(e);
        });
      });
    },

    salvar(ps) {
      let id = ps.pedido;
      if (this.steps[this.e1].nome == "TROCA EFETUADA") {
        this.finalizaTroca(this.estoque);
      }

      if (this.steps[this.e1].nome == "CANCELAMENTO EFETUADO") {
        this.finalizaCancelamento(this.estoque);
      }
       console.log("sjsj", ps.carrinho[0])
      this.$http
        .put(`/pedido/status/${id}`, {
          status: this.steps[this.e1].nome,
          id_produto: ps.carrinho[0].id, 
          fk_produto: ps.carrinho[0].fk_produto,
        
        })    
       
        .then((res) => {
          console.log("jj", this.steps[this.e1])
          this.editarPedido([id, this.steps[this.e1].nome]);
          let index = this.desserts.findIndex((e) => e.pedido == id);
          this.desserts[index].status = res.data.status;
          this.limpa();
        });
    },
    async verMais(id) {
      this.perfilSelecionado = this.desserts.filter(
        (clientes) => clientes.acoes == id
      );
      this.steps = [];
      this.resetConteudoStepsTroca();
      await this.getDados(this.perfilSelecionado[0].status, 0);
      // await this.getStatus(this.perfilSelecionado[0].status);
      this.idSelecionado = id;
      this.dialog = !this.dialog;
      return this.perfilSelecionado;
    },
    getDados(status, e) {
      this.steps = [];
      let fluxo = this.conteudoSteps.filter((val) => val.nome == status);
      // fluxo = fluxo[0];
      let stepsTroca = this.stepsTroca.filter((val) => val.nome == status);
      let stepsCancelamento = this.stepsCancelamento.filter(
        (val) => val.nome == status
      );

      if (fluxo.length > 0) {
        if (fluxo[0].valor && fluxo[0].valor == "rejeitada") {
          this.desabilita = true;
        } else {
          this.desabilita = false;
        }

        this.conteudoSteps.forEach((e) => {
          if (e.status == fluxo[0].status) {
            this.steps.push(e);
          }
        });
      }

      if (e != 1) {
        if (stepsTroca.length > 0) {
          this.stepsTroca.forEach((e) => {
            if (e.status == stepsTroca[0].status) {
              this.steps.push(e);
            }
          });
        }
        //fALTA COLOCAR O COD NO PRODUTO A SER TROCADO
        if (stepsCancelamento.length > 0) {
          this.stepsCancelamento.forEach((e) => {
            if (e.status == stepsCancelamento[0].status) {
              this.steps.push(e);
            }
          });
        }
      }

      this.e1 = this.steps.findIndex((step) => step.nome == status);
    },
    mudaStatus(val) {
      this.estoque = val;
      this.voltaEstoque = false;
    },
    finalizaTroca(val) {
      var valorCashBack = 0;
      if (val == true) {
        this.perfilSelecionado[0].troca.forEach((item) => {
          let frm = {
            quantidadeProduto: item.qtde_comprada,
          };
          valorCashBack += item.custo;
          this.$http.patch(`/produto/${item.id}`, frm).then(() => {});
        });
      }

      this.$http
        .get(`/cashback/${this.perfilSelecionado[0].cliente.id}`)
        .then((res) => {
          valorCashBack += res.data.cashback[0].valor;
          this.$http.put(`/cashback/${this.perfilSelecionado[0].cliente.id}`, {
            valor: valorCashBack,
          });
        });

      let index = this.desserts.findIndex(
        (val) => val.pedido == this.perfilSelecionado[0].pedido
      );
      this.desserts[index].troca = [];
      this.perfilSelecionado[0].troca = [];
    },
    finalizaCancelamento(val) {
      var valorCashBack = 0;
      if (val == true) {
        this.perfilSelecionado[0].carrinho.forEach((item) => {
          let frm = {
            quantidadeProduto: item.qtde_comprada,
          };
          valorCashBack += item.custo;
          this.$http.patch(`/produto/${item.id}`, frm).then(() => {});
        });
      }

      this.$http
        .get(`/cashback/${this.perfilSelecionado[0].cliente.id}`)
        .then((res) => {
          valorCashBack += res.data.cashback[0].valor;
          this.$http.put(`/cashback/${this.perfilSelecionado[0].cliente.id}`, {
            valor: valorCashBack,
          });
        });
    },
    resetConteudoStepsTroca() {
      this.conteudoSteps.forEach((item, i) => {
        if (item.nome == "TROCA REJEITADA" || item.nome == "TROCA AUTORIZADA") {
          let reset = {
            nome: "TROCA AUTORIZADA/REJEITADA",
            status: "troca",
          };
          this.conteudoSteps.splice(i, 1, reset);
          this.steps = [];
          this.getDados("TROCA AUTORIZADA/REJEITADA", 1);
        }
      });
    },
    resetConteudoStepsCancelamento() {
      this.conteudoSteps.forEach((item, i) => {
        if (
          item.nome == "CANCELAMENTO ACEITO" ||
          item.nome == "CANCELAMENTO REJEITADO"
        ) {
          let reset = {
            nome: "CANCELAMENTO AUTORIZADO/REJEITADO",
            status: "cancelamento",
          };
          this.conteudoSteps.splice(i, 1, reset);
          this.steps = [];
          this.getDados("CANCELAMENTO AUTORIZADO/REJEITADO", 1);
        }
      });
    },
    verificaTroca(status) {
      let step = this.conteudoSteps.filter((val) => val.nome == status);
      let stepR = this.stepsTroca.filter((val) => val.nome == status);
      if (step.length > 0 && step[0].status == "troca") return true;
      else if (stepR.length > 0 && stepR[0].status == "troca") return true;
      else return false;
    },
    verificaCancelamento(status) {
      let step = this.conteudoSteps.filter((val) => val.nome == status);
      let stepR = this.stepsCancelamento.filter((val) => val.nome == status);
      if (step[0].status == "cancelamento") return true;
      else if (stepR[0].status == "cancelamento") return true;
      else return false;
    },
    statusDaTroca(val) {
      this.conteudoSteps.forEach((item, i) => {
        if (item.nome == "TROCA AUTORIZADA/REJEITADA") {
          let autorizada = {
            nome: "TROCA AUTORIZADA",
            status: "troca",
            valor: "aceita",
          };
          let rejeitada = {
            nome: "TROCA REJEITADA",
            status: "troca",
            valor: "rejeitada",
          };
          if (val == false) {
            this.conteudoSteps.splice(i, 1, rejeitada);
            this.steps = [];
            this.getDados("TROCA REJEITADA", 1);
          } else {
            this.conteudoSteps.splice(i, 1, autorizada);
            this.steps = [];
            this.getDados("TROCA AUTORIZADA", 1);
            this.nextStep("add");
          }
          this.statusTroca = false;
        }
      });
    },
    statusDoCancelamento(val) {
      //Cancelamento nãoo mostra um trem
      this.conteudoSteps.forEach((item, i) => {
        if (item.nome == "CANCELAMENTO AUTORIZADO/REJEITADO") {
          let autorizada = {
            nome: "CANCELAMENTO ACEITO",
            status: "cancelamento",
          };
          let rejeitada = {
            nome: "CANCELAMENTO REJEITADO",
            status: "cancelamento",
          };
          if (val == false) {
            this.conteudoSteps.splice(i, 1, rejeitada);
            this.steps = [];
            this.getDados("CANCELAMENTO REJEITADO", 1);
          } else {
            this.conteudoSteps.splice(i, 1, autorizada);
            this.steps = [];
            this.getDados("CANCELAMENTO ACEITO", 1);
            this.nextStep("add");
          }
          this.statusCancelamento = false;
        }
      });
    },
    // getStatus(status) {
    //   this.e1 = this.steps.findIndex((step) => step.nome == status);
    // },
    nextStep(op) {
      if (this.steps[this.e1].nome == "EM TRANSITO" && op == "add") {
        this.voltaEstoque = true;
      }

      if (this.steps[this.e1].nome == "CANCELAMENTO ACEITO" && op == "add") {
        this.voltaEstoque = true;
      }

      if (
        this.steps[this.e1].nome == "CANCELAMENTO SOLICITADO" &&
        op == "add"
      ) {
        this.statusCancelamento = true;
      }

      if (this.steps[this.e1].nome == "TROCA SOLICITADA" && op == "add") {
        this.statusTroca = true;
      }

      if (
        this.steps[this.e1].nome == "CANCELAMENTO REJEITADO" ||
        (this.steps[this.e1].nome == "CANCELAMENTO ACEITO" && op == "sub")
      ) {
        this.resetConteudoStepsCancelamento();
      }
      if (
        this.steps[this.e1].nome == "TROCA REJEITADA" ||
        (this.steps[this.e1].nome == "TROCA AUTORIZADA" && op == "sub")
      ) {
        this.resetConteudoStepsTroca();
      }
      //TROCA REJEITADA
      //sub
      if (op == "add") {
        if (this.e1 != this.steps.length) {
          this.e1 += 1;
        }
      } else {
        if (this.e1 != 0) {
          this.e1 -= 1;
        }
      }
    },
    limpa() {
      this.steps = [];
      // this.idSelecionado = null;
      this.dialog = false;
    },
  },
};
</script>
<style>
.addBorder {
  border: 1px solid #bbb;
  border-radius: 10px;
}
.letra {
  font-size: 12px;
  white-space: nowrap;
}
</style>
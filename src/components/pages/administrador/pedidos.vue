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
        :items="dados"
        locale="pt-br"
        :search="search"
      >
        <template v-slot:[`item.alerta`]="{ item }">
          <v-row align="center" class="mx-0" v-if="item.alerta == true">
            <v-icon color="#E53935">mdi-alert-circle</v-icon>
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
    <v-dialog
      v-model="dialog"
      persistent
      max-width="1000px"
      v-if="idSelecionado != null && dialog == true"
    >
      <v-card>
        <v-card-title>
          <v-row>
            <v-col lg="12" class="espacamentoEntreEl px-5">
              <span class="text-h5"
                >N° do pedido: {{ selecionado.pedido }}
              </span>
              <span class="text-h5">Cliente: {{ selecionado.nome }} </span>
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
                    <p><b>CPF:</b> {{ selecionado.cliente.cpf }}</p>
                    <p>
                      <b>Data nascimento:</b>
                      {{
                        $moment(
                          selecionado.cliente.data_nasc,
                          "YYYY-MM-DD"
                        ).format("DD/MM/YYYY")
                      }}
                    </p>
                    <p>
                      <b>Telefone:</b>
                      {{ selecionado.cliente.telefone }}
                    </p>
                  </v-col>
                  <v-col lg="4" class="addBorder">
                    <p><b>Endereco da Entrega</b></p>
                    <p>
                      <b>Logradouro:</b>
                      {{ selecionado.endereco.logradouro }}
                    </p>
                    <p>
                      <b>Numero:</b>
                      {{ selecionado.endereco.numero }}
                    </p>
                    <p><b>Cep:</b> {{ selecionado.endereco.cep }}</p>
                  </v-col>
                  <v-col lg="4" class="addBorder">
                    <p><b>Dados de pagamento</b></p>
                    <p>
                      <b>Data do pedido: </b>
                      {{
                        $moment(selecionado.data, "YYYY-MM-DD").format("DD/MM")
                      }}
                    </p>
                    <p>
                      <b>Total da compra:</b>
                      {{ $n(parseFloat(selecionado.totalPago), "currency") }}
                    </p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="12"
                class="addBorder"
                v-if="selecionado.troca.length > 0"
              >
                <p>Produto de troca solicitada</p>
                <v-row v-for="(item, i) in selecionado.troca" :key="i">
                  <v-col lg="1">
                    <p>{{ item.cod }}</p>
                  </v-col>
                  <v-col lg="3">
                    <p>{{ item.nome }}</p>
                  </v-col>
                  <v-col lg="2">
                    <p>{{ $n(parseFloat(item.preco), "currency") }}</p>
                  </v-col>
                  <v-col lg="2">
                    <p>{{ item.status }}</p>
                  </v-col>
                  <v-col lg="1">
                    <v-btn
                      elevation="0"
                      icon
                      @click="
                        editarStatusTroca(selecionado, item.id, item.status)
                      "
                      ><v-icon>mdi-pencil-outline</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>

              <v-col lg="12" v-else>
                <step :e1="e1" :steps="steps" />
                <div class="centraliza mt-5">
                  <v-btn
                    class="mx-2"
                    text
                    @click="controleStep('sub')"
                    :disabled="steps[e1].nome == selecionado.status"
                  >
                    Voltar
                  </v-btn>
                  <v-btn
                    class="mx-2"
                    color="primary"
                    @click="controleStep('add')"
                    :disabled="desabilita"
                    v-if="e1 != steps.length - 1"
                  >
                    ir
                  </v-btn>
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
            @click="salvar(selecionado)"
            text
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="voltaEstoque" persistent max-width="450">
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

          <v-btn
            color="green darken-1"
            text
            @click="
              estoque = false;
              voltaEstoque = false;
            "
          >
            Falar com o fornecedor
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="
              estoque = true;
              voltaEstoque = false;
            "
          >
            Voltar ao estoque
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="decisaoModal" persistent max-width="450">
      <v-card>
        <v-card-title class="text-h5"> Autorizar ou rejeitar?</v-card-title>

        <v-card-text v-for="(item, i) in selecionado.carrinho" :key="i">
          <p>{{ item.observacao }}</p></v-card-text
        >

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="decisao(false)">
            Rejeitar
          </v-btn>

          <v-btn color="green darken-1" text @click="decisao(true)">
            Aceitar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="modalDeTrocaUnica"
      persistent
      max-width="800px"
      v-if="idSelecionado != null && modalDeTrocaUnica == true"
    >
      <v-card>
        <v-card-title>
          <v-row>
            <v-col lg="12" class="espacamentoEntreEl px-5">
              <span class="text-h5">Troca de status de item </span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row class="espacamentoEntreEl px-2 mt-2">
              <v-col lg="12" class="dados"> </v-col>
              <v-col lg="12">
                <step :e1="e1" :steps="steps" />
                <div class="centraliza mt-5">
                  <v-btn
                    class="mx-2"
                    text
                    @click="controleStep('sub')"
                    :disabled="steps[e1].nome == trocaUnica.status"
                  >
                    Voltar
                  </v-btn>
                  <v-btn
                    class="mx-2"
                    color="primary"
                    @click="controleStep('add')"
                    :disabled="desabilita"
                    v-if="e1 != steps.length - 1"
                  >
                    ir
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="modalDeTrocaUnica = false"> Cancelar </v-btn>
          <v-btn
            color="#b38b57"
            class="btnFilter"
            @click="salvarTrocaUnica()"
            text
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";
import step from "../../ui/step.vue";
export default {
  components: {
    step,
  },
  data() {
    return {
      situacao: true,
      selecionado: {},
      search: "",
      dialog: false,
      estoque: false,
      decisaoModal: false,
      voltaEstoque: false,
      modalDeTrocaUnica: false,
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
        { text: "", value: "alerta" },
        { text: "Ações", value: "acoes" },
      ],
      dados: [],
      e1: 1,
      steps: [],
      idSelecionado: null,
      desabilita: false,
      trocaUnica: {},
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
          valor: "aceita",
        },
        {
          nome: "CANCELAMENTO REJEITADO",
          status: "cancelamento",
          valor: "rejeitada",
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
    this.dados = [];
    this.pegaRegistros();
  },
  methods: {
    ...mapMutations(["editarPedido"]),
    ...mapMutations(["editaParaTroca"]),
    pegaRegistros() {
      console.log("MERDAAAAAAAA");
      this.dados = [];
      this.$http.get(`/pedido/`).then((res) => {
        res.data.todosOsPedidos.forEach((ped) => {
          let cliente = ped.pedido.cliente[0];
          let carrinho = ped.pedido.produtos;
          let endereco = ped.pedido.endereco[0];
          let status = ped.pedido.status.toUpperCase();
          let total = ped.pedido.valor;
          let id = ped.pedido.id;
          let data = ped.pedido.data_cadastro;
          let exibeAlerta = false;

          let troca = [];
          if (this.buscaFluxo(status) == "troca") {
            carrinho.forEach((item) => {
              if (item.status != "TROCA EFETUADA") exibeAlerta = true;
              troca.push(item);
            });
          } else if (
            this.buscaFluxo(status) == true &&
            status != "CANCELAMENTO EFETUADO"
          ) {
            troca = carrinho;
          }

          this.dados.push({
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
            alerta: exibeAlerta,
            acoes: id,
          });

          console.log("EXIBE NOVO", this.dados);
        });
      });
    },
    buscaFluxo(status) {
      let steps = this.conteudoSteps.concat(
        this.stepsTroca,
        this.stepsCancelamento
      );
      let step = steps.filter((val) => val.nome == status)[0];
      if (step && step.status == "troca") return "troca";
      else if (step && step.status == "cancelamento") return "cancelamento";
      else return false;
    },
    async verMais(id) {
      this.selecionado = this.dados.filter(
        (clientes) => clientes.acoes == id
      )[0];
      this.resetConteudoSteps();
      await this.getSteps(this.selecionado.status, 0);
      this.idSelecionado = id;
      this.dialog = !this.dialog;
      return this.selecionado;
    },
    resetConteudoSteps() {
      this.steps = [];
      this.conteudoSteps.forEach((item, i) => {
        if (item.nome == "TROCA REJEITADA" || item.nome == "TROCA AUTORIZADA") {
          let reset = {
            nome: "TROCA AUTORIZADA/REJEITADA",
            status: "troca",
          };
          this.conteudoSteps.splice(i, 1, reset);
          this.steps = [];
          this.getSteps("TROCA AUTORIZADA/REJEITADA", 0);
        }
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
          this.getSteps("CANCELAMENTO AUTORIZADO/REJEITADO", 0);
        }
      });
    },
    getSteps(status, e) {
      this.steps = [];
      let fluxo = this.conteudoSteps.filter((val) => val.nome == status);
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
          this.stepsTroca.forEach((f) => {
            if (f.status == stepsTroca[0].status && f.nome == status) {
              this.$store.state.stepTrocaAceita[1] = f;
              this.steps = this.$store.state.stepTrocaAceita;
            }
          });
        }
        if (stepsCancelamento.length > 0) {
          this.stepsCancelamento.forEach((f) => {
            if (f.status == stepsCancelamento[0].status) {
              this.steps.push(f);
            }
          });
        }
      }

      this.e1 = this.steps.findIndex((step) => step.nome == status);
      return this.steps;
    },
    controleStep(op) {
      let step = this.steps[this.e1].nome;
      if (op == "add") {
        switch (step) {
          case "EM TRANSITO":
          case "CANCELAMENTO ACEITO":
            this.voltaEstoque = true;
            break;
          case "CANCELAMENTO SOLICITADO":
          case "TROCA SOLICITADA":
            this.decisaoModal = true;
            break;
        }
        if (this.e1 != this.steps.length) {
          this.e1 += 1;
        }
      } else {
        if (
          step == "CANCELAMENTO REJEITADO" ||
          step == "CANCELAMENTO ACEITO" ||
          step == "TROCA REJEITADA" ||
          step == "TROCA AUTORIZADA" ||
          step == "EM TRANSITO"
        ) {
          this.resetConteudoSteps();
        }
        if (this.e1 != 0) {
          this.e1 -= 1;
        }
      }
    },
    decisao(val) {
      this.conteudoSteps.forEach((item, i) => {
        if (
          item.nome == "TROCA AUTORIZADA/REJEITADA" &&
          this.steps[0].status == "troca"
        ) {
          this.steps = [];
          if (val == false) {
            this.conteudoSteps.splice(i, 1, this.stepsTroca[1]);
            this.getSteps("TROCA REJEITADA", 1);
          } else {
            this.conteudoSteps.splice(i, 1, this.stepsTroca[0]);
            this.getSteps("TROCA AUTORIZADA", 1);
          }
        }
        if (
          item.nome == "CANCELAMENTO AUTORIZADO/REJEITADO" &&
          this.steps[0].status == "cancelamento"
        ) {
          this.steps = [];
          if (val == false) {
            this.conteudoSteps.splice(i, 1, this.stepsCancelamento[1]);
            this.getSteps("CANCELAMENTO REJEITADO", 1);
          } else {
            this.conteudoSteps.splice(i, 1, this.stepsCancelamento[0]);
            this.getSteps("CANCELAMENTO ACEITO", 1);
          }
        }
        this.decisaoModal = false;
      });
    },
    editarStatusTroca(pedido, idTroca, status) {
      console.log(pedido, idTroca, status);
      this.getSteps(status, 0);
      this.trocaUnica = {
        pedido: pedido,
        idTroca: idTroca,
        status: status,
        steps: this.steps,
      };
      this.modalDeTrocaUnica = true;
    },
    salvar(ps) {
      let id = ps.pedido;

      if (this.steps[this.e1].nome == "CANCELAMENTO EFETUADO") {
        this.finaliza(this.estoque, ps.carrinho);
      }
      this.$http.put(`/pedido/status/${id}`, {
        status: this.steps[this.e1].nome,
        id_produto: ps.carrinho[0].id,
      });

      let index = this.dados.findIndex((e) => e.pedido == id);
      this.dados[index].status = this.steps[this.e1].nome;
      this.dados = [];
      setTimeout(() => {
        this.pegaRegistros();
      }, 500);
      this.limpa();
    },
    salvarTrocaUnica() {
      if (this.steps[this.e1].nome == "TROCA EFETUADA") {
        let item = this.trocaUnica.pedido.troca.filter(
          (e) => e.id == this.trocaUnica.idTroca
        );
        this.finaliza(this.estoque, item);
      }
      this.$http.put(`/pedido/status/${this.trocaUnica.pedido.pedido}`, {
        status: this.steps[this.e1].nome,
        id_produto: this.trocaUnica.idTroca,
      });
      this.dados = [];
      setTimeout(() => {
        this.pegaRegistros();
      }, 500);
      this.limpa();
      this.modalDeTrocaUnica = false;
    },
    finaliza(val, items) {
      var valorCashBack = 0;
      if (val == true) {
        items.forEach((item) => {
          valorCashBack += item.preco;
          this.$http.patch(`/produto/${item.id}`);
        });
      }

      this.$http.get(`/cashback/${this.selecionado.cliente.id}`).then((res) => {
        valorCashBack += res.data.cashback[0].valor;
        this.$http.put(`/cashback/${this.selecionado.cliente.id}`, {
          valor: valorCashBack,
        });
      });

      let index = this.dados.findIndex(
        (val) => val.pedido == this.selecionado.pedido
      );
      this.dados[index].troca = [];
      this.selecionado.troca = [];
    },
    limpa() {
      this.steps = [];
      this.idSelecionado = null;
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
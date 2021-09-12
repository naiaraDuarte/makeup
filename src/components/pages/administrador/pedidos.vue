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
            <!-- <v-card v-show="false">{{ item }}</v-card> -->
            <v-btn @click="verMais(item.acoes)" icon>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="1000px">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col lg="12" class="espacamentoEntreEl px-5">
                <span class="text-h5">N° do pedido: {{ perfilSelecionado[0].pedido }} </span>
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
                      <p><b>CPF:</b> {{ perfilSelecionado[0].cpf }}</p>
                      <p><b>Data nascimento:</b> 20/05/2001</p>
                      <p><b>Telefone:</b> (11) 97854-5212</p>
                    </v-col>
                    <v-col lg="4" class="addBorder">
                      <p><b>Endereco da Entrega</b></p>
                      <p><b>CPF:</b> {{ perfilSelecionado[0].cpf }}</p>
                      <p><b>Data nascimento:</b> 20/05/2001</p>
                      <p><b>Telefone:</b> (11) 97854-5212</p>
                    </v-col>
                    <v-col lg="4" class="addBorder">
                      <p><b>Dados de pagamento</b></p>
                      <p><b>CPF:</b> {{ perfilSelecionado[0].cpf }}</p>
                      <p><b>Data nascimento:</b> 20/05/2001</p>
                      <p><b>Telefone:</b> (11) 97854-5212</p>
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
                      <v-btn class="mx-2" text @click="nextStep('sub')"> {{ steps[(e1 - 1)].nome }} </v-btn>
                      <v-btn class="mx-2" color="primary" @click="nextStep('add')" v-if="e1 != (steps.length - 1)">
                        {{ steps[(e1 + 1)].nome }}
                      </v-btn>
                      <v-btn class="mx-2" color="primary" @click="nextStep('add')" v-else> Finalizado </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn
              color="#b38b57"
              class="btnFilter"
              @click="salvar(perfilSelecionado[0].pedido)"
              text
            >
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
          nome: "TROCA SOLICITADA",
          status: "troca",
        },
        {
          nome: "TROCA AUTORIZADA",
          status: "troca",
        },
        {
          nome: "TROCA REJEITADA",
          status: "troca",
          valor: "rejeitada",
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
          nome: "TROCA ACEITA",
          status: "troca",
          valor: "aceita",
        },
        {
          nome: "CANCELAMENTO ACEITO",
          status: "cancelamento",
        },
        {
          nome: "ENTREGA REALIZADA",
          status: "normal",
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
          nome: "CANCELAMENTO EFETUADO",
          status: "cancelamento",
        },
      ],
    };
  },
  mounted() {
    console.log(this.$store.state.pedidos);

    this.$store.state.pedidos.forEach((ped) => {
      this.desserts.push({
        pedido: ped.id,
        nome: ped.cliente.nome,
        cpf: ped.cliente.cpf,
        status: ped.status,
        acoes: ped.id,
      });
    });
    let statusAtual = "normal";
    let valor = "aceita";
    this.conteudoSteps.forEach((e) => {
      if (statusAtual == "troca") {
        if (e.status == statusAtual) {
          if (e.valor) {
            if (e.valor == valor) {
              this.steps.push(e);
            }
          } else {
            this.steps.push(e);
          }
        }
      } else {
        if (e.status == statusAtual) {
          this.steps.push(e);
        }
      }
    });
    // this.$http.get(`/cliente/`).then((res) => {
    //   res.data.dados.forEach((cliente) => {
    //     this.desserts.push({
    //       nome: cliente.nome,
    //       cpf: cliente.cpf,
    //       email: cliente.email,
    //       cidade: "Mogi-SP",
    //       avaliacao: 4.0,
    //       acoes: cliente.id,
    //     });
    //   });
    // });
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
    salvar(id){
      this.editarPedido([id, this.steps[this.e1].nome]);
      this.desserts[id].status = this.steps[this.e1].nome;
      // this.$store.state.pedidos[id].status = this.steps[this.e1].nome;
      console.log("Não funfou", this.$store.state.pedidos)
      this.dialog = false;
    },
    verMais(id) {
      this.perfilSelecionado = this.desserts.filter(
        (clientes) => clientes.acoes == id
      );
      this.dialog = !this.dialog;
      return this.perfilSelecionado;
    },
    nextStep(op) {
      if (op == 'add') {
        if (this.e1 != this.steps.length) {
          this.e1 += 1;
        }
      }else{
        if (this.e1 != 0) {
          this.e1 -= 1;
        }
      }
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
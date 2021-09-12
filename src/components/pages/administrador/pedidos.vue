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
                <span class="text-h5">{{ perfilSelecionado[0].nome }}</span>
                <v-switch v-model="situacao"></v-switch>
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
                          >
                            {{ item.nome }}
                          </v-stepper-step>

                          <v-divider v-if="i !== steps" :key="i"></v-divider>
                        </template>
                      </v-stepper-header>

                      <v-stepper-items>
                        <v-stepper-content
                          v-for="(item, i) in steps"
                          :key="`${i}-content`"
                          :step="i"
                        >
                          <v-btn color="primary" @click="nextStep(i)">
                            Continue
                          </v-btn>

                          <v-btn text> Cancel </v-btn>
                        </v-stepper-content>
                      </v-stepper-items>
                    </v-stepper>
                  </v-stepper>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      situacao: true,
      perfilSelecionado: [
        {
          nome: "Ice cream sandwich",
          cpf: "000.000.000-00",
          email: "email@teste.com",
          cidade: "Itaquaquecetuba-SP",
          avaliacao: 4.3,
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
      steps: [
        {
          nome: 'EM PROCESSAMENTO'
        },
        {
          nome: 'PAGAMENTO REALIZADO'
        },
        {
          nome: 'EM TRANSPORTE'
        },
        {
          nome: 'TROCA SOLICITADA'
        },
        {
          nome: 'TROCA AUTORIZADA'
        },
        {
          nome: 'TROCA REJEITADA'
        },
        {
          nome: 'CANCELAMENTO SOLICITADO'
        },
        {
          nome: 'CANCELAMENTO REJEITADO'
        },
        {
          nome: 'TROCA ACEITA'
        },
        {
          nome: 'CANCELAMENTO ACEITO'
        },
        {
          nome: 'ENTREGA REALIZADA'
        },
        {
          nome: 'TROCA EFETUADA'
        },
        {
          nome: 'CANCELAMENTO EFETUADO'
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
    verMais(id) {
      this.perfilSelecionado = this.desserts.filter(
        (clientes) => clientes.acoes == id
      );
      this.dialog = !this.dialog;
      return this.perfilSelecionado;
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
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
</style>
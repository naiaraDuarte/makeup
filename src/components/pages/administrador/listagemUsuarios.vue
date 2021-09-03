<template>
  <v-container style="width: 1200px" fluid>
    <v-card elevation="0">
      <v-card-title>
        <h2 class="nameTable">
          <v-icon x-large>mdi-chevron-double-right</v-icon> Clientes
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
                <v-col lg="5" class="dados">
                  <v-row>
                    <p><b>Dados pessoais:</b></p>
                    <v-col lg="12" class="addBorder">
                      <p><b>CPF:</b> {{ perfilSelecionado[0].cpf }}</p>
                      <p><b>Data nascimento:</b> 20/05/2001</p>
                      <p><b>Telefone:</b> (11) 97854-5212</p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <p><b>Dados de entrega:</b></p>
                    <v-col lg="12" class="addBorder">
                      <p><b>CPF:</b> {{ perfilSelecionado[0].cpf }}</p>
                      <p><b>Data nascimento:</b> 20/05/2001</p>
                      <p><b>Telefone:</b> (11) 97854-5212</p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <p><b>Dados de pagamento:</b></p>
                    <v-col lg="12" class="addBorder">
                      <p><b>CPF:</b> {{ perfilSelecionado[0].cpf }}</p>
                      <p><b>Data nascimento:</b> 20/05/2001</p>
                      <p><b>Telefone:</b> (11) 97854-5212</p>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col lg="6">
                  <p><b>Histórico de compras</b></p>
                  <v-expansion-panels>
                    <v-expansion-panel v-for="(item, i) in 5" :key="i">
                      <v-expansion-panel-header>
                        Item
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
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
          text: "Nome",
          align: "start",
          sortable: false,
          value: "nome",
        },
        { text: "CPF", value: "cpf" },
        { text: "Email", value: "email" },
        { text: "Cidade-UF", value: "cidade" },
        { text: "Avaliação", value: "avaliacao" },
        { text: "Ações", value: "acoes" },
      ],
      desserts: [],
    };
  },
  mounted() {
    this.$http.get(`/cliente/`).then((res) => {
      res.data.dados.forEach((cliente) => {
        this.desserts.push({
          nome: cliente.nome,
          cpf: cliente.cpf,
          email: cliente.email,
          cidade: "Mogi-SP",
          avaliacao: 4.0,
          acoes: cliente.id,
        });
      });
    });
  },
  methods: {
    verMais(id) {
      this.perfilSelecionado = this.desserts.filter(
        (clientes) => clientes.acoes == id
      );
      this.dialog = !this.dialog;
      return this.perfilSelecionado;
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
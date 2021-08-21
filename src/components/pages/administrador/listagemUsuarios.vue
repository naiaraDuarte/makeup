<template>
  <v-container style="width: 1200px" fluid>
    <v-card elevation="0">
      <v-card-title>
        <h2>Clientes</h2>
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
            <v-card v-show="false">{{ item }}</v-card>
            <v-btn @click="dialog = !dialog" icon>
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
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Legal first name*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Legal middle name"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-autocomplete
                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
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
      desserts: [
        {
          nome: "Frozen Yogurt",
          cpf: "475.995.980-73",
          email: "email@teste.com",
          cidade: "Mogi-SP",
          avaliacao: 4.0,
          acoes: 1,
        },
        {
          nome: "Ice cream sandwich",
          cpf: "000.000.000-00",
          email: "email@teste.com",
          cidade: "Itaquaquecetuba-SP",
          avaliacao: 4.3,
          acoes: 2,
        },
        {
          nome: "Eclair",
          cpf: "475.995.980-73",
          email: "Test@123.com",
          cidade: "Mogi-SP",
          avaliacao: 6.0,
          acoes: 3,
        },
        {
          nome: "Cupcake",
          cpf: "111.111.111-11",
          email: "email@teste.com",
          cidade: "Poá-SP",
          avaliacao: 4.3,
          acoes: 4,
        },
        {
          nome: "Gingerbread",
          cpf: "475.995.980-73",
          email: "email@teste.com",
          cidade: "Poá-SP",
          avaliacao: 3.9,
          acoes: 5,
        },
        {
          nome: "Jelly bean",
          cpf: "475.995.980-73",
          email: "email@teste.com",
          cidade: "Poá-SP",
          avaliacao: 0.5,
          acoes: 6,
        },
        {
          nome: "Lollipop",
          cpf: "475.995.980-73",
          email: "email@teste.com",
          cidade: "Mogi-SP",
          avaliacao: 5.0,
          acoes: 7,
        },
        {
          nome: "Honeycomb",
          cpf: "475.995.980-73",
          email: "email@teste.com",
          cidade: "Poá-SP",
          avaliacao: 6.5,
          acoes: 8,
        },
        {
          nome: "Donut",
          cpf: "475.995.980-73",
          email: "email@teste.com",
          cidade: "Mogi-SP",
          avaliacao: 4.9,
          acoes: 9,
        },
        {
          nome: "KitKat",
          cpf: "475.995.980-73",
          email: "email@teste.com",
          cidade: "Poá-SP",
          avaliacao: 7,
          acoes: 10,
        },
      ],
    };
  },
  methods:{
    verMais(id){
      console.log("Tá funcionando essa bagaça", id);
    }
  }
};
</script>
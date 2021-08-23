<template>
  <v-container style="width: 1200px" fluid>
    <v-card elevation="0">
      <v-card-title>
        <h2 class="nameTable">
          <v-icon x-large>mdi-chevron-double-right</v-icon> Estoque
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
                    <p><b>Dados do produto</b></p>
                    <v-col lg="12" class="addBorder">
                      <p><b>Nome</b> {{ perfilSelecionado[0].produto }}</p>
                      <p><b>Quantidade</b>{{ perfilSelecionado[0].quantidade }}</p>
                      <p><b>Codigo</b>{{ perfilSelecionado[0].codigo}}</p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <p><b>Dados de venda</b></p>
                    <v-col lg="12" class="addBorder">
                      <p><b>Preço de venda</b> {{ perfilSelecionado[0].precoProduto}}</p>
                      <p><b>Marca:</b> {{ perfilSelecionado[0].marcaProduto}}</p>
                      <p><b>Quantidade</b>{{ perfilSelecionado[0].quantidadeProduto}}</p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <p><b>Dados de pagamento:</b></p>
                    <v-col lg="12" class="addBorder">
                      <p><b>CPF:</b> {{ perfilSelecionado[0].precoProduto }}</p>
                      <p><b>Data nascimento:</b> 20/05/2001</p>
                      <p><b>Telefone:</b> (11) 97854-5212</p>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col lg="6">
                  <p><b>Histórico de vendas</b></p>
                  <v-expansion-panels>
                    <v-expansion-panel v-for="(item, i) in 10" :key="i">
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
              Fechar
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--<div class="mt-5 pt-5">
       <v-row>
        <v-col lg="2" class="px-2" v-for="(item, i) in 10" :key="i">
          <v-card elevation="0">
            <v-img v-if="i%2 == 0"
              src="../../../assets/images/produto1.jpeg"
              class="w-100"
              max-height="150"
              max-width="300"
            ></v-img>
            <v-img v-if="i%2 == 1"
              src="../../../assets/images/produto2.jpeg"
              class="w-100"
              max-height="150"
              max-width="300"
            ></v-img>
            Dados da imagem
          </v-card>
          <v-expansion-panels elevation="0">
            <v-expansion-panel v-for="(item, i) in 5" :key="i">
              <v-expansion-panel-header> 
                <v-row>
                  <v-col>Infomação 1</v-col>  
                  <v-col>Infomação 2</v-col>  
                  <v-col>Infomação 3</v-col>  
                  <v-col>Infomação 4</v-col>  
                </v-row>  
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels> 
        </v-col>
      </v-row> 
    </div>-->
    <v-navigation-drawer
      v-model="drawer"
      flat
      prepend
      hide-overlay
      absolute
      temporary
      right
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> <h4>Filtrar</h4> </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "App",
  props: {
    drawer: Boolean,
  },
  components: {},
  data() {
    return {
      situacao: true,
      perfilSelecionado: [
        {
          Produto: "Base",
          Codigo: "5682910",
          Quantidade: "30",
          Preço: "22,90",
          avaliacao: 4.0,
          acoes: 1,
        },
      ],
      search: "",
      dialog: false,
      headers: [
        {
          text: "Produto",
          align: "start",
          sortable: false,
          value: "produto",
        },
        { text: "Codigo", value: "codigo" },
        { text: "Quantidade", value: "quantidade" },
        { text: "Preço", value: "preço" },
        { text: "Avaliação", value: "avaliacao" },
        { text: "Ações", value: "acoes" },
      ],
      desserts: [
        {
          Produto: "Base",
          Codigo: "5682910",
          Quantidade: "30",
          Preço: "22,90",
          avaliacao: 4.0,
          acoes: 1,
        },
        {
          Produto: "Pó",
          Codigo: "5682910",
          Quantidade: "20",
          Preço: "17,90",
          avaliacao: 4.0,
          acoes: 2,
        },
        {
          Produto: "Blush",
          Codigo: "5682910",
          Quantidade: "30",
          Preço: "22,90",
          avaliacao: 4.0,
          acoes: 3,
        },
        {
          Produto: "Base",
          Codigo: "5682910",
          Quantidade: "30",
          Preço: "22,90",
          avaliacao: 4.0,
          acoes: 4,
        },
        {
          Produto: "Base",
          Codigo: "5682910",
          Quantidade: "30",
          Preço: "22,90",
          avaliacao: 4.0,
          acoes: 5,
        },
        {
          Produto: "Base",
          Codigo: "5682910",
          Quantidade: "30",
          Preço: "22,90",
          avaliacao: 4.0,
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
</script>
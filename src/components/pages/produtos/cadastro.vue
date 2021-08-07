<template>
  <div class="frame mt-5">
    <v-container fluid>
      <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <v-card elevation="0" v-if="faseCadastro == 0">
            <h2 class="cor-letra text-center mt-5 pt-5">
              Vamos lá, me informe os dados do produto...
            </h2>
            <v-row class="mt-5 mx-4 pt-5">
              <v-col lg="4">
                <v-text-field
                  v-model="codProduto"
                  :counter="10"
                  type="number"
                  label="Digite o código do produto"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="4">
                <v-text-field
                  v-model="nomeProduto"
                  :counter="10"
                  label="Digite o nome do produto"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="4">
                <v-text-field
                  v-model="descProduto"
                  :counter="10"
                  label="Digite a descrição do produto"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-5 mx-3 my-3">
              <v-col lg="4">
                <!-- Colocar um auto complete -->
                <v-text-field
                  :counter="10"
                  label="Digite a marca do produto"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="4">
                <v-text-field
                  v-model="categoriaProduto"
                  :counter="10"
                  label="Digite a categoria do produto"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="4">
                <v-text-field
                  v-model="tipoProduto"
                  :counter="10"
                  label="Digite o tipo do produto"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
          <div v-else>Teste 2</div>
        </v-col>
      </v-row>
      <v-row class="text-right" style="margin-left: 50px;">
        <v-col lg="11" class="text-right pb-5 mb-5">
          <v-btn
            elevation="3"
            color="white"
            class="btnSubmit"
            @click="trocaValores()"
            >Continuar</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      faseCadastro: 0,
      codProduto: "",
      nomeProduto: "",
      descProduto: "",
      categoriaProduto: "",
      tipoProduto: "",
    };
  },
  methods: {
    trocaValores() {
      this.faseCadastro == 0
        ? (this.faseCadastro = 1)
        : (this.faseCadastro = 0);
    },
  },
};
</script>
<style scoped>
.frame {
  box-shadow: 0 0 15px #ddd;
}
.btnSubmit{
  color: #b38b57;
}
</style>

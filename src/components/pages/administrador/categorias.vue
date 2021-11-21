<template>
  <v-container style="width: 1200px" fluid>
    <v-card elevation="0" class="mt-5">
      <v-row>
        <v-col lg="12" class="alinhamento">
          <v-btn color="primary mr-5" @click="gerar"
            ><v-icon class="pr-2" small>mdi-plus</v-icon> Add Categoria
          </v-btn>
        </v-col>
      </v-row>
      <v-card-title>
        <h2 class="nameTable">
          <v-icon x-large>mdi-chevron-double-right</v-icon> Categorias
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
        :items="this.$store.state.categorias"
        locale="pt-br"
        :search="search"
      >
        <template v-slot:[`item.acoes`]="{ item }">
          <v-row align="center" class="mx-0 mr-4">
            <v-btn id="editarProduto" @click="get(item.id)" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn id="deletarProduto" @click="removeCategorias(item.id)" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="adicionarCategoria" persistent max-width="900px">
      <v-card>
        <v-card elevation="0">
          <v-card-tittle>
            <h2 class="cor-letra text-center mt-5 pt-5">
              Quais os dados da Categoria...
            </h2>
          </v-card-tittle>
          <v-card-text>
            <v-row class="mt-5 mx-3 my-3">
              <v-col lg="6">
                <v-text-field
                  v-model="nome"
                  :counter="10"
                  type="text"
                  label="Nome"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="6">
                <v-text-field
                  v-model="mgLucro"
                  :counter="50"
                  label="Margem de lucro"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="text-right alinhamento">
              <v-col lg="6">
                <v-btn
                  elevation="0"
                  color="white"
                  class="btnSubmit"
                  @click="adicionarCategoria = false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  elevation="3"
                  color="white"
                  class="btnSubmit mr-5"
                  @click="salvarCategoria()"
                  >Salvar</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
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
      search: "",
      nome: "",
      mgLucro: "",
      snackbar: false,
      mensagem: "",
      snackbarColor: "",
      adicionarCategoria: false,
      headers: [
        { text: "Cod:", value: "id" },
        { text: "Categoria", value: "nome" },
        { text: "Margem de lucro", value: "mgLucro" },
        { text: "Ações", value: "acoes" },
      ],
    };
  },
  mounted() {
    this.getCategoria();
  },
  methods: {
    ...mapMutations(["addCategoria"]),
    ...mapMutations(["editarCategoria"]),
    ...mapMutations(["removeCategoria"]),

    getCategoria() {
      this.$http.get(`/categoria/`).then((res) => {
        this.$store.state.categorias = [];
        res.data.dados.forEach((e) => {
          this.addCategoria({
            id: e.id,
            nome: e.descricao,
            mgLucro: e.gp_precificacao,
          });
        });
      });
    },
    gerar() {
      this.adicionarCategoria = !this.adicionarCategoria;
      this.limparCategoria();
    },
    validacaoDePreenchimento() {
      this.nome != "", this.mgLucro != "";
    },
    limparCategoria() {
      (this.nome = ""), (this.mgLucro = "");
    },
    get(id) {
      this.adicionarCategoria = !this.adicionarCategoria;
      this.id = id;

      let categoria = this.$store.state.categorias.filter(
        (categoria) => categoria.id == id
      );
      categoria = categoria[0];
      this.nome = categoria.nome;
      this.mgLucro = categoria.mgLucro;
    },
    salvarCategoria() {
      if (this.id == null) this.addCategorias();
      else this.editarCategorias(this.id);

      this.limparCategoria();
      this.id = null;
      this.adicionarCategoria = !this.adicionarCategoria;
    },
    addCategorias() {
      let frm = {
        nome: this.nome,
        mgLucro: this.mgLucro,
      };
      this.$http.post(`/categoria/`, frm).then((res) => {
        frm.id = res.data.dados.id;
        this.addCategoria(frm);
        this.exibeSnackBar("green", "Categoria adicionada");
        this.limparCategoria();
      });
    },
    editarCategorias() {
      let frm = {
        id: this.id,
        nome: this.nome,
        mgLucro: this.mgLucro,
      };
      this.$http.put(`/categoria/${this.id}`, frm).then(() => {
        this.editarCategoria(frm);
        this.exibeSnackBar("green", "Editado com sucesso!!!");

        this.limparCategoria();
      });
    },
    exibeSnackBar(cor, msg) {
      this.snackbarColor = cor;
      this.mensagem = msg;
      this.snackbar = true;
    },
    removeCategorias(id) {
      this.$http.patch(`/categoria/${id}`).then(() => {
        this.removeCategoria(id);
        this.exibeSnackBar("green", "Categoria removida");
      });
    },
  },
};
</script>
<style>
.alinhamento {
  display: flex;
  justify-content: end;
}
</style>
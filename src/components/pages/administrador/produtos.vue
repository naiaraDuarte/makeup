<template>
  <v-container style="width: 1200px" fluid>
    <v-card elevation="0" class="mt-5">
      <v-row>
        <v-col lg="12" class="alinhamento">
          <v-btn color="primary mr-5" @click="gerar"
            ><v-icon class="pr-2" small>mdi-plus</v-icon> Add Produto
          </v-btn>
        </v-col>
      </v-row>
      <v-card-title>
        <h2 class="nameTable">
          <v-icon x-large>mdi-chevron-double-right</v-icon> Produtos
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
        :items="this.$store.state.produtos"
        locale="pt-br"
        :search="search"
      >
        <template v-slot:[`item.ativo`]="{ item }">
          <v-row align="center" class="mx-0">
            <v-badge
              v-if="item.ativo"
              inline
              :value="item.ativo"
              color="green"
              readonly
              size="8"
            ></v-badge>
            <v-badge
              v-else
              inline
              :value="!item.ativo"
              color="red"
              readonly
              size="10"
            ></v-badge>
            <!-- <div class="grey--text ms-4">{{ item.ativo }}</div> -->
          </v-row>
        </template>
        <template v-slot:[`item.acoes`]="{ item }">
          <v-row align="center" class="mx-0 mr-4">
            <v-btn id="editarProduto" @click="getProduto(item.id)" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn id="deletarProduto" @click="remover(item)" icon>
              <v-icon>mdi-restore-alert</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="adicionarProduto" persistent max-width="900px">
      <v-card>
        <!-- <v-row>
          <v-col lg="12" md="12" sm="12" cols="12" class="px-0 py-0"> -->
        <v-progress-linear :value="valorBarra"></v-progress-linear>
        <v-card elevation="0" v-if="faseCadastro == 0">
          <v-card-tittle>
            <h2 class="cor-letra text-center mt-5 pt-5">
              Vamos lá, me informe os dados do produto...
            </h2>
          </v-card-tittle>
          <v-card-text>
            <v-row class="mt-5 mx-3 my-3">
              <v-col lg="3">
                <v-text-field
                  v-model="codigoProduto"
                  :counter="10"
                  type="number"
                  label="Código"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="5">
                <v-text-field
                  v-model="nomeProduto"
                  :counter="50"
                  label="Nome"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="4">
                <v-text-field
                  v-model="custoProduto"
                  :counter="10"
                  type="number"
                  label="Custo"
                 
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-5 mx-3 my-3">
              <v-col lg="4">
                <!-- Colocar um auto complete -->
                <v-text-field
                  :counter="10"
                  v-model="marcaProduto"
                  label="Marca"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="4">
                <v-combobox
                  v-model="categoriaProduto"
                  :items="itensCategoria"
                  label="Categoria"
                  id="categoria"
                  item-text="nome"
                  item-value="id"
                  return-object
                  clearable
                  required
                ></v-combobox>
              </v-col>
              <v-col lg="4">
                <v-text-field
                  v-model="tipoProduto"
                  :counter="10"
                  label="Tipo"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="px-8 py-8">
                <v-textarea
                  v-model="descProduto"
                  outlined
                  name="input-7-4"
                  label="Descrição do Produto"
                  :counter="255"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card elevation="0" v-else>
          <v-card-title>
            <h2 class="cor-letra text-center mt-5 pt-5">
              Continuando, me informe os dados do produto...
            </h2>
          </v-card-title>
          <v-card-text>
            <v-row class="mt-5 mx-3 my-3">
              <v-col lg="3">
                <v-row>
                  <v-col lg="12">
                    <h4 class="cor-letra">Faça upload da imagem do produto</h4>
                  </v-col>
                  <v-col>
                    <input
                      v-show="false"
                      ref="inputUpload"
                      @change="image = $event.target.files[0]"
                      accept="image/*"
                      type="file"
                    />
                    <v-row v-if="image">
                      <v-col class="text-right">
                        <v-btn icon @click="image = null"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-card elevation="0" @click="$refs.inputUpload.click()">
                      <v-img v-if="image" :src="url"></v-img>
                      <v-img
                        v-if="!image"
                        src="../../../assets/images/img-default.jpg"
                      ></v-img>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              <v-col lg="9">
                <v-row class="mt-5 mx-4 pt-5">
                  <v-col lg="6">
                    <v-text-field
                      v-model="pesoProduto"
                      :counter="10"
                      type="number"
                      label="Peso do produto"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col lg="6">
                    <v-text-field
                      v-model="alturaProduto"
                      :counter="10"
                      type="number"
                      label="Altura do produto"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mx-4">
                  <v-col lg="6">
                    <v-text-field
                      v-model="comprimentoProduto"
                      :counter="10"
                      type="number"
                      label="Comprimento do produto"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col lg="6">
                    <!-- Colocar um auto complete -->
                    <v-text-field
                      v-model="quantidadeProduto"
                      :counter="10"
                      label="Quantidade do produto a cadastrar"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mx-3">
                  <v-col lg="6">
                    <v-text-field
                      v-model="diametroProduto"
                      :counter="10"
                      label="Diametro do produto"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col lg="6">
                    <v-text-field
                      v-model="larguraProduto"
                      :counter="10"
                      type="number"
                      label="Largura do produto"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-row class="text-right mx-1 mb-3">
          <v-col lg="2" v-if="verificaPreenchimento">
            <v-btn
              elevation="3"
              color="white"
              class="btnSubmit"
              @click="salvarProduto()"
              >add produto</v-btn
            >
          </v-col>
          <v-col lg="7">
            <v-btn
              elevation="0"
              color="white"
              class="btnSubmit alinhamento"
              @click="adicionarProduto = false"
            >
              Cancelar
            </v-btn>
          </v-col>
          <v-col lg="3">
            <v-row class="text-right">
              <v-col class="pl-5 text-center">
                <v-spacer></v-spacer>
                <v-btn
                  elevation="1"
                  class="mr-3"
                  icon
                  @click="faseCadastro = 0"
                  :disabled="faseCadastro == 0"
                  ><v-icon>mdi-chevron-left</v-icon></v-btn
                >
                <v-btn
                  elevation="1"
                  icon
                  @click="faseCadastro = 1"
                  :disabled="faseCadastro == 1"
                  ><v-icon>mdi-chevron-right</v-icon></v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog v-model="ativar" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-h5">
          {{ msgn }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col lg="6">
              <v-combobox
                v-model="ativacaoProduto"
                :items="itensInativacao"
                label="Categoria"
                id="ativacao"
                item-text="nome"
                item-value="id"
                return-object
                clearable
                required
              ></v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="px-3">
              <v-textarea
                v-model="obsInativacao"
                outlined
                name="input-7-4"
                label="Justificativa:"
                :counter="255"
                id="observacao"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="0"
            color="white"
            class="btnSubmit"
            @click="ativar = false"
            >Cancelar</v-btn
          >
          <v-btn
            elevation="3"
            color="white"
            class="btnSubmit"
            id="deletarProduto"
            @click="removeProduto"
          >
            Confirmar
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
  components: {},
  data() {
    return {
      ativado: "",
      ativacaoProduto: "",
      msgn: "",
      obsInativacao: "",
      search: "",
      ativar: false,
      txtDoBotao: "Continuar",
      faseCadastro: 0,
      codigoProduto: "",
      larguraProduto: "",
      custoProduto: "",
      nomeProduto: "",
      descProduto: "",
      categoriaProduto: "",
      tipoProduto: "",
      pesoProduto: "",
      alturaProduto: "",
      comprimentoProduto: "",
      quantidadeProduto: "",
      diametroProduto: "",
      precoProduto: "",
      marcaProduto: "",
      status: false,
      id: null,
      image: null,
      valorBarra: 50,
      snackbar: false,
      mensagem: "",
      snackbarColor: "",
      adicionarProduto: false,
      itensCategoria: [],
      itensInativacao: [],
      motivos: [],
      headers: [
        { text: "Produto", value: "nome" },
        { text: "Marca", value: "marca" },
        { text: "Quantidade", value: "quantidade" },
        { text: "Ativo", value: "ativo" },
        { text: "Ações", value: "acoes" },
      ],
    };
  },
  created() {},
  mounted() {
    this.listarProdutosCadastrados();
    this.getCategoria();
    this.getMotivoInativacao();
  },
  activated() {
    this.trocaValores();
  },
  watch: {
    faseCadastro(newVal) {
      newVal == 0 ? (this.valorBarra = 50) : (this.valorBarra = 100);
    },
  },
  computed: {
    url() {
      if (this.image) {
        return URL.createObjectURL(this.image);
      }
      return null;
    },
  },
  methods: {
    listarProdutosCadastrados() {
      this.$store.state.produtos = [];
      this.$http.get(`/produto/adm`).then((res) => {
        res.data.dados.forEach((e) => {
          this.$store.state.produtos.push(e);
        });
        console.log(this.$store.state.produtos);
      });
    },
    gerar() {
      this.adicionarProduto = !this.adicionarProduto;
      this.limparProduto();
    },
    PreviewImage() {
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
      };
    },
    ...mapMutations(["addProduto"]),
    addProdutos() {
      if (!this.verificaPreenchimento()) {
        this.snackbarColor = "#b38b57";
        this.mensagem = "Todos os dados devem ser preenchidos";
        this.snackbar = true;
        return false;
      }
      this.mensagem = "";
      let frm = {
        id: 0,
        codigoProduto: this.codigoProduto,
        custoProduto: this.custoProduto,
        nomeProduto: this.nomeProduto,
        descProduto: this.descProduto,
        categoriaProduto: this.categoriaProduto,
        tipoProduto: this.tipoProduto,
        pesoProduto: this.pesoProduto,
        alturaProduto: this.alturaProduto,
        larguraProduto: this.larguraProduto,
        comprimentoProduto: this.comprimentoProduto,
        quantidadeProduto: this.quantidadeProduto,
        diametroProduto: this.diametroProduto,
        marcaProduto: this.marcaProduto,
      };
      console.log(frm.categoriaProduto.id);
      this.$http.post(`/produto/`, frm).then((res) => {
        console.log("pdt",res)
        frm.id = res.data.dados.id;
        this.addProduto(frm);
        this.exibeSnackBar("green", "Produto adicionado");
        this.limparProduto();
      });
    },
    exibeSnackBar(cor, msg) {
      this.snackbarColor = cor;
      this.mensagem = msg;
      this.snackbar = true;
    },
    ...mapMutations(["editarProdutos"]),
    editarProduto() {
      if (!this.verificaPreenchimento()) {
        this.snackbarColor = "#b38b57";
        this.mensagem = "Todos os dados devem ser preenchidos";
        this.snackbar = true;
        return false;
      }
      this.mensagem = "";
      let frm = {
        id: this.id,
        codigoProduto: this.codigoProduto,
        custoProduto: this.custoProduto,
        nomeProduto: this.nomeProduto,
        descProduto: this.descProduto,
        categoriaProduto: this.categoriaProduto,
        tipoProduto: this.tipoProduto,
        pesoProduto: this.pesoProduto,
        alturaProduto: this.alturaProduto,
        larguraProduto: this.larguraProduto,
        comprimentoProduto: this.comprimentoProduto,
        quantidadeProduto: this.quantidadeProduto,
        diametroProduto: this.diametroProduto,
        marcaProduto: this.marcaProduto,
      };
      console.log(frm.categoriaProduto); 
      this.$http.put(`/produto/${this.id}`, frm).then(() => {
        console.log("frm", frm);
        this.editarProdutos(frm);
        this.listarProdutosCadastrados();
        this.id = null;
        this.limparProduto();
        this.exibeSnackBar("green", "Produto editado");
      });
    },    
    remover(perfil) {
      this.itensInativacao = [];
      this.motivos.forEach((m) => {
        this.itensInativacao.push(m);
      }); 
          
      if (perfil.ativo) {       
        this.ativado = perfil.ativo;
        this.msgn = "Motivo inativação";
        this.id = perfil.id;
        let index = this.itensInativacao.findIndex(
          (e) => e.nome == "Volta a venda"
        );
        this.itensInativacao.splice(index, 1);
        index = this.itensInativacao.findIndex(
          (e) => e.nome == "Estoque normalizado"
        );
        this.itensInativacao.splice(index, 1);
        this.ativar = !this.ativar;
      } else {
        console.log("else", this.mensagem)
        this.ativado = perfil.ativo;
        this.msgn = "Motivo ativação";
        this.id = perfil.id;
        let index = this.itensInativacao.findIndex(
          (e) => e.nome == "Estoque baixo"
        );
        this.itensInativacao.splice(index, 1);
        index = this.itensInativacao.findIndex(
          (e) => e.nome == "Fora de mercado"
        );
        this.itensInativacao.splice(index, 1);
        this.ativar = !this.ativar;
      }
    },
    removeProduto() {
      if (!this.verificaMotivos()) {
        this.snackbarColor = "#b38b57";
        this.mensagem = "Todos os dados devem ser preenchidos";
        this.snackbar = true;
        return false;
      }
      this.mensagem = "";
      let frm = {
        id: this.id,
        observacao: this.obsInativacao,
        categoriaInativacao: this.ativacaoProduto,
        ativo: !this.ativado,
      };
      this.$http.put(`/produto/inativacao/${this.id}`, frm).then(() => {
        this.ativar = !this.ativar;
        this.limparProduto();
        this.id = null;
        this.listarProdutosCadastrados();
        this.exibeSnackBar("green", "Efetuado com sucesso!");
      });
    },
    salvarProduto() {
      if (this.id == null) this.addProdutos();
      else this.editarProduto(this.id);
      this.limparProduto();
      this.idProduto = null;
      this.adicionarProduto = !this.adicionarProduto;
      // this.$router.push(`/`);
    },
    verificaMotivos() {
      if (this.ativacaoProduto != "" && this.obsInativacao != "") {
        return true;
      }
      return false;
    },
    verificaPreenchimento() {
      if (
        this.codigoProduto != "" &&
        this.nomeProduto != "" &&
        this.descProduto != "" &&
        this.categoriaProduto != "" &&
        this.tipoProduto != "" &&
        this.pesoProduto != "" &&
        this.larguraProduto != "" &&
        this.alturaProduto != "" &&
        this.comprimentoProduto != "" &&
        this.quantidadeProduto != "" &&
        this.diametroProduto != "" &&
        this.marcaProduto != ""
      ) {
        return true;
      }
      return false;
    },
    getMotivoInativacao() {
      this.$http.get(`/inativacao/`).then((res) => {
        console.log("res", res);
        res.data.dados.forEach((e) => {
          this.motivos.push({
            id: e.id,
            nome: e.nome,
          });
        });
      });
    },
    getCategoria() {
      this.$http.get(`/categoria/`).then((res) => {
        res.data.dados.forEach((e) => {
          this.itensCategoria.push({
            id: e.id,
            nome: e.descricao,
            mgLucro: e.gp_precificacao,
          });
        });
      });
    },
    getProduto(id) {
      this.getCategoria();
      this.adicionarProduto = !this.adicionarProduto;
      this.id = id;

      let produto = this.$store.state.produtos.filter(
        (produto) => produto.id == id
      );
      produto = produto[0];
      this.codigoProduto = produto.cod;
      this.custoProduto = produto.custo;
      this.nomeProduto = produto.nome;
      this.descProduto = produto.descricao;
      this.categoriaProduto =
        this.itensCategoria[produto.fk_categoria - 1].nome;
      this.tipoProduto = produto.tipo;
      this.pesoProduto = produto.peso;
      this.alturaProduto = produto.altura;
      this.larguraProduto = produto.largura;
      this.comprimentoProduto = produto.comprimento;
      this.quantidadeProduto = produto.quantidade;
      this.diametroProduto = produto.diametro;
      this.precoProduto = produto.preco;
      this.marcaProduto = produto.marca;
    },
    limparProduto() {
      this.codigoProduto = "";
      this.custoProduto = "";
      this.nomeProduto = "";
      this.descProduto = "";
      this.categoriaProduto = "";
      this.tipoProduto = "";
      this.pesoProduto = "";
      this.larguraProduto = "";
      this.alturaProduto = "";
      this.comprimentoProduto = "";
      this.quantidadeProduto = "";
      this.diametroProduto = "";
      this.precoProduto = "";
      this.marcaProduto = "";
      this.faseCadastro = 0;
      this.obsInativacao = "";
      this.ativacaoProduto = "";
    },
    trocaValores() {
      if (this.faseCadastro == 0) {
        this.txtDoBotao = "Finalizar";
        this.faseCadastro = 1;
      } else {
        this.txtDoBotao = "Continuar";
        this.faseCadastro = 0;
      }
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


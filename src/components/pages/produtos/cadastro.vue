<template>
  <div class="frame mt-5">
    <v-container fluid>
      <v-row>
        <v-col lg="12" md="12" sm="12" cols="12" class="px-0 py-0">
          <v-progress-linear :value="valorBarra"></v-progress-linear>
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
                  v-model="marcaProduto"
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
          <v-card elevation="0" v-else>
            <h2 class="cor-letra text-center mt-5 pt-5">
              Agora, eu preciso saber sobre as informações gerenciais...
            </h2>
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
                      label="Digite o peso do produto"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col lg="6">
                    <v-text-field
                      v-model="alturaProduto"
                      :counter="10"
                      label="Digite a altura do produto"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mx-4">
                  <v-col lg="6">
                    <v-text-field
                      v-model="comprimentoProduto"
                      :counter="10"
                      label="Digite o comprimento do produto"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col lg="6">
                    <!-- Colocar um auto complete -->
                    <v-text-field
                      v-model="quantidadeProduto"
                      :counter="10"
                      label="Digite a quantidade do produto em estoque"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mx-4">
                  <v-col lg="6">
                    <v-text-field
                      v-model="mgLucroProduto"
                      :counter="10"
                      label="Digite a margem de lucro do produto"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col lg="6">
                    <v-text-field
                      v-model="precoProduto"
                      :counter="10"
                      label="Digite o preço do produto"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="text-right mx-1 mb-3">
        <v-col lg="9"></v-col>
        <v-col lg="3">
          <v-row class="text-right">
            <v-col class="pl-5 text-center">
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
            <v-col class="text-left" v-if="validacaoDePreenchimento">
              <v-btn
                elevation="3"
                color="white"
                class="btnSubmit"
                @click="salvar()"
                >Salvar</v-btn
              >
            </v-col>
          </v-row>
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
      txtDoBotao: "Continuar",
      faseCadastro: 0,
      codProduto: "",
      nomeProduto: "",
      descProduto: "",
      categoriaProduto: "",
      tipoProduto: "",
      pesoProduto: "",
      alturaProduto: "",
      comprimentoProduto: "",
      quantidadeProduto: "",
      mgLucroProduto: "",
      precoProduto: "",
      marcaProduto: "",
      image: null,
      valorBarra: 50,
    };
  },
  created(){

  },
  mounted(){

  },
  activated() {
    this.trocaValores();
  },
  watch: {
    faseCadastro(newVal){
      newVal == 0 ? this.valorBarra = 50 : this.valorBarra = 100;
    }
  },
  computed: {
    url() {
      if (this.image) {
        return URL.createObjectURL(this.image);
      }
      return null;
    },
    validacaoDePreenchimento() {
      //validação provisória
      if (
        this.codProduto != "" &&
        this.nomeProduto != "" &&
        this.descProduto != "" &&
        this.categoriaProduto != "" &&
        this.tipoProduto != "" &&
        this.pesoProduto != "" &&
        this.alturaProduto != "" &&
        this.comprimentoProduto != "" &&
        this.quantidadeProduto != "" &&
        this.mgLucroProduto != "" &&
        this.precoProduto != "" &&
        this.marcaProduto != ""
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    PreviewImage() {
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
      };
    },
    salvar() {},
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

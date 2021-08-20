<template>
  <v-container fluid>
    <v-card elevation="0" v-if="faseCadastro == 0">
      <h2 class="cor-letra text-center mt-5 pt-5">
        Para fazer seu cadastro preciso saber de algumas informações suas...
      </h2>
      <v-row class="mx-3 my-3 centraliza">
        <v-col lg="3">
          <v-row>
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
              <v-card
                class="image white"
                color="white"
                elevation="0"
                @click="$refs.inputUpload.click()"
              >
                <v-img v-if="image" :src="url"></v-img>
                <v-img
                  v-if="!image"
                  src="../../../assets/images/img-default.jpg"
                ></v-img>
              </v-card>
            </v-col>
            <v-col lg="12" class="text-center">
              <h4 class="cor-letra">
                Queremos te conhecer, faça upload de uma foto
              </h4>
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="9">
          <v-row class="mx-4">
            <v-col lg="6" class="p-0">
              <v-text-field
                v-model="nome"
                label="Nome completo"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" class="p-0">
              <v-text-field
                v-model="apelido"
                label="Como gostaria de ser chamado?"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-4">
            <v-col lg="2" class="p-0">
              <v-combobox
                v-model="tipoTelefone"
                :items="itensTipoTelefone"
                label="Tipo"
              >
                <template slot="item" slot-scope="data">
                  <v-icon class="ml-5" v-if="data.item == 'Celular'"
                    >mdi-cellphone</v-icon
                  >
                  <v-icon class="ml-5" v-if="data.item == 'Fixo'"
                    >mdi-phone-classic</v-icon
                  >
                  <!-- <span class="cb-item">{{ data.item }}</span> -->
                </template>
              </v-combobox>
            </v-col>
            <v-col lg="4" class="p-0">
              <v-text-field
                v-model="telefone"
                v-mask="['(##) ####-####', '(##) #####-####']"
                label="Telefone"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" class="p-0">
              <!-- Colocar um auto complete -->
              <v-text-field
                v-model="cpf"
                v-mask="['###.###.###-##']"
                label="CPF"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-card elevation="0" v-if="faseCadastro == 1">
      <h2 class="cor-letra text-center mt-5 pt-5">
        Para fazer seu cadastro preciso saber de algumas informações suas...
      </h2>
      <v-row class="mx-3 my-3 centraliza">
        <v-col lg="3">
          <v-row>
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
              <v-card
                class="image white"
                color="white"
                elevation="0"
                @click="$refs.inputUpload.click()"
              >
                <v-img v-if="image" :src="url"></v-img>
                <v-img
                  v-if="!image"
                  src="../../../assets/images/img-default.jpg"
                ></v-img>
              </v-card>
            </v-col>
            <v-col lg="12" class="text-center">
              <h4 class="cor-letra">
                Queremos te conhecer, faça upload de uma foto
              </h4>
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="9">
          <v-row class="mx-4">
            <v-col lg="6" class="p-0">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formataDataNasc"
                    label="Data de nascimento"
                    prepend-icon="mdi-calendar"
                    v-mask="['##/##/####']"
                    placeholder="DD/MM/AAAA"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  :active-picker.sync="activePicker"
                  :max="maxAniversario"
                  min="1950-01-01"
                  @change="save"
                  locale="pt-br"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col lg="6" class="p-0">
              <!-- <span>Sexo:</span> -->
              <v-radio-group v-model="sexo" row>
                <v-radio label="Masculino" value="masculino"></v-radio>
                <v-radio label="Feminino" value="feminino"></v-radio>
                <v-radio label="Outros" value="outros"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row class="mx-4">
            <v-col lg="6">
              <v-text-field
                v-model="email"
                :disabled="$store.state.usuario.length > 1"
                label="Email"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" class="mt-3 text-center" v-if="$store.state.usuario[1]">
               <v-btn
              elevation="0"
              color="white"
              class="btnSubmit"
              >Alterar email</v-btn
            >
            </v-col>
          </v-row>
          <v-row class="mx-4">
            <v-col lg="6" class="p-0">
              <v-text-field
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="senha"
                ref="corDoInput"
                :disabled="$store.state.usuario.length > 1"
                :type="show3 ? 'text' : 'password'"
                @keyup="verificacaoSenhaForte()"
                :rules="rulesSenha"
                :counter="30"
                label="Senha"
                class="input-group--focused"
                @click:append="show3 = !show3"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" class="p-0" v-if="!$store.state.usuario[1]">
              <v-text-field
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="confirmacaoSenha"
                :type="show3 ? 'text' : 'password'"
                :counter="30"
                :rules="rulesConfirmacaoSenha"
                label="Confirme sua senha"
                class="input-group--focused"
                @click:append="show3 = !show3"
                required
              ></v-text-field>
            </v-col>
             <v-col lg="6" class="mt-3 text-center" v-if="$store.state.usuario[1]">
              <v-btn
              elevation="0"
              color="white"
              class="btnSubmit"
              >Alterar senha</v-btn
            >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-card elevation="0" v-if="faseCadastro == 2">
      <h2 class="cor-letra text-center mt-5 pt-5">
        Agora preciso que você me informe um endereço...

        <div class="mt-2">
          <v-btn
            elevation="0"
            v-if="idEndereco == null"
            text
            class="btnSubmit"
            @click="salvarEndereco()"
            ><v-icon left> mdi-plus </v-icon> add endereço</v-btn
          >
          <v-btn
            elevation="0"
            v-if="idEndereco != null"
            text
            class="btnSubmit"
            @click="salvarEndereco()"
            ><v-icon left> mdi-pencil-outline </v-icon> Editar endereço</v-btn
          >
        </div>
      </h2>
      <v-row class="mt-0 mx-4 pt-3">
        <v-col lg="4">
          <v-text-field
            v-model="nomeEndereco"
            label="Nome desse endereço"
            required
          ></v-text-field>
        </v-col>
        <v-col lg="4">
          <v-combobox
            v-model="tipoEndereco"
            :items="itensTipoEndereco"
            label="Tipo de endereço"
          ></v-combobox>
        </v-col>
        <v-col lg="4">
          <v-text-field
            v-model="cep"
            v-mask="['#####-###']"
            label="CEP"
            @blur="pesquisarCep"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-1 mx-3 my-3">
        <v-col lg="2">
          <v-combobox
            v-model="tipoLogradouro"
            :items="itensTipoLogradouro"
            label="Tipo Logradouro"
          ></v-combobox>
        </v-col>
        <v-col lg="4">
          <v-text-field
            v-model="logradouro"
            label="Logradouro"
            required
          ></v-text-field>
        </v-col>
        <v-col lg="3">
          <v-text-field
            v-model="numero"
            label="Número"
            v-mask="['######']"
            required
          ></v-text-field>
        </v-col>
        <v-col lg="3">
          <v-text-field
            v-model="complemento"
            v-mask="['#####-###']"
            label="Complemento"
            @blur="pesquisarCep"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-1 mx-3 my-1">
        <v-col lg="3">
          <v-text-field
            v-model="bairro"
            label="Bairro"
            required
          ></v-text-field>
        </v-col>
        <v-col lg="3">
          <v-text-field
            v-model="cidade"
            label="Cidade"
            required
          ></v-text-field>
        </v-col>
        <v-col lg="3">
          <v-combobox
            v-model="uf"
            :items="itensUf"
            label="Estado"
          ></v-combobox>
        </v-col>
        <v-col lg="3">
          <v-text-field
            v-model="pais"
            label="País"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-1 mx-3 my-3" v-if="this.$store.state.enderecos">
        <v-col lg="12">
          <v-expansion-panels accordion>
            <v-expansion-panel
              v-for="(item, i) in this.$store.state.enderecos"
              :key="i"
            >
              <v-expansion-panel-header>
                <v-row class="centraliza">
                  <v-col lg="4">
                    <p>{{ item.nomeEndereco }}</p>
                  </v-col>
                  <v-col lg="2">
                    <p>{{ item.tipoEndereco }}</p>
                  </v-col>
                  <v-col lg="3">
                    <p>{{ item.cep }}</p>
                  </v-col>
                  <v-col lg="2">
                    <v-row>
                      <v-col lg="4">
                        <v-btn elevation="0" icon @click="getEndereco(item.id)"
                          ><v-icon>mdi-pencil-outline</v-icon></v-btn
                        >
                      </v-col>
                      <v-col lg="4">
                        <v-btn elevation="0" icon @click="remove(item.id)"
                          ><v-icon>mdi-delete-empty</v-icon></v-btn
                        >
                      </v-col>
                      <v-col lg="4" class="mt-2">
                        <v-icon v-if="item.status == false" color="error"
                          >mdi-alert-circle</v-icon
                        >
                        <v-icon v-if="item.status == true" color="teal"
                          >mdi-check</v-icon
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col lg="3">
                    <p>{{ item.logradouro }}</p>
                  </v-col>
                  <v-col lg="1">
                    <p>N° {{ item.numero }}</p>
                  </v-col>
                  <v-col lg="3">
                    <p>{{ item.bairro }}</p>
                  </v-col>
                  <v-col lg="2">
                    <p>{{ item.cidade }}</p>
                  </v-col>
                  <v-col lg="1">
                    <p>{{ item.uf }}</p>
                  </v-col>
                  <v-col lg="2">
                    <p>{{ item.pais }}</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card>
    <v-row class="text-right mx-1 mb-3">
      <v-col lg="9"></v-col>
      <v-col lg="3">
        <v-row class="text-right">
          <v-col class="pl-5 text-center">
            <v-btn
              elevation="1"
              class="mr-3"
              icon
              @click="mudaFase('voltar')"
              :disabled="faseCadastro == 0"
              ><v-icon>mdi-chevron-left</v-icon></v-btn
            >
            <v-btn
              elevation="1"
              icon
              @click="mudaFase('ir')"
              :disabled="faseCadastro == 2"
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
import { validationMixin } from "vuelidate";
import { mapMutations } from "vuex";
import {
  required,
  // email,
  minLength,
  maxLength,
  // and,
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  components: {},
  validations: {
    street: { required, minLength: minLength(4), maxLength: maxLength(50) },
  },
  data() {
    return {
      show3: false,
      txtDoBotao: "Continuar",
      faseCadastro: 0,
      idEndereco: null,
      cod: "",
      nome: "",
      cpf: "",
      apelido: "",
      telefone: "",
      sexo: "",
      email: "",
      senha: " ",
      cep: "",
      tipoLogradouro: "",
      logradouro: "",
      pais: "Brasil",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      nomeEndereco: "",
      confirmacaoSenha: "",
      image: null,
      valorBarra: 50,
      activePicker: null,
      date: "",
      menu: false,
      forca: 0,
      mensagem: "",
      snackbar: false,
      snackbarColor: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The  email and password you entered don't match`,
      },
      tipoEndereco: "",
      tipoTelefone: "",
      itensTipoTelefone: ["Celular", "Fixo"],
      itensTipoLogradouro: ["Rua", "Avenida"],
      itensTipoEndereco: ["Cobrança", "Entrega"],
      itensUf: [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",
      ],
    };
  },
  watch: {
    faseCadastro(newVal) {
      newVal == 0 ? (this.valorBarra = 50) : (this.valorBarra = 100);
    },
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  computed: {
    formataDataNasc() {
      return this.$moment(this.date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    maxAniversario() {
      return this.$moment().subtract("years", 18).format("YYYY-MM-DD");
    },
    rulesSenha() {
      let rules = [];

      if (this.forca < 30) {
        rules.push("Senha fraca");
      } else if (this.forca >= 30 && this.forca < 50) {
        rules.push("Senha média");
      } else if (this.forca >= 50 && this.forca < 70) {
        rules.push("Senha forte");
      } else {
        rules.push("Senha excelente");
      }
      return rules;
    },
    rulesConfirmacaoSenha() {
      let rules = [];

      if (this.senha != this.confirmacaoSenha) {
        rules.push("As senhas não conferem!");
      }
      return rules;
    },
    url() {
      if (this.image) {
        return URL.createObjectURL(this.image);
      }
      return null;
    },
    validacaoDePreenchimento() {
      if (
        this.nome != "" &&
        this.cpf != "" &&
        this.apelido != "" &&
        this.telefone != "" &&
        this.sexo != "" &&
        this.email != "" &&
        this.senha != "" &&
        this.cep != "" &&
        this.logradouro != "" &&
        this.pais != "" &&
        this.numero != "" &&
        this.bairro != "" &&
        this.cidade != "" &&
        this.uf != "" &&
        this.nomeEndereco != "" &&
        this.forca >= 70 &&
        this.tipoEndereco != "" &&
        this.confirmacaoSenha != ""
      ) {
        return true;
      } else if (
        this.nome != "" &&
        this.cpf != "" &&
        this.apelido != "" &&
        this.telefone != "" &&
        this.sexo != "" &&
        this.email != "" &&
        this.senha != "" &&
        this.$store.state.enderecos.length > 0 &&
        this.forca >= 70 &&
        this.confirmacaoSenha != ""
      ) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    if (this.$store.state.usuario.length > 1) {
      if (
        this.$store.state.usuario[1].nome != null ||
        this.$store.state.usuario[1].nome != ""
      ) {
        //Alerta coisa fixa, PROVISÓRIO
        let usuario = this.$store.state.usuario[1];
        this.nome = usuario.nome;
        this.cpf = usuario.cpf;
        this.apelido = usuario.apelido;
        this.telefone = usuario.telefone;
        this.sexo = usuario.sexo;
        this.email = usuario.email;
        this.senha = usuario.senha;
        this.tipoTelefone = usuario.tipoEndereco;
        this.date = usuario.date;
        this.image = usuario.image;
      }
    }
  },
  methods: {
    ...mapMutations(["addEnderecos"]),
    addEndereco() {
      if (this.cep == "" && this.nomeEndereco == "") {
        this.snackbarColor = "#b38b57";
        this.mensagem =
          "Ao menos o nome do endereço ou CEP devem ser preenchidos antes de adicioná-los";
        this.snackbar = true;
        return false;
      }
      this.mensagem = "";
      let status = this.verificaPreenchimento();
      this.addEnderecos({
        id: 0,
        status: status,
        tipoEndereco: this.tipoEndereco,
        nomeEndereco: this.nomeEndereco,
        cep: this.cep,
        logradouro: this.logradouro,
        complemento: this.complemento,
        numero: this.numero,
        bairro: this.bairro,
        cidade: this.cidade,
        uf: this.uf,
        pais: this.pais,
      });
    },
    ...mapMutations(["editarEnderecos"]),
    editarEndereco(id) {
      let status = this.verificaPreenchimento();
      let endereco = this.verificaIdExistente();
      console.log(endereco);
      this.editarEnderecos({
        id: id,
        status: status,
        tipoEndereco: this.tipoEndereco,
        nomeEndereco: this.nomeEndereco,
        cep: this.cep,
        logradouro: this.logradouro,
        complemento: this.complemento,
        numero: this.numero,
        bairro: this.bairro,
        cidade: this.cidade,
        uf: this.uf,
        pais: this.pais,
      });
    },
    ...mapMutations(["removeEnderecos"]),
    remove(id) {
      console.log("id", id);
      this.removeEnderecos(id);
    },
    verificaIdExistente() {
      let enderecos = this.$store.state.enderecos;

      let encontrou = enderecos.filter(
        (endereco) => endereco.id == this.idEndereco
      );
      console.log("Achooooooooouuuuuuuuuuuuuu", encontrou);
      return true;
    },
    salvarEndereco() {
      if (this.idEndereco == null) this.addEndereco();
      else this.editarEndereco(this.idEndereco);

      this.limparEndereco();
      this.idEndereco = null;
    },
    verificaPreenchimento() {
      //Parei aqui, proximo passo é validar os campos e ver se está tudo certo
      if (
        this.cep != "" &&
        this.logradouro != "" &&
        this.pais != "" &&
        this.numero != "" &&
        this.bairro != "" &&
        this.cidade != "" &&
        this.uf != "" &&
        this.nomeEndereco != "" &&
        this.tipoEndereco != ""
      ) {
        return true;
      }
      return false;
    },
    limparEndereco() {
      this.cep = "";
      this.logradouro = "";
      this.pais = "";
      this.complemento = "";
      this.numero = "";
      this.bairro = "";
      this.cidade = "";
      this.uf = "";
      this.nomeEndereco = "";
      this.tipoEndereco = "";
    },
    getEndereco(id) {
      console.log("IDDDDDD RECEBIDO", id);
      this.idEndereco = id;

      let endereco = this.$store.state.enderecos.filter(
        (endereco) => endereco.id == id
      );
      console.log("ENDERECO", endereco);
      endereco = endereco[0];
      this.cep = endereco.cep;
      this.logradouro = endereco.logradouro;
      this.pais = endereco.pais;
      this.complemento = endereco.complemento;
      this.numero = endereco.numero;
      this.bairro = endereco.bairro;
      this.cidade = endereco.cidade;
      this.uf = endereco.uf;
      this.nomeEndereco = endereco.nomeEndereco;
      this.tipoEndereco = endereco.tipoEndereco;
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    PreviewImage() {
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
      };
    },
    mudaFase(acao) {
      if (acao == "voltar") {
        this.faseCadastro--;
      } else {
        this.faseCadastro++;
      }
    },
    pesquisarCep() {
      this.$http
        .get(`https://viacep.com.br/ws/${this.cep}/json/unicode/`)
        .then((res) => {
          this.logradouro = res.data.logradouro;
          this.bairro = res.data.bairro;
          this.cidade = res.data.localidade;
          this.uf = res.data.uf;

          if (this.logradouro.split(" ", 1)[0].length > 3) {
            this.tipoLogradouro = "Avenida";
          } else {
            this.tipoLogradouro = "Rua";
          }
        });
    },
    salvar() {
      if (this.verificaPreenchimento()) {
        this.addEndereco();
      }
      let frm = {
        perfl: "usuario",
        nome: this.nome,
        cpf: this.cpf,
        apelido: this.apelido,
        tipoTelefone: this.tipoTelefone,
        telefone: this.telefone,
        sexo: this.sexo,
        email: this.email,
        senha: this.senha,
        date: this.date,
        imagem: this.imagem,
      };
      this.addDadosUsuario(frm);
      this.$store.state.cadastro = true;
      this.$store.state.nome = this.apelido;
      this.$router.push(`/`);
    },

    ...mapMutations(["addUsuario"]),
    addDadosUsuario(value) {
      this.addUsuario(value);
    },
    verificacaoSenhaForte() {
      this.forca = 0;
      if (this.senha.length >= 4 && this.senha.length <= 7) {
        this.forca += 10;
      } else if (this.senha.length > 7) {
        this.forca += 20;
      }

      if (this.senha.length >= 5 && this.senha.match(/[a-z]+/)) {
        this.forca += 10;
      }

      if (this.senha.length >= 6 && this.senha.match(/[A-Z]+/)) {
        this.forca += 20;
      }

      if (
        this.senha.length >= 7 &&
        this.senha.match(/[@#$%&;*]/)
      ) {
        this.forca += 25;
      }

      if (this.senha.match(/([1-9]+)\1{1,}/)) {
        this.forca += 25;
      }
    },
  },
};
</script>



<style scoped>
.image {
  border-radius: 50%;
  color: white;
}
/* .centraliza {
  display: flex;
  justify-content: center;
  align-items: center;
} */
/* .theme--light.v-card {
  color: white;
} */
</style>
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
                name="nomeCompleto"
                id="nome"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" class="p-0">
              <v-text-field
                v-model="apelido"
                label="Como gostaria de ser chamado?"
                id="apelido"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-4">
            <v-col lg="2" class="p-0">
              <v-combobox
                v-model="tipoTelefone"
                :items="itensTipoTelefone"
                id="tipoTelefone"
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
                id="telefone"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" class="p-0">
              <!-- Colocar um auto complete -->
              <v-text-field
                v-model="cpf"
                v-mask="['###.###.###-##']"
                label="CPF"
                :rules="rulesCpf"
                :disabled="$store.state.usuario.length > 1"
                id="cpf"
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
                    label="Date"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    v-mask="['##/##/####']"
                    placeholder="DD/MM/AAAA"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    id="dataNasc"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu1 = true"
                  :active-picker.sync="activePicker"
                  :max="maxAniversario"
                  min="1950-01-01"
                  @change="save"
                  locale="pt-br"
                ></v-date-picker>
                <!-- <v-text-field
                    v-model="date"
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
                ></v-date-picker> -->
              </v-menu>
            </v-col>
            <v-col lg="6" class="p-0">
              <!-- <span>Sexo:</span> -->
              <v-radio-group v-model="sexo" row>
                <v-radio label="Masculino" id="m" value="masculino"></v-radio>
                <v-radio label="Feminino" id="f" value="feminino"></v-radio>
                <v-radio label="Outros" id="o" value="outros"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row class="mx-4">
            <v-col lg="6">
              <v-text-field
                v-model="email"
                :disabled="$store.state.usuario.length > 1"
                :rules="rulesEmail"
                label="Email"
                id="email"
                required
              ></v-text-field>
            </v-col>
            <v-col
              lg="6"
              class="mt-3 text-center"
              v-if="$store.state.usuario[1]"
            >
              <v-btn
                elevation="0"
                color="white"
                class="btnSubmit"
                @click="editarEmail = !editarEmail"
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
                @keyup="verificacaoSenhaForte(senha)"
                :rules="rulesSenha"
                :counter="30"
                label="Senha"
                class="input-group--focused"
                @click:append="show3 = !show3"
                id="senha"
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
                id="confirmacaoSenha"
                required
              ></v-text-field>
            </v-col>
            <v-col
              lg="6"
              class="mt-3 text-center"
              v-if="$store.state.usuario[1]"
            >
              <v-btn
                elevation="0"
                color="white"
                class="btnSubmit"
                @click="editarSenha = true"
                >Alterar senha</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-card elevation="0" v-if="faseCadastro == 2">
      <keep-alive>
        <endereco
          @verificacaoEndereco="enderecoValido = $event"
          :clickNoSalvar="clickNoSalvar"
        ></endereco>
      </keep-alive>
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
          <v-col class="text-left" v-if="faseCadastro == 2">
            <v-btn
              v-if="$store.state.usuario.length <= 1"
              elevation="3"
              color="white"
              class="btnSubmit"
              @click="salvar()"
              >Salvar</v-btn
            >
            <v-btn
              v-if="$store.state.usuario.length > 1"
              elevation="3"
              color="white"
              class="btnSubmit"
              @click="editarInformacoes()"
              >Editar</v-btn
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

    <v-dialog v-model="editarEmail" persistent max-width="550px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar email</span>
        </v-card-title>
        <v-card-text>
          <v-container v-if="$store.state.usuario.length > 0">
            <v-text-field
              :value="email"
              label="Email atual"
              id="emailAtualAlteracao"
              required
            ></v-text-field>
            <v-text-field
              v-model="emailNovoAlteracao"
              label="Email novo"
              :rules="rulesEmailNovoAlteracao"
              id="emailNovoAlteracao"
              required
            ></v-text-field>
            <v-text-field
              v-model="emailNovoConfirmacaoAlteracao"
              label="Confirme seu novo email"
              id="emailNovoConfirmacaoAlteracao"
              required
            ></v-text-field>
            <v-text-field
              v-model="senhaConfirmacao"
              label="Senha atual"
              id="emailNovoConfirmacaoAlteracao"
              required
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editarEmail = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="salvarEmailAlterado()">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editarSenha" persistent max-width="550px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar senha</span>
        </v-card-title>
        <v-card-text>
          <v-container v-if="$store.state.usuario.length > 0">
            <v-text-field
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="senhaNovoAlteracao"
              label="Senha nova"
              @keyup="verificacaoSenhaForte(senhaNovoAlteracao)"
              :rules="rulesSenha"
              class="input-group--focused"
              @click:append="show3 = !show3"
              id="senhaNovoAlteracao"
              required
            ></v-text-field>
            <v-text-field
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="senhaNovoConfirmacaoAlteracao"
              :type="show3 ? 'text' : 'password'"
              class="input-group--focused"
              @click:append="show3 = !show3"
              label="Confirme sua nova senha"
              id="senhaNovoConfirmacaoAlteracao"
              required
            ></v-text-field>
            <v-text-field
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="senhaConfirmacaoParaSenhaNova"
              label="Senha atual"
              :type="show3 ? 'text' : 'password'"
              class="input-group--focused"
              @click:append="show3 = !show3"
              id="senha"
              required
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editarSenha = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="salvarSenhaAlterado()">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { mapMutations } from "vuex";
import jsFunctions from "../../../assets/js/jsFunctions";
import endereco from "../usuario/endereco.vue";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  components: {
    endereco,
  },
  validations: {
    street: { required, minLength: minLength(4), maxLength: maxLength(50) },
  },
  data() {
    return {
      //Dados Pessoais
      idEndereco: null,
      cod: "",
      nome: "",
      cpf: "",
      apelido: "",
      telefone: "",
      sexo: "",
      date: "",
      forca: 0,
      tipoTelefone: "",
      itensTipoTelefone: ["Celular", "Fixo"],

      //Email
      editarEmail: false,
      email: "",
      emailNovoAlteracao: "",
      emailNovoConfirmacaoAlteracao: "",
      editarSenha: false,

      //Senha
      senha: "",
      senhaConfirmacao: "",
      confirmacaoSenha: "",
      senhaNovoAlteracao: "",
      senhaNovoConfirmacaoAlteracao: "",
      senhaConfirmacaoParaSenhaNova: "",

      //necessidades HTML
      show3: false,
      image: null,
      menu: false,
      mensagem: "",
      snackbar: false,
      snackbarColor: "",
      faseCadastro: 0,
      activePicker: null,

      //Endereço
      enderecoValido: false,
      clickNoSalvar: false,
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
    url() {
      if (this.image) {
        return URL.createObjectURL(this.image);
      }
      return null;
    },
    rulesSenha() {
      let rules = [];
      if (this.forca < 30) {
        rules.push("Senha fraca");
      } else if (this.forca >= 30 && this.forca < 50) {
        rules.push("Senha média");
      } else if (this.forca >= 50 && this.forca <= 75) {
        rules.push("Senha forte");
      } else {
        rules.push("Senha muito forte");
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
    rulesEmail() {
      let rules = [];
      let valor = this.verificacaoEmailValido(this.email);
      console.log(valor);
      if (!valor) {
        rules.push("Email inválido");
      }
      return rules;
    },
    rulesEmailNovoAlteracao() {
      let rules = [];
      let valor = this.verificacaoEmailValido(this.emailNovoAlteracao);
      console.log(valor);
      if (!valor) {
        rules.push("Email inválido");
      }
      return rules;
    },
    rulesCpf() {
      let rules = [];
      let valor = this.verificacaoCpfValido();
      console.log(valor);
      if (!valor) {
        rules.push("CPF inválido");
      }
      return rules;
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
        this.confirmacaoSenha = usuario.senha;
        this.forca = 85;
        this.tipoTelefone = usuario.tipoTelefone;
        this.date = usuario.date;
        this.image = usuario.image;
      }
    }
  },
  methods: {
    ...mapMutations(["editarEmailUsuario"]),
    salvarEmailAlterado() {
      if (this.emailNovoAlteracao != this.emailNovoConfirmacaoAlteracao) {
        this.funcaoSnackBar(
          "#b38b57",
          "Os campos email e confirmação de email devem ser iguais"
        );
        return false;
      }
      if (this.senhaConfirmacao != this.$store.state.usuario[1].senha) {
        this.funcaoSnackBar("#b38b57", "A senha digitada não corresponde");
        return false;
      }
      this.editarEmailUsuario(this.emailNovoAlteracao);
      this.email = this.emailNovoAlteracao;
      this.editarEmail = false;
    },
    ...mapMutations(["editarSenhaUsuario"]),
    salvarSenhaAlterado() {
      if (this.senhaNovoAlteracao != this.senhaNovoConfirmacaoAlteracao) {
        this.funcaoSnackBar(
          "#b38b57",
          "Os campos senha e confirmação de senha devem ser iguais"
        );
        return false;
      }
      if (
        this.senhaConfirmacaoParaSenhaNova != this.$store.state.usuario[1].senha
      ) {
        this.funcaoSnackBar(
          "#b38b57",
          "A senha atual digitada não corresponde"
        );
        return false;
      }
      this.editarSenhaUsuario(this.senhaNovoAlteracao);
      this.senha = this.senhaNovoAlteracao;
      this.confirmacaoSenha = this.senhaNovoAlteracao;
      this.editarSenha = false;
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
    salvar() {
      // this.clickNoSalvar = true;
      if (!this.validacaoDePreenchimentoCompleto()) {
        this.funcaoSnackBar(
          "#b38b57",
          "Todos os dados deverão ser preenchidos"
        );
        return false;
      }
      console.log("AAAAAAAAAAAA", this.validacaoDePreenchimentoCompleto())
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
      this.clickNoSalvar = false;
      this.enderecoValido = false;
      this.$store.state.cadastro = true;
      this.$store.state.nome = this.apelido;
      //this.$router.push(`/`);
    },
    ...mapMutations(["editarInformacoesCliente"]),
    async editarInformacoes() {
      // this.clickNoSalvar = true;
      if (!this.validacaoDePreenchimentoCompleto()) {
        this.funcaoSnackBar(
          "#b38b57",
          "Todos os dados deverão ser preenchidos"
        );
        return false;
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
      this.editarInformacoesCliente(frm);
      this.$store.state.cadastro = true;
      this.$store.state.nome = this.apelido;
      this.funcaoSnackBar("green", "Informações editadas com sucesso!");
      this.clickNoSalvar = false;
      this.enderecoValido = false;
      this.faseCadastro = 0;
    },
    validacaoDePreenchimentoCompleto() {
      if (
        this.nome != "" &&
        this.cpf != "" &&
        this.apelido != "" &&
        this.telefone != "" &&
        this.sexo != "" &&
        this.email != "" &&
        this.senha != "" &&
        this.enderecoValido == true &&
        this.forca > 75 &&
        this.confirmacaoSenha != "" &&
        this.confirmacaoSenha == this.senha
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
        this.forca > 75 &&
        this.confirmacaoSenha != "" &&
        this.confirmacaoSenha == this.senha
      ) {
        return true;
      }
      return false;
    },
    verificacaoEmailValido(value) {
      return jsFunctions.validacaoEmail(value);
    },
    verificacaoCpfValido() {
      return jsFunctions.validacaoCpf(this.cpf);
    },
    ...mapMutations(["addUsuario"]),
    addDadosUsuario(value) {
      this.addUsuario(value);
    },
    verificacaoSenhaForte(value) {
      return (this.forca = jsFunctions.validacaoSenha(value, 0));
    },
    funcaoSnackBar(color, mensagem) {
      this.snackbarColor = color;
      this.mensagem = mensagem;
      this.snackbar = true;
    },
  },
};
</script>
<style scoped>
.image {
  border-radius: 50%;
  color: white;
}
</style>
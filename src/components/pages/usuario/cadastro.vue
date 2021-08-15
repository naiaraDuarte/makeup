<template>
  <!-- 

Nome -
Telefone
CPF
genero
data de nasc
dados de acesso - email e senha

 -->
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
                v-model="nomeCliente"
                :counter="30"
                label="Digite seu nome"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" class="p-0">
              <v-text-field
                v-model="apelidoCliente"
                :counter="30"
                label="Como você gostaria de ser chamado?"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-4">
            <v-col lg="6" class="p-0">
              <v-text-field
                v-model="telefoneCliente"
                v-mask="['(##) ####-####', '(##) #####-####']"
                :counter="10"
                label="Digite seu telefone"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" class="p-0">
              <!-- Colocar um auto complete -->
              <v-text-field
                v-model="cpfCliente"
                :counter="10"
                v-mask="['###.###.###-##']"
                label="Digite seu CPF"
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
                    label="Digite sua data de nascimento"
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
                  :max="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                  min="1950-01-01"
                  @change="save"
                  locale="pt-br"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col lg="6" class="p-0">
              <!-- <span>Sexo:</span> -->
              <v-radio-group v-model="sexoCliente" row>
                <v-radio label="Masculino" value="masculino"></v-radio>
                <v-radio label="Feminino" value="feminino"></v-radio>
                <v-radio label="Outros" value="outros"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row class="mx-4">
            <v-col lg="6">
              <v-text-field
                v-model="emailCliente"
                :counter="30"
                label="Digite seu email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-4">
            <v-col lg="6" class="p-0">
              <v-text-field
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="senhaCliente"
                ref="corDoInput"
                :type="show3 ? 'text' : 'password'"
                @keyup="verificacaoSenhaForte()"
                :rules="rulesSenha"
                color="blue"
                :counter="30"
                label="Digite sua senha"
                class="input-group--focused"
                @click:append="show3 = !show3"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" class="p-0">
              <v-text-field
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="confirmacaoSenhaCliente"
                :type="show3 ? 'text' : 'password'"
                :counter="30"
                :rules="rulesConfirmacaoSenha"
                label="Confirme sua senha"
                class="input-group--focused"
                @click:append="show3 = !show3"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-card elevation="0" v-if="faseCadastro == 2">
      <h2 class="cor-letra text-center mt-5 pt-5">
        Agora preciso que você me informe um endereço...
        <v-btn elevation="0" text class="btnSubmit" @click="addEndereco()"
          ><v-icon left> mdi-plus </v-icon> add endereço</v-btn
        >
      </h2>
      <v-row class="mt-5 mx-4 pt-5">
        <v-col lg="6">
          <v-text-field
            v-model="nomeEnderecoCliente"
            :counter="10"
            label="Digite um nome para seu endereço"
            required
          ></v-text-field>
        </v-col>
        <v-col lg="6">
          <v-combobox
            v-model="tipoEnderecoCliente"
            :items="itemsTipoEnderecoCliente"
            label="Tipo de endereço"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row class="mt-5 mx-3 my-3">
        <v-col lg="4">
          <v-text-field
            v-model="cepCliente"
            :counter="10"
            v-mask="['#####-###']"
            label="Digite seu CEP"
            @blur="pesquisarCep"
            required
          ></v-text-field>
        </v-col>
        <v-col lg="4">
          <v-text-field
            v-model="logradouroCliente"
            :counter="10"
            label="Digite o nome da sua rua"
            required
          ></v-text-field>
        </v-col>
        <v-col lg="4">
          <v-text-field
            v-model="numeroCliente"
            :counter="10"
            label="Digite o N°"
            v-mask="['######']"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-5 mx-3 my-3">
        <v-col lg="4">
          <!-- Colocar um auto complete -->
          <v-text-field
            :counter="10"
            v-model="bairroCliente"
            label="Digite o nome do seu bairro"
            required
          ></v-text-field>
        </v-col>
        <v-col lg="4">
          <v-text-field
            v-model="cidadeCliente"
            :counter="10"
            label="Digite o nome da sua cidade"
            required
          ></v-text-field>
        </v-col>
        <v-col lg="4">
          <v-combobox
            v-model="ufCliente"
            :items="itemsUfCliente"
            label="Digite o nome do seu UF"
          ></v-combobox>
          <!-- <v-text-field
            v-model="ufCliente"
            :counter="10"
            label="Digite o nome do seu UF"
            required
          ></v-text-field> -->
        </v-col>
      </v-row>
      <v-row class="mt-5 mx-3 my-3" v-if="this.$store.state.enderecos">
        <v-col lg="12">
          <v-expansion-panels accordion>
            <v-expansion-panel
              v-for="(item, i) in this.$store.state.enderecos"
              :key="i"
            >
              <v-expansion-panel-header @click="getEndereco(i)">
                <v-row>
                  <v-col lg="4">
                    <p>{{ item.nomeEnderecoCliente }}</p>
                  </v-col>
                  <v-col lg="4">
                    <p>{{ item.tipoEnderecoCliente }}</p>
                  </v-col>
                  <v-col lg="4">
                    <p>{{ item.cepCliente }}</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <!-- logradouroCliente: this.logradouroCliente,
        numeroCliente: this.numeroCliente,
        bairroCliente: this.bairroCliente,
        cidadeCliente: this.cidadeCliente,
        ufCliente: this.ufCliente, -->
                <v-row>
                  <v-col lg="4">
                    <p>{{ item.logradouroCliente }}</p>
                  </v-col>
                  <v-col lg="1">
                    <p>N° {{ item.numeroCliente }}</p>
                  </v-col>
                  <v-col lg="3">
                    <p>{{ item.bairroCliente }}</p>
                  </v-col>
                  <v-col lg="3">
                    <p>{{ item.cidadeCliente }}</p>
                  </v-col>
                  <v-col lg="1">
                    <p>{{ item.ufCliente }}</p>
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
      codEnderecoCliente: 0,
      codCliente: "",
      nomeCliente: "",
      cpfCliente: "",
      apelidoCliente: "",
      telefoneCliente: "",
      sexoCliente: "",
      emailCliente: "",
      senhaCliente: "",
      cepCliente: "",
      logradouroCliente: "",
      numeroCliente: "",
      bairroCliente: "",
      cidadeCliente: "",
      ufCliente: "",
      nomeEnderecoCliente: "",
      confirmacaoSenhaCliente: "",
      image: null,
      valorBarra: 50,
      activePicker: null,
      date: "",
      menu: false,
      forca: 0,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      tipoEnderecoCliente: "",
      itemsTipoEnderecoCliente: ["Residencial", "Comercial", "Empresárial"],
      itemsUfCliente: [
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
    // forca(newVal) {
    //   if (newVal < 30) {
    //     this.frase = "Senha fraca";
    //   } else if (newVal >= 30 && newVal < 50) {
    //     this.frase = "Senha média";
    //   } else if (newVal >= 50 && newVal < 70) {
    //     this.frase = "Senha forte";
    //   } else {
    //     this.frase = "Senha excelente";
    //   }
    // },
  },
  computed: {
    formataDataNasc() {
      return this.$moment(this.date, "YYYY-MM-DD").format("DD/MM/YYYY");
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

      if (this.senhaCliente != this.confirmacaoSenhaCliente) {
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
        this.nomeCliente != "" &&
        this.cpfCliente != "" &&
        this.apelidoCliente != "" &&
        this.telefoneCliente != "" &&
        this.sexoCliente != "" &&
        this.emailCliente != "" &&
        this.senhaCliente != "" &&
        this.cepCliente != "" &&
        this.logradouroCliente != "" &&
        this.numeroCliente != "" &&
        this.bairroCliente != "" &&
        this.cidadeCliente != "" &&
        this.ufCliente != "" &&
        this.nomeEnderecoCliente != "" &&
        this.forca >= 70 &&
        this.tipoEnderecoCliente != "" &&
        this.confirmacaoSenhaCliente != ""
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapMutations(["addEnderecos"]),
    addEndereco() {
      this.addEnderecos({
        cod: this.codEnderecoCliente,
        tipoEnderecoCliente: this.tipoEnderecoCliente,
        nomeEnderecoCliente: this.nomeEnderecoCliente,
        cepCliente: this.cepCliente,
        logradouroCliente: this.logradouroCliente,
        numeroCliente: this.numeroCliente,
        bairroCliente: this.bairroCliente,
        cidadeCliente: this.cidadeCliente,
        ufCliente: this.ufCliente,
      });
    },
    getEndereco(id){
      let endereco = this.$store.state.enderecos[id];
      this.cepCliente = endereco.cepCliente;
      this.logradouroCliente = endereco.logradouroCliente;
      this.numeroCliente = endereco.numeroCliente;
      this.bairroCliente = endereco.bairroCliente;
      this.cidadeCliente = endereco.cidadeCliente;
      this.ufCliente = endereco.ufCliente;
      this.nomeEnderecoCliente = endereco.nomeEnderecoCliente;
      this.tipoEnderecoCliente = endereco.tipoEnderecoCliente;
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
        .get(`https://viacep.com.br/ws/${this.cepCliente}/json/unicode/`)
        .then((res) => {
          console.log(res);
          this.logradouroCliente = res.data.logradouro;
          this.bairroCliente = res.data.bairro;
          this.cidadeCliente = res.data.localidade;
          this.ufCliente = res.data.uf;
        });
    },

    salvar() {
      this.$store.state.cadastro = true;
      this.$store.state.nome = this.apelidoCliente;
      this.$router.push(`/`);
    },
    verificacaoSenhaForte() {
      this.forca = 0;
      if (this.senhaCliente.length >= 4 && this.senhaCliente.length <= 7) {
        this.forca += 10;
      } else if (this.senhaCliente.length > 7) {
        this.forca += 20;
      }

      if (this.senhaCliente.length >= 5 && this.senhaCliente.match(/[a-z]+/)) {
        this.forca += 10;
      }

      if (this.senhaCliente.length >= 6 && this.senhaCliente.match(/[A-Z]+/)) {
        this.forca += 20;
      }

      if (
        this.senhaCliente.length >= 7 &&
        this.senhaCliente.match(/[@#$%&;*]/)
      ) {
        this.forca += 25;
      }

      if (this.senhaCliente.match(/([1-9]+)\1{1,}/)) {
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
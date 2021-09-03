<template>
  <v-card elevation="0">
    <h2 class="cor-letra text-center mt-5 pt-5">
      Agora preciso que você me informe um endereço...

      <div class="mt-2">
        <v-btn
          elevation="0"
          v-if="idEndereco == null"
          text
          class="btnSubmit"
          @click="addEndereco()"
          id="addEndereco"
          ><v-icon left> mdi-plus </v-icon> add endereço</v-btn
        >
        <v-btn
          elevation="0"
          v-if="idEndereco != null"
          text
          class="btnSubmit"
          @click="editarEndereco()"
          id="editarEndereco"
          ><v-icon left> mdi-pencil-outline </v-icon> Editar endereço</v-btn
        >
      </div>
    </h2>
    <v-row class="mt-0 mx-4 pt-3">
      <v-col lg="3">
        <v-text-field
          v-model="nomeEndereco"
          label="Nome desse endereço"
          id="nomeEndereco"
          required
        ></v-text-field>
      </v-col>
      <v-col lg="3">
        <v-combobox
          v-model="tipoEndereco"
          :items="itensTipoEndereco"
          label="Tipo de endereço"
          id="tipoEndereco"
        ></v-combobox>
      </v-col>
      <v-col lg="3">
        <v-combobox
          v-model="tipoResidencia"
          :items="itensTipoResidencia"
          label="Tipo de Residência"
          id="tipoResidencia"
        ></v-combobox>
      </v-col>
      <v-col lg="3">
        <v-text-field
          v-model="cep"
          v-mask="['#####-###']"
          label="CEP"
          @blur="pesquisarCep"
          id="cep"
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
          id="logradouro"
          required
        ></v-text-field>
      </v-col>
      <v-col lg="3">
        <v-text-field
          v-model="numero"
          label="Número"
          v-mask="['######']"
          id="numero"
          required
        ></v-text-field>
      </v-col>
      <v-col lg="3">
        <v-text-field
          v-model="complemento"
          label="Complemento"
          id="complemento"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-1 mx-3 my-1">
      <v-col lg="3">
        <v-text-field
          v-model="bairro"
          label="Bairro"
          id="bairro"
          required
        ></v-text-field>
      </v-col>
      <v-col lg="3">
        <v-text-field
          v-model="cidade"
          label="Cidade"
          id="cidade"
          required
        ></v-text-field>
      </v-col>
      <v-col lg="3">
        <v-combobox v-model="uf" :items="itensUf" label="Estado"></v-combobox>
      </v-col>
      <v-col lg="3">
        <v-text-field
          v-model="pais"
          label="País"
          id="pais"
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
                <v-col lg="3">
                  <p>{{ item.nome }}</p>
                </v-col>
                <v-col lg="2">
                  <p>{{ item.tipo_residencia }}</p>
                </v-col>
                <v-col lg="2">
                  <p>{{ item.tipo_endereco }}</p>
                </v-col>
                <v-col lg="2">
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
                      <v-btn
                        elevation="0"
                        v-if="$store.state.enderecos.length > 1"
                        icon
                        @click="remove(item.id)"
                        id="excluirEndereco"
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
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      <h4 style="font-weight: 100">{{ mensagem }}</h4>
      <template v-slot:action="{ attrs }">
        <v-btn text icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "endereco",
  props: {
    clickNoSalvar: Boolean,
    dadosEndereco: Array,
  },
  data() {
    return {
      idEndereco: null,
      nomeEndereco: "",
      cep: "",
      tipoLogradouro: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      tipoEndereco: "",
      cidade: "",
      uf: "",
      snackbar: false,
      snackbarColor: "",
      mensagem: "",
      pais: "Brasil",
      tipoResidencia: "",
      itensTipoLogradouro: ["Rua", "Avenida"],
      itensTipoEndereco: ["Cobrança", "Entrega", "Cobrança e Entrega"],
      itensTipoResidencia: ["Casa", "Apartamento"],
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
    clickNoSalvar(newVal) {
      if (newVal == true) {
        this.addEndereco(1);
        this.limparEndereco();
      }
    },
  },
  computed: {
    verificaId() {
      if (localStorage.getItem("usuarioId")) return true;
      else return false;
    },
  },
  mounted() {
    console.log("Criou novamente");
    this.dadosEndereco.forEach((end) => {
      this.addEnderecoMounted(end);
    });
  },
  methods: {
    ...mapMutations(["addEnderecos"]),
    addEnderecoMounted(end) {
      this.addEnderecos({
        id: end.id,
        status: true,
        tipo_endereco: this.itensTipoEndereco[parseInt(end.tipo_endereco) - 1],
        nome: end.nome,
        cep: end.cep,
        logradouro: end.logradouro,
        complemento: end.complemento,
        numero: end.numero,
        bairro: end.bairro,
        cidade: end.cidade,
        uf: this.itensUf[parseInt(end.uf) - 1],
        pais: end.pais,
        tipo_logradouro:
          this.itensTipoLogradouro[parseInt(end.tipo_logradouro) - 1],
        tipo_residencia:
          this.itensTipoResidencia[parseInt(end.tipo_residencia) - 1],
      });
    },
    ...mapMutations(["addEnderecos"]),
    addEndereco(value) {
      // if (this.cep == "" && this.nomeEndereco == "") {
        console.log("MInha veridicação", this.verificaPreenchimento())
      if (!this.verificaPreenchimento()) {
        console.log("Tá caindo aqui vc não tá vendo?");
        if (this.$store.state.enderecos.length > 0 && value != null) {
          console.log("Será?", this.$store.state.enderecos);
          this.$emit("verificacaoEndereco", {
            salvo: true,
          });
          return false;
        }
        this.$emit("falhaEndereco", false);
        this.snackbarColor = "#b38b57";
        this.mensagem =
          "Ao menos o nome do endereço ou CEP devem ser preenchidos antes de adicioná-los";
        this.snackbar = true;
        return false;
      }
      this.mensagem = "";
      console.log("salvaria")
      let status = this.verificaPreenchimento();
      let frm = {
        id: 0,
        status: status,
        tipo_endereco: this.tipoEndereco,
        nome: this.nomeEndereco,
        cep: this.cep,
        logradouro: this.logradouro,
        complemento: this.complemento,
        numero: this.numero,
        bairro: this.bairro,
        cidade: this.cidade,
        uf: this.uf,
        pais: this.pais,
        tipo_logradouro: this.tipoLogradouro,
        tipo_residencia: this.tipoResidencia,
      };

      if (this.verificaId) {
        this.$http
          .post(`/endereco/${localStorage.getItem("usuarioId")}`, frm)
          .then((res) => {
            frm.id = res.data.endereco.id;
            this.addEnderecos(frm);
          });
      } else {
        this.addEnderecos(frm);
        if (this.clickNoSalvar == true) {
          this.$emit("verificacaoEndereco", {
            salvo: true,
          });
        }
      }
      this.limparEndereco();
    },
    ...mapMutations(["editarEnderecos"]),
    editarEndereco() {
      let status = this.verificaPreenchimento();
      let frm = {
        id: this.idEndereco,
        status: status,
        tipo_endereco: this.tipoEndereco,
        nome: this.nomeEndereco,
        cep: this.cep,
        logradouro: this.logradouro,
        complemento: this.complemento,
        numero: this.numero,
        bairro: this.bairro,
        cidade: this.cidade,
        uf: this.uf,
        pais: this.pais,
        tipo_logradouro: this.tipoLogradouro,
        tipo_residencia: this.tipoResidencia,
      };
      if (this.verificaId) {
        this.$http
          .put(`/endereco/${localStorage.getItem("usuarioId")}`, frm)
          .then((res) => {
            console.log("DEU BOM", res);
            this.editarEnderecos(frm);
          });
      } else {
        this.editarEnderecos(frm);
      }
      this.idEndereco = null;
      this.limparEndereco();
    },
    ...mapMutations(["removeEnderecos"]),
    remove(id) {
      console.log("id", id);
      if (this.verificaId) {
        this.$http.delete(`/endereco/${id}`).then((res) => {
          console.log(res);
          this.removeEnderecos(id);
        });
      } else {
        this.removeEnderecos(id);
      }
    },
    salvarEndereco(value) {
      // if (this.idEndereco == null) this.addEndereco(value);
      this.editarEndereco(this.idEndereco);
      this.limparEndereco();
      console.log("VIADOOOOOOOOOOOOOOOOOOOOOOO");
      //if (status == true) {
      console.log("Valor", value);

      //}
      this.idEndereco = null;
    },
    // salvarEndereco() {
    //   if (this.cep == "" && this.nomeEndereco == "") {
    //     this.snackbarColor = "#b38b57";
    //     this.mensagem =
    //       "Ao menos o nome do endereço ou CEP devem ser preenchidos antes de adicioná-los";
    //     this.snackbar = true;
    //     return false;
    //   }
    //   this.mensagem = "";
    //   let status = this.verificaPreenchimento();
    //   if (this.idEndereco == null) this.addEndereco(status);
    //   else this.editarEndereco(this.idEndereco, status);
    //   this.limparEndereco();
    //   if (status == true) {
    //     this.$emit("verificacaoEndereco", true);
    //   }
    //   this.idEndereco = null;
    // },
    getEndereco(id) {
      this.idEndereco = id;
      console.log("IIIIIIID", this.idEndereco);

      let endereco = this.$store.state.enderecos.filter(
        (endereco) => endereco.id == id
      );
      endereco = endereco[0];
      this.cep = endereco.cep;
      this.logradouro = endereco.logradouro;
      this.pais = endereco.pais;
      this.complemento = endereco.complemento;
      this.numero = endereco.numero;
      this.bairro = endereco.bairro;
      this.cidade = endereco.cidade;
      this.uf = endereco.uf;
      this.nomeEndereco = endereco.nome;
      this.tipoEndereco = endereco.tipo_endereco;
      this.tipoLogradouro = endereco.tipo_logradouro;
      this.tipoResidencia = endereco.tipo_residencia;
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
    limparEndereco() {
      this.cep = "";
      this.logradouro = "";
      this.complemento = "";
      this.numero = "";
      this.bairro = "";
      this.cidade = "";
      this.uf = "";
      this.nomeEndereco = "";
      this.tipoEndereco = "";
      this.tipoLogradouro = "";
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
  },
};
</script>
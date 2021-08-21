<template>
  <v-container fluid>
    <h1>Pagamento</h1>
    <v-row class="mt-5 mx-4 pt-5">
      <v-col lg="6">
        <v-text-field
          v-model="numeroCartao"
          :counter="10"
          label="Digite o numero do seu cartão de credito"
          required
        ></v-text-field>
      </v-col>
      <v-col lg="6">
        <v-text-field
          v-model="nomeCartao"
          :counter="10"
          label="Digite o nome no seu cartão de credito"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-5 mx-4 pt-5">
      <v-col lg="6">
        <v-text-field
          v-model="codCartao"
          :counter="3"
          label="Digite o codigo de segurança"
          required
        ></v-text-field>
      </v-col>
      <v-col lg="6">
        <v-combobox
          v-model="bandeiraCartao"
          :items="itemsBandeiraCartao"
          label="Bandeira do cartão"
          required
        >
        </v-combobox>
      </v-col>
      <v-col class="text-right" lg="12" md="" sm="" col="5">
        <v-btn
          elevation="0"
          v-if="idCartaoCliente == null"
          text
          class="btnSubmit"
          @click="salvarCartao()"
          ><v-icon left> mdi-plus </v-icon> add cartão</v-btn
        >
        <v-btn
          elevation="0"
          v-if="idCartaoCliente != null"
          text
          class="btnSubmit"
          @click="salvarCartao()"
          ><v-icon left> mdi-plus </v-icon> editar cartão</v-btn
        >
        
      </v-col>
    </v-row>
    <v-row class="mt-1 mx-3 my-3" v-if="this.$store.state.cartoes">
      <v-col lg="12">
        <v-expansion-panels accordion>
          <v-expansion-panel
            v-for="(item, i) in this.$store.state.cartoes"
            :key="i"
          >
            <v-expansion-panel-header>
              <!-- Colocar os itens da lista cartoes do Store -->
              <v-row class="centraliza">
                <v-col lg="4">
                  <p>{{ item.nomeCartao }}</p>
                </v-col>
                <v-col lg="2">
                  <p>{{ item.numeroCartao}}</p>
                </v-col>
                <v-col lg="3">
                  <p>{{ item.bandeiraCartao }}</p>
                </v-col>
                <v-col lg="2">
                  <v-row>
                    <v-col lg="4">
                      <v-btn elevation="0" icon @click="getCartao(item.id)"
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
                  <p>{{ item.nomeCartao }}</p>
                </v-col>
                <v-col lg="1">
                  <p>N° {{ item.numeroCartao }}</p>
                </v-col>
                <v-col lg="3">
                  <p>{{ item.bandeiraCartao }}</p>
                </v-col>           
                
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- <v-snackbar v-model="snackbar" :color="snackbarColor">
          <h4 style="font-weight: 100">{{ mensagem }}</h4>

          <template v-slot:action="{ attrs }">
            <v-btn text icon v-bind="attrs" @click="snackbar = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      nomeCartao: "",
      bandeiraCartao: "",
      itemsBandeiraCartao: ["MasterCard", "Visa", "Elo"],
      codCartao: "",
      numeroCartao: "",
      idCartaoCliente: null,
      snackbar: false,
      snackbarColor: ""
    };
  },
  methods: {
    ...mapMutations(["addCartao"]),
    addCartoes() {
      if (
        this.codCartao == "" &&
        this.bandeiraCartao == "" &&
        this.numeroCartao == "" &&
        this.nomeCartao == ""
      ) {
        this.snackbarColor = "#b38b57";
        this.mensagem = "Todos os dados devem ser preenchidos";
        this.snackbar = true;
        return false;
      }
      this.mensagem = "";
      let status = this.verificaPreenchimento();
      this.addCartao({
        id: 0,
        status: status,
        codCartao: this.codCartao,
        bandeiraCartao: this.bandeiraCartao,
        numeroCartao: this.numeroCartao,
        nomeCartao: this.nomeCartao,
      });
    },
    ...mapMutations(["editarCartao"]),
    editarCartoes(id) {
      let status = this.verificaPreenchimento();
      let cartao = this.verificaIdExistente();
      console.log(cartao);
      this.editarCartao({
        id: id,
        status: status,
        codCartao: this.codCartao,
        bandeiraCartao: this.bandeiraCartao,
        numeroCartao: this.numeroCartao,
        nomeCartao: this.nomeCartao,
        
      });
      console.log("dentro funçao", this.numeroCartao)
    },
    ...mapMutations(["removeCartao"]),
    remove(id) {
      console.log("id", id);
      this.removeCartao(id);
    },
    verificaIdExistente() {
      let cartao = this.$store.state.cartoes;

      let encontrou = cartao.filter(
        (cartao) => cartao.id == this.idCartaoCliente
      );
      console.log("Achooooooooouuuuuuuuuuuuuu", encontrou);
      return true;
    },
    salvarCartao() {
      if (this.idCartaoCliente == null) this.addCartoes();
      else this.editarCartoes(this.idCartaoCliente);

      this.limparCartao();
      this.idCartaoCliente = null;
    },
    verificaPreenchimento() {
      //Parei aqui, proximo passo é validar os campos e ver se está tudo certo
      if (
        this.codCartao != "" &&
        this.bandeiraCartao != "" &&
        this.numeroCartao != "" &&
        this.nomeCartao != ""
      ) {
        return true;
      }
      return false;
    },
    limparCartao() {
      this.codCartao = "";
      this.bandeiraCartao = "";
      this.numeroCartao = "";
      this.nomeCartao = "";
    },
    getCartao(id) {
      console.log("IDDDDDD RECEBIDO", id);
      this.idCartaoCliente = id;

      let cartao = this.$store.state.cartoes.filter((cartao) => cartao.id == id);
      console.log("Cartao", cartao);
      cartao = cartao[0];
      (this.codCartao = cartao.codCartao),
        (this.bandeiraCartao = cartao.bandeiraCartao),
        (this.numeroCartao = cartao.numeroCartao),
        (this.nomeCartao = cartao.nomeCartao);
    },
  },
};
</script>
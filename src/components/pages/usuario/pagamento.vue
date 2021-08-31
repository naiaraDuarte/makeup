<template>
  <v-container fluid>
    <h1>Pagamento</h1>
    <div class="card-wrapper"></div>

    <form>
      <v-row>
        <v-col>
          <v-text-field
            v-model="numeroCartao"
            :counter="16"
            id="cc-number"
            name="number"
            label="Digite o numero do seu cartão de credito"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="nomeCartao"
            :counter="30"
            id="cc-name"
            name="first-name"
            label="Digite o nome no seu cartão de credito"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="expCartao"
            :counter="6"
            id="cc-expiration"
            name="expiry"
            label="Digite a data de validade"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="codCartao"
            :counter="3"
            id="cc-cvv"
            name="cvc"
            label="Digite o codigo de segurança"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </form>

    <v-row>
      <v-col class="text-right" lg="12" md="" sm="" col="5">
        <v-btn
          elevation="0"
          v-if="idCartaoCliente == null"
          text
          class="btnSubmit"
          id="salvarCartao"
          @click="salvarCartao()"
          ><v-icon left> mdi-plus </v-icon> add cartão</v-btn
        >
        <v-btn
          elevation="0"
          v-if="idCartaoCliente != null"
          text
          class="btnSubmit"
          @click="salvarCartao()"
          id="salvarEditado"
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
              <v-row class="centraliza">
                <v-col lg="3">
                  <p>{{ item.nome }}</p>
                </v-col>
                <v-col lg="5">
                  <p>{{ item.numero }}</p>
                </v-col>
                <v-col lg="2">
                  <p>{{ item.data_validade }}</p>
                </v-col>
                <v-col lg="2">
                  <v-row>
                    <v-col lg="4">
                      <v-btn
                        elevation="0"
                        icon
                        @click="getCartao(item.id)"
                        id="editarCartao"
                        ><v-icon>mdi-pencil-outline</v-icon></v-btn
                      >
                    </v-col>
                    <v-col lg="4">
                      <v-btn
                        elevation="0"
                        icon
                        @click="remove(item.id)"
                        id="excluirCartao"
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
          </v-expansion-panel>
        </v-expansion-panels>
        <v-snackbar v-model="snackbar" :color="snackbarColor">
          <h4 style="font-weight: 100">{{ mensagem }}</h4>

          <template v-slot:action="{ attrs }">
            <v-btn text icon v-bind="attrs" @click="snackbar = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import * as Card from "card";
export default {
  name: "Form CreditCard",
  data() {
    return {
      nomeCartao: "",
      expCartao: "",
      itensBandeiraCartao: ["MasterCard", "Visa", "Elo"],
      codCartao: "",
      numeroCartao: "",
      idCartaoCliente: null,
      snackbar: false,
      snackbarColor: "",
      mensagem: "",
    };
  },
  mounted() {
    new Card({
      form: "form",
      container: ".card-wrapper",
      formSelectors: {
        numberInput: "input#cc-number",
        nameInput: "input#cc-name",
        expiryInput: "input#cc-expiration",
        cvcInput: "input#cc-cvv",
      },
      width: 270,
      formatting: true,
      placeholders: {
        number: "•••• •••• •••• ••••",
        name: "Nome Completo",
        expiry: "••/••",
        cvc: "•••",
      },
    });
    if (localStorage.getItem("usuarioId")) {
      console.log("Entrou aqui ", localStorage.getItem("usuarioId"));
      this.$http
        .get(`/cliente/${localStorage.getItem("usuarioId")}`)
        .then((res) => {
          this.$store.state.cadastro = true;

          res.data.cartao.forEach((cart) => {
            this.addCartaoMounted(cart);
          });
          console.log("STORE CLIENTE", this.$store.state.usuario);
          console.log("STORE ENDERERCO", this.$store.state.enderecos);
          console.log("STORE Cartao", this.$store.state.cartoes);
        });
    }
  },
  computed: {
    verificaId() {
      if (localStorage.getItem("usuarioId")) return true;
      else return false;
    },
  },
  methods: {
    ...mapMutations(["addCartao"]),
    addCartaoMounted(cart) {
      this.addCartao({
    
        id: cart.id,
        nome: cart.nome,
        numero: cart.numero,
        cvv: cart.cvv,
        data_validade: cart.data_validade,
        bandeira: 2,
      });
    },
    ...mapMutations(["addCartao"]),
    addCartoes() {
      if (!this.verificaPreenchimento()) {
        this.snackbarColor = "#b38b57";
        this.mensagem = "Todos os dados devem ser preenchidos";
        this.snackbar = true;
        return false;
      }
      this.mensagem = "";
      let status = this.verificaPreenchimento();
      let frm = {
        status: status,
        nome: this.nomeCartao,
        numero: this.numeroCartao,
        cvv: this.codCartao,
        data_validade: this.expCartao,
        bandeira: 2,
      };
      if (this.verificaId) {
        this.$http
          .post(`/cartao/${localStorage.getItem("usuarioId")}`, frm)
          .then((res) => {
            console.log("retorno do BD", res);
            frm.id = res.data.cartao.id;
            this.addCartao(frm);
          });
      } else {
        this.addCartao(frm);
      }
    },
    ...mapMutations(["editarCartao"]),
    editarCartoes(id) {
      let status = this.verificaPreenchimento();
      // let cartao = this.verificaIdExistente();
      let frm = {
        id: id,
        status: status,
        nome: this.nomeCartao,
        numero: this.numeroCartao,
        cvv: this.codCartao,
        data_validade: this.expCartao,
        bandeira: 2,
      };
      if (this.verificaId) {
        this.$http.put(`/cartao/${id}`, frm).then((res) => {
          console.log("retorno do BD", res);
          // frm.id = res.data.cartao.id;
          this.editarCartao(frm);
        });
      }
    },
    ...mapMutations(["removeCartao"]),
    remove(id) {
      console.log("id", id);
      if (this.verificaId) {
        this.$http.delete(`/cartao/${id}`).then((res) => {
          console.log(res);
          this.removeCartao(id);
        });
      }
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
      if (
        this.codCartao != "" &&
        this.expCartao != "" &&
        this.numeroCartao != "" &&
        this.nomeCartao != ""
      ) {
        return true;
      }
      return false;
    },
    limparCartao() {
      this.codCartao = "";
      this.expCartao = "";
      this.numeroCartao = "";
      this.nomeCartao = "";
    },
    getCartao(id) {
      console.log("IDDDDDD RECEBIDO", id);
      this.idCartaoCliente = id;

      let cartao = this.$store.state.cartoes.filter(
        (cartao) => cartao.id == id
      );
      console.log("Cartao", cartao);
      cartao = cartao[0];
      (this.codCartao = cartao.cvv),
        (this.expCartao = cartao.data_validade),
        (this.numeroCartao = cartao.numero),
        (this.nomeCartao = cartao.nome);
    },
  },
};
</script>
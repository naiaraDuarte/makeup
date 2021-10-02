<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="2">
          <v-stepper
            v-model="e1"
            alt-labels
            elevation="0"
            v-if="verificaId == true"
          >
            <v-stepper-header elevation="0" style="box-shadow: none">
              <v-stepper-step :complete="e1 > 1" step="1">
                Carrinho
              </v-stepper-step>

              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">
                Pagamento
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3"> Confirmação </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <compras @compraProx="e1 = 2"></compras>
              </v-stepper-content>
              <v-stepper-content step="2">
                <pagamento v-if="e1 == 2" :mostra="false"></pagamento>

                <v-row class="text-right mx-1 mb-3">
                  <v-col lg="9"></v-col>
                  <v-col lg="3">
                    <v-row class="text-right">
                      <v-col class="pl-5 text-center">
                        <v-btn
                          elevation="1"
                          class="mr-3"
                          icon
                          id="voltar"
                          @click="e1 = 1"
                          ><v-icon>mdi-chevron-left</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="3">
                 <confirmacao v-if="e1 == 3"></confirmacao>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>

          <v-stepper v-model="e1" alt-labels elevation="0" v-else>
            <v-stepper-header elevation="0" style="box-shadow: none">
              <v-stepper-step :complete="e1 > 1" step="1">
                Carrinho
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2">
                Login
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 3" step="3">
                Pagamento
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="4"> Confirmação </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <compras @compraProx="e1 = 2"></compras>
              </v-stepper-content>
              <v-stepper-content step="2">
                <entrar :carrinho="true" @logou="e1 = 3"></entrar>
              </v-stepper-content>
              <v-stepper-content step="3">
                <pagamento v-if="e1 == 3"
                  :dadosEndereco="dadosEndereco"
                  :dadosCartao="dadosCartao"
                ></pagamento>
                <v-row class="text-right mx-1 mb-3">
                  <v-col lg="9"></v-col>
                  <v-col lg="3">
                    <v-row class="text-right">
                      <v-col class="pl-5 text-center">
                        <v-btn
                          elevation="1"
                          class="mr-3"
                          icon
                          id="voltar"
                          @click="e1 = 2"
                          ><v-icon>mdi-chevron-left</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="4">
                <confirmacao v-if="e1 == 4"></confirmacao>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import compras from "../components/pages/carrinho/compra.vue";
import entrar from "../components/pages/usuario-e-adm/login.vue";
import pagamento from "../components/pages/carrinho/pagamento.vue";
import confirmacao from "../components/pages/carrinho/confirmacao.vue";

export default {
  props: {
    dadosCliente: Array,
    dadosEndereco: Array,
    dadosCartao: Array,
  },
  components: {
    compras,
    entrar,
    pagamento,
    confirmacao,
  },
  data() {
    return {
      componente: "",
      e1: 1,
      steps: [
        {
          nome: "Carrinho",
          componente: "Carrinho",
        },
        {
          nome: "Login",
          componente: "login",
        },
        {
          nome: "Pagamento",
          componente: "pagamento",
        },
        {
          nome: "Confirmação",
          componente: "confirmacao",
        },
      ],
    };
  },
  computed: {
    verificaId() {
      if (localStorage.getItem("usuarioId")) return true;
      return false;
    },
  },
  watch: {
    "$store.state.concluir": function () {
      if (this.$store.state.concluir == true) {
        this.e1 += 1;
        // this.$store.state.concluir = false;
      }else {
        this.e1 -= 1;
      }
    },
  },
  methods: {
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
  },
};
</script>
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
                <compras></compras>

                <v-row class="text-right mx-1 mb-3">
                  <v-col lg="9"></v-col>
                  <v-col lg="3">
                    <v-row class="text-right">
                      <v-col class="pl-5 text-center">
                        <v-btn elevation="1" icon id="ir" @click="e1 = 2"
                          ><v-icon>mdi-chevron-right</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="2">
                <pagamento :mostra="false"></pagamento>

                <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

                <v-btn text @click="e1 = 1"> Cancel </v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>

                <v-btn color="primary" @click="e1 = 4"> Continue </v-btn>

                <v-btn text> Cancel </v-btn>
              </v-stepper-content>

              <v-stepper-content step="4">
                <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>

                <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>

                <v-btn text> Cancel </v-btn>
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
                <compras></compras>

                <v-row class="text-right mx-1 mb-3">
                  <v-col lg="9"></v-col>
                  <v-col lg="3">
                    <v-row class="text-right">
                      <v-col class="pl-5 text-center">
                        <v-btn elevation="1" icon id="ir" @click="e1 = 2"
                          ><v-icon>mdi-chevron-right</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="2">
                <entrar></entrar>

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
                        <v-btn elevation="1" icon id="ir" @click="e1 = 3"
                          ><v-icon>mdi-chevron-right</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="3">
                <pagamento></pagamento>
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
                        <v-btn elevation="1" icon id="ir" @click="e1 = 4"
                          ><v-icon>mdi-chevron-right</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="4">
                <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>

                <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>

                <v-btn text> Cancel </v-btn>
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
export default {
  components: {
    compras,
    entrar,
    pagamento,
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
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="2">
          <v-stepper v-model="e1" alt-labels elevation="0">
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
                        <v-btn
                          elevation="1"
                          icon
                          id="ir"
                          @click="e1 = 2"
                          ><v-icon>mdi-chevron-right</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>

                <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

                <v-btn text  @click="e1 = 1"> Cancel </v-btn>
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
          <!-- <keep-alive>
        <component :is="componente"></component>
      </keep-alive> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import compras from "../components/pages/carrinho/compra.vue";
export default {
  components: {
    compras,
  },
  data() {
    return {
      componente: "",
      e1: 1,
    };
  },
};
</script>
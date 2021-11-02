<template>
  <div>
    <v-app-bar app clipped-left dark height="80" class="navbar" color="black">
      <v-row class="my-1">
        <v-col lg="2" class="centraliza">
          <img
            class="ml-5 pl-5"
            :src="require('../../assets/images/logocortado.png')"
            height="43"
          />
        </v-col>
        <v-col lg="6" class="centraliza">
          <v-row>
            <v-col lg="4"></v-col>
            <v-col lg="8" class="mt-5 centraliza">
              <v-text-field
                color="#b38b57"
                label="O que você está procurando?"
                v-model="textField"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="4" class="centraliza mb-2">
          <v-row class="w-100" style="max-width: 100%">
            <v-col
              lg="4"
              class="text-center retiraPadding"
              v-if="!$store.state.cadastro"
            >
              <!-- <p class="mb-0">Bem vindo :)</p> -->
              <v-btn
                class="white--text btnLink"
                @click="$router.push(`/usuario`)"
                target="_blank"
                id="entrar"
                text
              >
                <v-icon color="#b38b57" class="pr-3"
                  >mdi-account-circle-outline</v-icon
                >Entrar
              </v-btn>
            </v-col>
            <v-col
              lg="4"
              class="text-center retiraPadding"
              v-if="$store.state.cadastro"
            >
              <v-btn
                class="white--text btnLink"
                @click="$router.push(`/usuario`)"
                target="_blank"
                id="minhaConta"
                text
                ><v-icon color="#b38b57" class="pr-3"
                  >mdi-account-circle-outline</v-icon
                >Minha conta
              </v-btn>
            </v-col>
            <v-col lg="4">
              <v-btn
                class="white--text btnLink"
                @click="$router.push(`/usuario`)"
                target="_blank"
                text
              >
                <v-icon color="#b38b57" class="pr-3">mdi-heart-outline</v-icon
                >Favoritos
              </v-btn>
            </v-col>
            <v-col lg="4">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                open-on-hover
                bottom
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="white--text btnLink"
                    @click="$router.push(`/usuario`)"
                    target="_blank"
                    id="carrinho"
                    v-bind="attrs"
                    v-on="on"
                    text
                  >
                    <v-badge
                      :content="messages"
                      :value="messages"
                      color="#b38b57"
                      overlap
                    >
                      <v-icon color="#b38b57" class="pr-3"
                        >mdi-cart-variant</v-icon
                      >
                    </v-badge>
                    <span
                      :class="
                        $store.state.carrinho.length > 0 ? 'carrinhoNavBar' : ''
                      "
                    >
                      Carrinho
                    </span>
                  </v-btn>
                </template>

                <!-- <v-card>
                  <h2>AAAAAAAA</h2> -->
                    <!-- <carrinho-flutuante></carrinho-flutuante> -->
                <!-- </v-card> -->
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>
<script>
// import carrinhoFlutuante from "../ui/carrinhoFlutuante.vue";
export default {
  // components: { carrinhoFlutuante },
  data() {
    return {
      textField: "",
      show: true,
      fav: true,
      menu: false,
      message: false,
      hints: true,
    };
  },
  computed: {
    messages() {
      return this.$store.state.carrinho.length;
    },
  },
  watch: {
    textField(newVal) {
      this.$store.state.busca = newVal;
    },
  },
};
</script>
<style scoped>
.barraDourada {
  width: 100%;
  height: 3rem;
  background-image: linear-gradient(to left, #ab8632, #dba322, #b68e26);
}
.btnLink {
  text-transform: initial;
  text-decoration: lightcoral !important;
  font-family: "PT Sans", sans-serif !important;
}

.v-btn:not(.v-btn--round).v-size--default {
  padding: 0;
}
.v-btn.v-size--default {
  font-size: 0.999rem;
}
.carrinhoNavBar {
  padding-left: 10px;
}
@media (min-width: 1264px) {
  .col-lg-6 {
    flex: 0 0 50%;
    max-width: 100%;
    /* padding: 5px; */
  }
}
</style>
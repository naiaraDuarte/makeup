<template>
  <v-container fluid>
    <v-row v-if="!verificaId">
      <v-col>
        <v-btn @click="$router.push(`/`)" target="_blank" text>
          <v-icon color="#ccc">mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
          @click="componente = 'login'"
          :class="[componente == 'login' ? 'ativado' : 'desativado']"
          target="_blank"
          text
        >
          <span>Entrar</span>
        </v-btn>
        <v-btn
          @click="componente = 'cadastro'"
          :class="[componente == 'cadastro' ? 'ativado' : 'desativado']"
          target="_blank"
          text
        >
          <span>Cadastre-se</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-card
      v-if="!verificaId"
      :class="[componente == 'cadastro' ? 'cadastro' : 'login']"
    >
      <keep-alive>
        <component :is="componente" :carrinho="false"></component>
      </keep-alive>
    </v-card>

    <!-- Depois que o cadastro já foi efetuado -->
    <v-card style="margin-top: 0px" v-if="verificaId">
      <v-btn @click="$router.push(`/`)" target="_blank" text>
        <v-icon color="#ccc">mdi-arrow-left</v-icon>
      </v-btn>
      <v-row class="">
        <v-col class="text-left" lg="2">
          <v-card elevation="0" class="mx-auto" max-width="300" tile>
            <v-list flat>
              <!-- <v-subheader>REPORTS</v-subheader> -->
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col lg="10">
          <cadastro v-if="selectedItem == 0"></cadastro>
          <pagamento v-if="selectedItem == 1" :mostra="true"></pagamento>
          <compras v-if="selectedItem == 2"></compras>
          <!-- <cadastro else></cadastro> -->
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import cadastro from "../components/pages/usuario/cadastro.vue";
import login from "../components/pages/usuario-e-adm/login.vue";
import pagamento from "../components/pages/usuario/pagamento.vue";
import compras from "../components/pages/usuario/compras.vue";

export default {
  components: {
    cadastro,
    login,
    pagamento,
    compras,
  },
  data() {
    return {
      componente: "login",
      idUsuario: null,
      selectedItem: 0,
      items: [
        { text: "Conta", icon: "mdi-account" },
        { text: "Pagamento", icon: "mdi-clock" },
        { text: "Compras", icon: "mdi-flag" },
        { text: "Sair", icon: "mdi-flag" },
      ],
    };
  },
  async mounted() {
    this.$store.state.perfil = "usuario";
  },
  watch: {
    selectedItem(newVal, oldVal) {
      if (newVal == null) {
        return (this.selectedItem = oldVal);
      }
      if (newVal == 3) {
        localStorage.setItem("usuarioId", "");
        this.$store.state.enderecos = [];
        this.$store.state.usuario.splice(1, 1);
        this.$store.state.cadastro = false;
        this.$router.push(`/`);
      }
    },
  },
  computed: {
    verificaId() {
      if (localStorage.getItem("usuarioId")) return true;
      else return false;
    },
  },
};
</script>
<style scoped>
.ativado {
    background-color: #b38b57;
    color: white;
  }
  .desativado {
    background-color: white;
  }
  
  .cadastro {
    border: 1px solid #b38b57;
  }
  .login {
    border: 1px solid #b38b57;
  }
  
  @media (min-width: 1264px) {
    .container {
      max-width: 1312px !important;
    }
  }
</style>
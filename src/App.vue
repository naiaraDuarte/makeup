<template>
  <v-app>
    <navbar v-if="$store.state.perfil == 'adm'"></navbar>
    <app-header v-if="$store.state.perfil == 'usuario'"></app-header>
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import "./assets/css/main.scss";
import navbar from "./components/layout/navbar.vue";
import appHeader from "./components/layout/header.vue";
import { mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    appHeader,
    navbar,
  },
  data() {
    return {
      dadosCliente: [],
      dadosEndereco: [],
      dadosCartao: [],
    };
  },
  async mounted() {
    if (this.verificaId) {
      if (localStorage.getItem("usuarioId") == "adm") {
        this.$store.state.perfil = "adm";
        return ;
      }
      await this.usuario()
    }
    this.$store.state.perfil = "usuario";
    
  },
  computed: {
    verificaId() {
      if (localStorage.getItem("usuarioId")) return true;
      else return false;
    },
   
  },
  methods: {
    ...mapMutations(["addUsuario"]),
    ...mapMutations(["addCartao"]),
    usuario() {
      if (localStorage.getItem("usuarioId")) {
        this.$http
          .get(`/cliente/${localStorage.getItem("usuarioId")}`)
          .then((res) => {
           
            this.salvaUsuario(res.data.cliente[0]);
            this.salvaEndereco(res.data.endereco);
            this.salvaCartao(res.data.cartao);
            this.salvarCashBack(res.data.cashback[0])
          });
      }
    },
    salvaUsuario(data) {
      this.addUsuario(data);
    },
    salvaEndereco(data) {
      this.$store.state.dadosEndereco = data;
    },
    salvaCartao(data) {
      this.$store.state.cartoes = [];

      data.forEach((cart) => {
        this.addCartao({
          id: cart.cart_id,
          nome: cart.cart_nome,
          numero: cart.cart_numero,
          cvv: cart.cart_cvv,
          data_validade: cart.cart_data_validade,
          bandeira: 2,
        });
      });
    },
    salvarCashBack(data){
      this.$store.state.valeTroca = data.valor;
    }
  },
};
</script>
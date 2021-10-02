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
    this.$store.state.perfil = "usuario";
    await this.usuario();
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
            console.log("RES", res)
            this.salvaUsuario(res.data.cliente[0]);
            this.salvaEndereco(res.data.endereco);
            this.salvaCartao(res.data.cartao);
            this.salvarCashBack(res.data.cashback[0])
          });
      }
    },
    salvaUsuario(data) {
      this.addUsuario(data);
      console.log("User", this.$store.state.usuario)
    },
    salvaEndereco(data) {
      console.log("FDp", data)
      this.$store.state.dadosEndereco = data;
    },
    salvaCartao(data) {
      this.$store.state.cartoes = [];
      data.forEach((cart) => {
        this.addCartao({
          id: cart.id,
          nome: cart.nome,
          numero: cart.numero,
          cvv: cart.cvv,
          data_validade: cart.data_validade,
          bandeira: 2,
        });
      });
    },
    salvarCashBack(data){
      this.$store.state.valeTroca = data.valor;
      console.log("MERDA", this.$store.state.valeTroca)
    }
  },
};
</script>
<template>
  <v-container fluid>
    <v-row style="margin-top: 120px">
      <v-col>
        <v-btn
          @click="componente = 'login'"
          :class="[
            componente == 'login' ? 'ativado' : 'desativado'
          ]"
          target="_blank"
          text
        >
          <span>Entrar</span>
        </v-btn>
        <v-btn
          @click="componente = 'cadastro'"
          :class="[
            componente == 'cadastro' ? 'ativado' : 'desativado'
          ]"
          target="_blank"
          text
        >
          <span>Cadastre-se</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-card :class="[
            componente == 'cadastro' ? 'cadastro' : 'login'
          ]">
      <keep-alive>
        <component :is="componente"></component>
      </keep-alive>
    </v-card>
  </v-container>
</template>
<script>
import cadastro from "../components/pages/usuario/cadastro.vue";
import login from "../components/pages/usuario/login.vue";
export default {
  components: {
    cadastro,
    login,
  },
  data() {
    return {
      componente: "cadastro",
    };
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

.cadastro{
  border: 1px solid #b38b57;
  /* box-shadow: 0 0 1em #b38b57 !important; */
}
.login{
  border: 2px solid #b38b57;
  /* box-shadow: 0 0 1em #b38b57 !important;  */
}
</style>
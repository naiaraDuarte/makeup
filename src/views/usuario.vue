<template>
  <v-container fluid>
    <v-row style="margin-top: 120px">
      <v-col>
        <v-btn @click="componente = 'login'" target="_blank" text>
          <span>Entrar</span>
        </v-btn>
        <v-btn @click="componente = 'cadastro'" target="_blank" text>
          <span>Cadastre-se</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-card elevation="3">
        <component :is="componente"></component>
    </v-card>
  </v-container>
</template>
<script>
import cadastro from '../components/pages/usuario/cadastro.vue';
import login from '../components/pages/usuario/login.vue';
export default {
    components: {
        cadastro,
        login
    },
    data(){
        return {
            componente: "cadastro"
        }
    }

};
</script>
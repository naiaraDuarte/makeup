<template>
  <v-container fluid>
    <h2 class="cor-letra text-center mt-5 pt-5">
      Nos forneça seus dados de acesso...
    </h2>
    <v-row class="mx-3 my-3 centraliza">
      <v-col lg="5">
        <v-text-field
          v-model="emailCliente"
          :counter="30"
          label="Digite seu email"
          required
        ></v-text-field>

        <v-text-field
          v-model="senhaCliente"
          :type="show3 ? 'text' : 'password'"
          :counter="30"
          label="Digite sua senha"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center" lg="12" md="" sm="" col="5">
        <v-btn
          elevation="0"
          text
          class="btnSubmit"
          @click="entrar"
        >
          Entrar</v-btn
        >
        {{ mensage }}
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      emailCliente: "",
      senhaCliente: "",
      mensage: "",
    };
  },
  methods: {
    validacaoDePreenchimento() {
      if (this.emailCliente != "" && this.senhaCliente != "") {
        this.mensage = "";
        return true;
      }
      this.mensage = "Campos incompletos!!!";
      return false;
    },
    entrar(){
      if(this.validacaoDePreenchimento()){
        this.$router.push("/");
      }
  }
  },

};
</script>

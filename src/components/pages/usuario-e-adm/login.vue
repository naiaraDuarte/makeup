<template>
  <v-container fluid>
    <h2 class="cor-letra text-center mt-5 pt-5">
      Nos forneça seus dados de acesso...
    </h2>
    <v-row class="mx-3 my-3 centraliza">
      <v-col lg="5">
        <v-text-field
          v-model="emailCliente"
          label="Digite seu email"
          required
        ></v-text-field>

        <v-text-field
          v-model="senhaCliente"
          :type="show3 ? 'text' : 'password'"
          label="Digite sua senha"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center mb-5" lg="12" md="" sm="" col="5">
        <v-btn elevation="0" text class="btnSubmit" @click="entrar">
          Entrar</v-btn
        >
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      <h4 style="font-weight: 100">{{ mensagem }}</h4>

      <template v-slot:action="{ attrs }">
        <v-btn text icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      show3: false,
      emailCliente: "",
      senhaCliente: "",
      mensagem: "",
      snackbar: false,
      snackbarColor: "",
    };
  },
  methods: {
    validacaoDePreenchimento() {
      if (this.emailCliente != "" && this.senhaCliente != "") {
        this.mensage = "";
        return true;
      }
      this.snackbarColor = "red";
      this.mensagem = "Campos incompletos";
      this.snackbar = true;
      return false;
    },
    entrar() {
      if (this.validacaoDePreenchimento()) {
        this.$router.push("/adm");
      }
    },
    validarCredenciais(){
      
    }
  },
};
</script>

<template>
  <v-container fluid>
    <h2 class="cor-letra text-center mt-5 pt-5">
      Nos forneça seus dados de acesso...
    </h2>
    <v-row class="mx-3 my-3 centraliza">
      <v-col lg="5">
        <v-text-field
          v-model="email"
          v-on:keyup.enter="entrar"
          label="Digite seu email"
          required
        ></v-text-field>

        <v-text-field
          v-model="senha"
          v-on:keyup.enter="entrar"
          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show3 ? 'text' : 'password'"
          label="Digite sua senha"
          @click:append="show3 = !show3"
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
      email: "",
      senha: "",
      mensagem: "",
      snackbar: false,
      snackbarColor: "",
    };
  },
  methods: {
    validacaoDePreenchimento() {
      if (this.email != "" && this.senha != "") {
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
        let usuarios = this.$store.state.usuario;
        let usuario = usuarios.filter(
          (usuario) =>
            usuario.email == this.email && usuario.senha == this.senha
        );
         console.log("usuario", usuario);
        if (usuario[0]) {
         
          if (usuario[0].perfil == "adm") {
            this.$router.push("/adm");
          }
        } else if (usuario[0] == null) {
          let frm = {
            email: this.email,
            senha: this.senha,
          };

          this.$http
            .post(`/cliente/login`, frm)
            .then((res) => {
              console.log("FUNCIONOU", res);
              frm.id = res.data.cliente[0].id;
              localStorage.setItem("usuarioId", frm.id);
              this.$store.state.cadastro = true;
              this.$router.push(`/`);
            })
            .catch((e) => {
              console.log("Entrou aqui", e);
            });
        } else {
          this.snackbarColor = "red";
          this.mensagem = "Login ou senha não conferem";
          this.snackbar = true;
        }

        // let usuarios = this.$store.state.usuario;
        // let usuario = usuarios.filter(
        //   (usuario) =>
        //     usuario.email == this.email && usuario.senha == this.senha
        // );
        // if (usuario[0]) {
        //   console.log(usuario);
        //   if (usuario[0].perfil == "adm") {
        //     this.$router.push("/adm");
        //   } else {
        //     this.$store.state.cadastro = true;
        //     this.$router.push(`/`);
        //   }
        // } else {
        //   this.snackbarColor = "red";
        //   this.mensagem = "Login ou senha não conferem";
        //   this.snackbar = true;
        // }
      }
    },
  },
};
</script>

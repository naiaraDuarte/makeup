<template>
  <v-container fluid>
    <h1>Pagamento</h1>
    <v-row class="mt-5 mx-4 pt-5">
      <v-col lg="6">
        <v-text-field
          v-model="numeroCartao"
          :counter="10"
          label="Digite o numero do seu cartão de credito"
          required
        ></v-text-field>
      </v-col>
      <v-col lg="6">
        <v-text-field
          v-model="nomeCartao"
          :counter="10"
          label="Digite o nome no seu cartão de credito"
          required
        ></v-text-field>
      </v-col>

    </v-row>
    <v-row class="mt-5 mx-4 pt-5">
      <v-col lg="6">
        <v-text-field
          v-model="codCartao"
          :counter="3"
          label="Digite o codigo de segurança"
          required
        ></v-text-field>
      </v-col>
      <v-col lg="6">
        <v-combobox
          v-model="bandeiraCartao"
          :items="itemsBandeiraCartao"
          label="Bandeira do cartão"
          required
        >
        </v-combobox>
      </v-col>
      <v-col class="text-right" lg="12" md="" sm="" col="5">
        <v-btn
          elevation="0"
          text
          class="btnSubmit"
          >
          Salvar</v-btn>
        {{ mensage }}
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      nomeCartao: "",
      bandeiraCartao: "",
      itemsBandeiraCartao: ["MasterCard", "Visa", "Elo"],
      codCartao:"",
      numeroCartao: ""
    };
  },
  methods: {},
};
</script>
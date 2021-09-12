<template>
  <v-container style="width: 1200px" fluid>
    <v-card elevation="0" class="mt-5">
      <h1 class="nameTable mx-2">
        <v-icon x-large>mdi-chevron-double-right</v-icon> Cupons
      </h1>
      <v-row class="mt-5 mx-5">
        <v-col lg="6">
          <v-text-field
            v-model="cupom"
            class="cupom-input"
            label="Cupom"
            id="cupom"
            required
          ></v-text-field>
        </v-col>
        <v-col lg="3">
          <v-combobox
            v-model="tipoDesconto"
            :items="itensTipoDesconto"
            label="Tipo de Desconto"
            id="tipoDesconto"
          ></v-combobox>
        </v-col>
        <v-col lg="3">
          <v-text-field
            v-model="porcen"
            label="Porcentagem de desconto"
            v-mask="['#%', '##%', '##,#%', '##,##%']"
            id="porcen"
            required
          ></v-text-field>
        </v-col>
        <v-col lg="12" class="mb-2 alinhamento">
          <v-btn color="primary mr-5" @click="gerar"> Gerar Cupom </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      cupom: "",
      porcen: "",
      tipoDesconto: "",
      itensTipoDesconto: ["Na compra", "Frete"],
    };
  },
  methods: {
    ...mapMutations(["addCupons"]),
    gerar() {
      let frm = {
        cod: this.cupom.toUpperCase(),
        porcen: parseInt(this.porcen.replace("%", "")),
        tipo: this.tipoDesconto,
      };
      this.addCupons(frm);
      console.log(this.$store.state.cupons)
    },
  },
};
</script>
<style>
.cupom-input input {
  text-transform: uppercase;
}
.alinhamento {
  display: flex;
  justify-content: flex-end;
}
</style>
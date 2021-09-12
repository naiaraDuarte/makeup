<template>
  <v-container style="width: 1200px" fluid>
    <v-card elevation="0" class="mt-5">
      <h1 class="nameTable mx-2">
        <v-icon x-large>mdi-chevron-double-right</v-icon> Cupons
      </h1>
      <v-row class="mt-5 mx-5">
        <v-col lg="3">
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
        <v-col lg="3">
          <v-text-field
            v-model="quant"
            label="Quantidade de cupons"
            v-mask="['######']"
            type="number"
            id="quant"
            required
          ></v-text-field>
        </v-col>
        <v-col lg="12" class="mb-2 alinhamento">
          <v-btn color="primary mr-5" @click="gerar"> Gerar Cupom </v-btn>
        </v-col>
      </v-row>
      <h4>Cupons Cadastrados</h4>
       <v-row class="mt-3">
        <v-col lg="3" v-for="(item, i) in this.$store.state.cupons" :key="i">
          <v-card elevation="0" class="card-cartao p-2">
            
            <v-row>
              <v-col lg="8">
                <v-row>
                  <v-col lg="12" color="blue">
                    <span>
                      <b>{{ item.cod }}</b>
                    </span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col lg="12" color="red">
                    <span
                      ><b>{{ item.tipo }}</b></span
                    >
                  </v-col>
                </v-row>
              </v-col>
              <v-col lg="4">
                <span
                  ><b>{{ item.porcen }}</b></span
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>  
        
     
    </v-card>

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
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      cupom: "",
      porcen: "",
      tipoDesconto: "",
      snackbarColor: "",
      mensagem: "",
      snackbar: "",
      quant: 0,
      itensTipoDesconto: ["Na compra", "Frete"],
    };
  },
  methods: {
    ...mapMutations(["addCupons"]),
    gerar() {
      if (
        this.cupom == "" ||
        this.porcen == "" ||
        this.tipoDesconto == "" ||
        this.quant == null ||
        this.quant == 0
      ) {
        this.exibeSnackBar("#b38b57", "Todos os campos devem ser preechidos");
        return false;
      }
      let frm = {
        cod: this.cupom.toUpperCase(),
        porcen: parseInt(this.porcen.replace("%", "")),
        tipo: this.tipoDesconto,
        quant: this.quant,
      };
      this.addCupons(frm);
      this.exibeSnackBar("green", "Cupom adicionado");
      console.log(this.$store.state.cupons);
    },
    exibeSnackBar(cor, msg) {
      this.snackbarColor = cor;
      this.mensagem = msg;
      this.snackbar = true;
    },
    // getCupom(){
    //   this.cupons

    // },
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
.card-cartao {
  border: 2px solid #bbb !important;
}
.marcado {
  border: 2px solid #b38b57 !important;
}
.desmarcado {
  border: 2px solid #bbb !important;
}
</style>
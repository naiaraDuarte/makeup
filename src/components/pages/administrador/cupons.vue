<template>
  <v-container style="width: 1200px" fluid>
    <v-card elevation="0" class="mt-5">
      <v-row>
        <v-col lg="12" class="alinhamento">
          <v-btn color="primary mr-5" @click="gerar"
            ><v-icon class="pr-2" small>mdi-plus</v-icon> Add Cupom
          </v-btn>
        </v-col>
      </v-row>

      <v-card elevation="0">
        <v-card-title>
          <h2 class="nameTable">
            <v-icon x-large>mdi-chevron-double-right</v-icon> Cupons
          </h2>

          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="this.$store.state.cupons"
          locale="pt-br"
          :search="search"
        >
          <template v-slot:[`item.acoes`]="{ item }">
            <v-row align="center" class="mx-0 mr-4">
              <v-btn  id="editarCupom" @click="getCupom(item.cod)" icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn id="deletarCupom" @click="removeCupom(item.acoes)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-table>
        <v-row class="mt-1 mx-3 my-3">
          <v-col lg="12"> </v-col>
        </v-row>
      </v-card>
    </v-card>
    <v-dialog v-model="gerarCupom" persistent max-width="900px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Gerar cupom</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col lg="6">
              <v-text-field
                v-model="cupom"
                class="cupom-input"
                label="Cupom"
                id="cupom"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6">
              <v-combobox
                v-model="tipoDesconto"
                :items="itensTipoDesconto"
                label="Tipo de Desconto"
                id="tipoDesconto"
              ></v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col lg="6">
              <v-text-field
                v-model="porcen"
                label="Porcentagem de desconto"
                v-mask="['#%', '##%', '##,#%', '##,##%']"
                id="porcen"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6">
              <v-text-field
                v-model="quant"
                label="Quantidade de cupons"
                v-mask="['######']"
                type="number"
                id="quant"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="0"
            color="white"
            class="btnSubmit"
            @click="gerarCupom = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="0"
            color="white"
            class="btnSubmit"            
            @click="editarCupom"
            v-if="id != null"
          >
            Salvar
          </v-btn>
          <v-btn
            elevation="0"
            color="white"
            class="btnSubmit"
            @click="salvarCupom"
            v-else
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      search: "",
      itensTipoDesconto: ["Na compra", "Frete"],
      gerarCupom: false,
      cod: "",
      id: null,
      headers: [
        { text: "Codigo", value: "cod" },
        { text: "Tipo Desconto", value: "tipo" },
        { text: "Percentual", value: "porcen" },
        { text: "Quantidade", value: "quant" },
        { text: "Ações", value: "acoes" },
      ],
    };
  },
  methods: {
    ...mapMutations(["addCupons"]),
    ...mapMutations(["editarCupons"]),
    ...mapMutations(["removeCupons"]),
    
    gerar() {
      this.gerarCupom = !this.gerarCupom;
    },
    limparCampos(){
      this.cupom = "";
      this.tipoDesconto = "";
      this.quant = 0;
      this.porcen = 0;

    },
    removeCupom(cod){      
      this.removeCupons(cod);
      this.exibeSnackBar("green", "Cupom removido");
    },
    salvarCupom() {
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
      this.limparCampos();

      this.gerarCupom = !this.gerarCupom;
      console.log(this.$store.state.cupons);
    },
    exibeSnackBar(cor, msg) {
      this.snackbarColor = cor;
      this.mensagem = msg;
      this.snackbar = true;
    },
    editarCupom() {
      let frm = {
        cod: this.cupom,
        quant: this.quant,
        porcen: parseInt(this.porcen.replace("%", "")),
        tipo: this.tipoDesconto,
      };
      this.editarCupons(frm);
      this.id = null;
      this.limparCampos();
      this.gerarCupom = !this.gerarCupom;
      this.exibeSnackBar("green", "Cupom editado");
    },
    getCupom(cod) {
      this.gerarCupom = !this.gerarCupom;
      this.id = cod;

      let cupom = this.$store.state.cupons.filter((cupom) => cupom.cod == cod);
      cupom = cupom[0];
      this.cupom = cupom.cod;
      this.porcen = cupom.porcen;
      this.quant = cupom.quant;
      this.tipoDesconto = cupom.tipo;
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
  justify-content: end;
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
.alinhamento {
  display: flex;
  justify-content: end;
}
</style>
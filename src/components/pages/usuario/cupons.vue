<template>
  <v-container fluid>
    <p class="mb-3 tituloModalCarrinho">
      <v-icon class="pb-1" large>mdi-chevron-double-right</v-icon>Cupons
    </p>
    <v-row class="mt-3">
      <v-col lg="3" v-for="(item, i) in this.$store.state.cupons" :key="i">
        <v-card elevation="0" class="card-cartao p-2 cashback">
          <v-row>
              <v-col lg="8" class="centraliza flex-column">
                <span>
                  <b>{{ item.cod }}</b>
                </span>
                <span
                  >{{ item.tipo }}</span
                >
              </v-col>
              <v-divider vertical></v-divider>
              <v-col lg="4" class="centraliza">
                <span class="valor-cupom"
                  >{{ item.porcen }} %</span
                >
              </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col lg="3">
        <v-card elevation="0" class="card-cartao p-2 cashback">
          <v-row>
            <v-col lg="6" class="centraliza">
              <h4>Cashback</h4>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col lg="6" class="centraliza">
              <p class="valor">{{ $n(cashback, "currency") }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      cashback: 0,
    };
  },
  mounted() {
    this.getCashback();
    this.getCupom();
  },
  computed: {
    cupomTroca() {
      let valor = 0;
      this.$store.state.valeTroca.forEach((cupom) => {
        valor += parseFloat(cupom);
      });
      return valor;
    },
  },
  methods: {
    getCashback() {
      this.$http
        .get(`/cashback/${localStorage.getItem("usuarioId")}`)
        .then((res) => {
          this.cashback += res.data.cashback[0].valor;
        });
    },
    getCupom() {
      this.$http.get(`/cupom/`).then((res) => {
        this.$store.state.cupons = res.data.dados;
      });
    },
  },
};
</script>
<style>
.cashback {
  padding: 5%;
}
.valor {
  /* font-weight: 700; */
  color: green;
}

.valor-cupom{
  font-weight: 500;
    font-size: 23px;
    color: green;
}

.flex-column{
  flex-direction: column;
  padding: 6%;
}
</style>
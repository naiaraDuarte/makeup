<template>
  <v-container fluid>
    <h1>Cupons do cliente </h1>
    <!-- {{ $store.state.valeTroca }} -->
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
      <v-divider vertical></v-divider>
      <v-col lg="3">
        <v-card elevation="0" class="card-cartao p-2">
          <v-row>
            <v-col lg="12">
              <p>Cupom de Troca</p>
              <p>{{ $n(cupomTroca, "currency") }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  computed: {
    cupomTroca() {
      let valor = 0;
      this.$store.state.valeTroca.forEach((cupom) => {
        valor += parseFloat(cupom);
      });
      return valor;
    },
  },
};
</script>
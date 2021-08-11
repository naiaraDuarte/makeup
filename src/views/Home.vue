<template>
  <div>
    <v-container fluid>
      <v-row style="margin-top: 150px">
        <v-col lg="2" class="px-2" v-for="(item, i) in 28" :key="i">
          <v-card elevation="0">
            <v-img
              v-if="i % 2 == 0"
              src="../assets/images/baseRuby.jpeg"
              class="w-100"
              max-height="150"
              max-width="300"
            ></v-img>
            <v-img
              v-if="i % 2 == 1"
              src="../assets/images/rimel.png"
              class="w-100"
              max-height="150"
              max-width="300"
            ></v-img>
            Dados da imagem
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",

  components: {},
};
</script>

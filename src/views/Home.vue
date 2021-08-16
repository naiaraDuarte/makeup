<template>
  <div class="teste">
    <v-container fluid>
      <v-row style="margin-top: 0px" v-if="itens.length > 0">
        <v-col lg="2" class="px-2" v-for="(item, i) in itens" :key="i">
          <v-card elevation="0">
            <v-img
              :src="getImgUrl(item.src)"
              class="w-100"
              max-height="150"
              max-width="300"
            /><v-img />
            Dados da imagem
          </v-card>
        </v-col>
      </v-row>
      <button @click="imagens">Click aqui</button>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      itens: [],
    };
  },
  components: {},
  created() {
    for (let index = 0; index < 15; index++) {
      let x = Math.floor(Math.random() * 11 + 1);
      console.log(`../assets/images/produto${x}.jpeg`);
      this.itens.push({ src: `produto${x}.jpeg` });
    }
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/images/" + pic);
    },
  },
};
</script>
<style>
.teste {
  /* background-image: url("../assets/images/produto2.png"); */
}
</style>

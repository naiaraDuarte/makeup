<template>
  <div class="teste">
    <v-container fluid>
      <v-row style="margin-top: 0px" v-if="itens.length > 0">
        <v-col lg="3" class="px-2" v-for="(item, i) in itens" :key="i">
          <v-card :loading="loading" class="mx-auto my-12" max-width="374">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img height="250" :src="getImgUrl(item.src)"></v-img>

            <v-card-title>
              <v-row>
                <v-col lg="6">
                  <p class="titulo-card">Cafe Badilico</p>
                </v-col>
                <v-col lg="6">
                  <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>

                  <!-- <div class="grey--text ms-1">4.5 (413)</div> -->
                </v-col>
              </v-row>
            </v-card-title>

            <v-card-text>
              <div class="text-center">
              <h4 class="preco"><b>R$ 49,00</b></h4> 
              <p>Até <b>2x</b> de <b>R$24,95</b></p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn style="width: 100%" class="btnCarrinho white--text" color="#b38b57" @click="reserve">
                <v-icon color="white" class="pr-3">mdi-cart-variant</v-icon
                > Add ao carrinho
              </v-btn>
            </v-card-actions>
          </v-card>
          <!-- <v-card elevation="0">
            <v-img
              :src="getImgUrl(item.src)"
              class="w-100"
              max-height="150"
              max-width="300"
            /><v-img />
            Dados da imagem
          </v-card> -->
        </v-col>
      </v-row>
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
.titulo-card{
  font-size: 18px;
}
.preco{
  font-size: 20px;
  font-weight: bold;
  color: black;
}
.teste {
  /* background-image: url("../assets/images/produto2.png"); */
}
</style>

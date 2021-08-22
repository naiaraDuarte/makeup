<template>
  <div class="teste">
    <v-container fluid>
      <v-row style="margin-top: 0px" v-if="itens.length > 0">
        <v-col class="px-2 custom5cols" v-for="(item, i) in itens" :key="i">
          <v-card class="mx-auto my-12">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-img height="200" :src="getImgUrl(item.src)"></v-img>

            <v-card-title>
              <v-row>
                <v-col lg="12" class="text-center">
                  <v-rating
                    :value="4.5"
                    color="#deb887"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>

                  <p class="titulo-card">BASE FEELS CASTANHA 20 - RUBY ROSE</p>
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
              <v-row class="pb-1">
                <v-col lg="12" class="p-0">
                  <v-btn outlined color="#b38b57" class="btnCarrinho" style="width: 100%;"
                    ><v-icon color="b38b57" class="pr-3 w-100"
                      >mdi-cart-variant</v-icon
                    >Comprar</v-btn
                  >
                </v-col>
                <!-- <v-col lg="3" class="p-0">
                  <v-btn icon><v-icon color="#b38b57">mdi-heart-outline</v-icon></v-btn>
                </v-col> -->
              </v-row>

              <!-- <v-btn
                style="width: 100%"
                class="btnCarrinho white--text"
                color="#b38b57"
              >
                <v-icon color="white" class="pr-3">mdi-cart-variant</v-icon> Comprar
              </v-btn> -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-fab-transition>
        <!-- <v-btn color="pink" dark absolute right fab> -->

        <v-btn class="fixedbutton" color="pink" dark fab>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
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
.titulo-card {
  font-size: 13px;
  text-transform: uppercase;
}
.preco {
  font-size: 20px;
  font-weight: bold;
  color: black;
}
.teste {
  /* background-image: url("../assets/images/produto2.png"); */
}
.v-application p {
  margin-bottom: 0px;
}
.v-card__title {
  line-height: 1rem;
}
.custom5cols {
  width: 20%;
  max-width: 20%;
  flex-basis: 20%;
}
.btnCarrinho{
  font-weight: 600;
}

.fixedbutton {
    position: fixed;
    top: 650px;
    right: 60px; 
}
</style>

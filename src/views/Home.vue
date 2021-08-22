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
                  <v-btn
                    outlined
                    color="#b38b57"
                    class="btnCarrinho"
                    style="width: 100%"
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
      <!-- <v-btn color="pink" dark absolute right fab> -->
      <!-- <v-hover v-slot="{ hover }">
        <v-btn class="fixedbutton" color="pink" dark>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-card
          v-if="hover"
          :loading="loading"
          class="mx-auto my-12"
          max-width="374"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>Cafe Badilico</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">4.5 (413)</div>
            </v-row>

            <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

            <div>
              Small plates, salads & sandwiches - an intimate setting with 12
              indoor seats plus patio seating.
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Tonight's availability</v-card-title>

          <v-card-text>
            <v-chip-group
              v-model="selection"
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip>5:30PM</v-chip>

              <v-chip>7:30PM</v-chip>

              <v-chip>8:00PM</v-chip>

              <v-chip>9:00PM</v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="reserve">
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-hover> -->
      <v-hover v-slot="{ hover }">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-img
            :aspect-ratio="16 / 9"
            src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
          >
            <v-expand-transition>
              <div
                v-if="hover"
                class="
                  d-flex
                  transition-fast-in-fast-out
                  orange
                  darken-2
                  v-card--reveal
                  text-h2
                  white--text
                "
                style="height: 100%"
              >
                $14.99
              </div>
            </v-expand-transition>
          </v-img>
          <v-card-text class="pt-6" style="position: relative">
            <v-btn
              absolute
              color="orange"
              class="white--text"
              fab
              large
              right
              top
            >
              <v-icon>mdi-cart</v-icon>
            </v-btn>
            <div class="font-weight-light grey--text text-h6 mb-2">
              For the perfect meal
            </div>
            <h3 class="text-h4 font-weight-light orange--text mb-2">
              QW cooking utensils
            </h3>
            <div class="font-weight-light text-h6 mb-2">
              Our Vintage kitchen utensils delight any chef.<br />
              Made of bamboo by hand
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
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
.btnCarrinho {
  font-weight: 600;
}

.fixedbutton {
  position: fixed;
  top: 650px;
  right: 60px;
}
</style>

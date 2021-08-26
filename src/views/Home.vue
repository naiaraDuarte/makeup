<template>
  <div class="teste">
    <v-container>
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
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-speed-dial
      id="create"
      width="800"
      class="fixedbutton"
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="#b38b57"
          @click="sheet = true"
          style="float: right"
          class="fixedbutton"
          dark
          fab
        >
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-cart </v-icon>
        </v-btn>
      </template>
      <v-bottom-sheet v-model="sheet">
        <v-card class="carrinho text-center" height="500" width="300">
          <p class="tituloModalCarrinho mt-2">Produtos escolhidos</p>

          <v-row>
            <v-col lg="12" class="mt-3">
              <v-card elevation="0">
                <p>Nome do produto</p>
                <v-row class="mt-1">
                  <v-col lg="6">
                    <p>R$ 49,90</p>
                  </v-col>
                  <v-col lg="6">
                    <v-btn icon x-small>
                      <v-icon v-if="fab"> mdi-close </v-icon>
                    </v-btn>
                    <input type="text" />
                    <v-btn icon x-small>
                      <v-icon v-if="fab"> mdi-close </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-bottom-sheet>
    </v-speed-dial>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      itens: [],
      eventoDeMouse: false,
      sheet: false,
      direction: "top",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition",
    };
  },
  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    },
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
  bottom: 40px;
  right: 40px;
  transition: 1s;
}
.fixedContainer {
  position: fixed;
  bottom: 120px;
  right: 30px;
  transition: 1s;
  border: 2px solid #b38b57 !important;
}
.carrinho {
  position: fixed;
  bottom: 100px;
  right: 40px;
  transition: 1s;
  /* border: 2px solid #b38b57 !important; */
  border-radius: 10px !important;
}
.tituloModalCarrinho {
  font-size: 20px;
}

@keyframes fixedContainer {
  from {
    opacity: 0;
    transform: translate3d(0, 650px, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 580px, 0);
  }
}

#create .v-speed-dial {
  /* position: absolute; */
}

#create .v-btn--floating {
  position: relative;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>

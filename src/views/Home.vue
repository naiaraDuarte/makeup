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

                  <p class="titulo-card">{{ item.nome }}</p>
                </v-col>
              </v-row>
            </v-card-title>

            <v-card-text>
              <div class="text-center">
                <h4 class="preco">
                  <b>{{ item.preco }}</b>
                </h4>
                <p>
                  Até <b>2x</b> de
                  <b>{{ $n(parseFloat(item.preco) / 2, "currency") }}</b>
                </p>
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
                    @click="addProduto(item)"
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
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      <h4 style="font-weight: 100">{{ mensagem }}</h4>
      <template v-slot:action="{ attrs }">
        <v-btn text icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
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
              <v-card
                elevation="0"
                v-for="(item, i) in $store.state.carrinho"
                :key="i"
              >
                <p>{{ item.nome }}</p>
                <v-row class="mt-1">
                  <v-col lg="3">
                    <p>{{ item.preco }}</p>
                  </v-col>
                  <v-col lg="9">
                    <v-btn icon x-small>
                      <v-icon v-if="fab"> mdi-plus </v-icon>
                    </v-btn>
                    <input type="text" />
                    <v-btn icon x-small>
                      <v-icon v-if="fab"> mdi-minus </v-icon>
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
import { mapMutations } from "vuex";
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
      snackbar: false,
      snackbarColor: "",
      mensagem: "",
      transition: "slide-y-reverse-transition",
      nomeItens: [
        "nenhum",
        "Base Ruby rose",
        "Rímel áqua ruby rose",
        "Primer fecha póros - Ruby rose",
        "kit tratamento pra pele",
        "hidratante para região dos olhos",
        "fix plus - ruby rose",
        "Serum - ruby rose",
        "Corretivo - mi amor",
        "pó translucido - luisance",
        "Delineador ultra fino - Eudora",
        "lápis de olho - avon",
      ],
      precosItens: [
        "",
        "25.90",
        "18.90",
        "29.90",
        "59.90",
        "45.99",
        "52.90",
        "17.80",
        "32.80",
        "24.20",
        "17.70",
        "9.99",
      ],
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
      this.itens.push({
        cod: index,
        src: `produto${x}.jpeg`,
        nome: this.nomeItens[x],
        preco: this.precosItens[x],
      });
    }
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/images/" + pic);
    },
    ...mapMutations(["addCarrinho"]),
    addProduto(item) {
      this.addCarrinho(item);
      this.exibeSnackBar("#b38b57", "Seu produto foi add ao carrinho");
      console.log(this.$store.state.carrinho);
    },
    exibeSnackBar(cor, msg){
      this.snackbarColor = cor;
      this.mensagem = msg;
      this.snackbar = true;
    }
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

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
    </v-speed-dial>

    <v-bottom-sheet v-model="sheet" v-if="sheet">
      <v-card class="carrinho text-center" height="500" width="300">
        <p class="tituloModalCarrinho mt-2" v-if="$store.state.carrinho.length > 0">Produtos escolhidos</p>
        <p class="tituloModalCarrinho mt-2" v-else >Você ainda não add nenhum produto, mas ó, assim que add ele aparecerá aqui, viu?</p>

        <v-row>
          <v-col lg="12" class="mt-3">
            <v-card elevation="0" class="px-2">
              <v-row v-for="(item, i) in $store.state.carrinho" :key="i">
                <v-col>
                  <p v-if="item.qtd != 0">{{ item.nome }}</p>
                  <v-row v-if="item.qtd != 0" class="mt-1">
                    <v-col lg="4">
                      <p>{{ item.preco }}</p>
                    </v-col>
                    <v-col lg="8">
                      <v-row>
                        <v-col col="1">
                          <v-btn
                            icon
                            small
                            elevation="1"
                            id="menos"
                            @click="atualizarCarrinho(item, 'sub')"
                          >
                            <v-icon> mdi-minus </v-icon>
                          </v-btn>
                          
                        </v-col>
                        <v-col col="4">
                          <p>{{ item.qtd }}</p>
                          <!-- <v-text-field
                        v-model="qtdProdutos"
                        solo
                        dense
                      ></v-text-field> -->
                        </v-col>
                        <v-col col="1">
                          <v-btn
                            icon
                            small
                            elevation="1"
                            id="mais"
                            @click="atualizarCarrinho(item, 'add')"
                          >
                            <v-icon> mdi-plus </v-icon>
                          </v-btn>
                          
                        </v-col>
                        <v-col col="2">
                          <v-btn
                            icon
                            small
                            elevation="0"
                            @click="removeItem(item)"
                          >
                            <v-icon> mdi-close </v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="px-2" v-if="$store.state.carrinho.length > 0">
          <v-col>
            <v-btn color="#b38b57" class="white--text btn-total" @click="redireciona">
              finalizar compra ({{ $n(parseFloat(total), "currency") }})
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import jsFunctions from "../assets/js/jsFunctions";
import { mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      itens: [],
      itensBase: [],
      qtdProdutos: 0,
      total: 0,
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
    "$store.state.busca": function () {
      let busca = this.$store.state.busca;
      if (busca == "" || busca == null) {
        this.itens = this.itensBase;
        return null;
      }
      this.itens = this.itens.filter(function (string) {
        return jsFunctions
          .accentsTidy(string.nome)
          .includes(jsFunctions.accentsTidy(busca));
      });
    },
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
  activated() {
    if (localStorage.getItem("usuarioId")) {
      this.$store.state.cadastro = true;
      return true;
    } else {
      this.$store.state.cadastro = false;
      return false;
    }
  },
  mounted() {
    if (this.$store.state.carrinho.length > 0) {
      this.$store.state.carrinho.forEach((item) => {
        this.total += item.qtd * item.preco;
      });
    }
    if (localStorage.getItem("usuarioId")) {
      this.$store.state.cadastro = true;
      return true;
    } else {
      this.$store.state.cadastro = false;
      return false;
    }
  },
  components: {},
  created() {
    for (let index = 0; index < 15; index++) {
      let x = Math.floor(Math.random() * 11 + 1);
      this.itens.push({
        cod: index,
        src: `produto${x}.jpeg`,
        nome: this.nomeItens[x],
        preco: this.precosItens[x],
        qtd: 1,
      });
    }
    this.itensBase = this.itens;
    this.$store.state.listaProdutos = this.itens;
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/images/" + pic);
    },
    ...mapMutations(["addCarrinho"]),
    ...mapMutations(["editarCarrinho"]),
    ...mapMutations(["removeItemCarrinho"]),
    removeItem(item){
      this.total -= parseFloat(item.preco) * item.qtd;
      item.qtd = 0;
      this.removeItemCarrinho(item.cod);
    },
    atualizarCarrinho(item, tipo) {
      let total = this.total;
      let pdt = this.$store.state.carrinho.filter((prod) => {
        let preco = parseFloat(prod.preco);
        if (item.cod == prod.cod) {
          if (tipo == "add") {
            total -= preco * prod.qtd;
            prod.qtd += 1;
            total += preco * prod.qtd;
          } else {
            if (prod.qtd == 0) {
              total -= preco;
              this.removeItemCarrinho(item.cod);
            } else {
              total -= preco;
              prod.qtd -= 1;
            }
          }
        }
      });
      this.total = total;
      this.editarCarrinho(pdt);
    },
    
    addProduto(item) {
      let index = this.$store.state.carrinho.findIndex(
        (pdt) => pdt.cod == item.cod
      );
      console.log(index);
      if (this.$store.state.carrinho.length == 0 || index == -1) {
        this.total += parseFloat(item.preco);
        this.addCarrinho(item);
        this.exibeSnackBar("#b38b57", "Seu produto foi add ao carrinho");
      } else {
        this.atualizarCarrinho(item, "add");
      }
    },
    redireciona(){
      this.$router.push(`/carrinho`);
    },
    exibeSnackBar(cor, msg) {
      this.snackbarColor = cor;
      this.mensagem = msg;
      this.snackbar = true;
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
.btn-total {
  width: 100%;
  font-weight: 500;
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

<template>
  <div class="teste">
    <v-container>
      <v-row>
        <v-col lg="12">
          <v-carousel
            cycle
            height="300"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(item, i) in imagens"
              :key="i"
              :src="getImgUrl(item)"
            >
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>

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

                  <p class="titulo-card" >{{ item.nome }}</p>
                </v-col>
              </v-row>
            </v-card-title>

            <v-card-text>
              <div class="text-center">
                <h4 class="preco">
                  <b>{{ $n(parseFloat(item.preco), "currency") }}</b>
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
    <!-- <v-snackbar v-model="snackbar" :color="snackbarColor">
      <h4 style="font-weight: 100">{{ mensagem }}</h4>
      <template v-slot:action="{ attrs }">
        <v-btn text icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar> -->
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
      <carrinho-flutuante :total="total"></carrinho-flutuante>
      <!-- <v-card
        class="carrinho text-center"
        :class="[$store.state.carrinho.length == 0 ? 'centraliza' : '']"
        height="500"
        width="300"
      >
        <p
          class="tituloModalCarrinho mt-2"
          v-if="$store.state.carrinho.length > 0"
        >
          Produtos escolhidos
        </p>
        <v-divider
          class="px-10 mx-10 mt-1"
          v-if="$store.state.carrinho.length > 0"
        ></v-divider>
        <p class="tituloModalCarrinho corTitulo pl-3 mt-2" v-else>
          Você ainda não adicionou nenhum produto, mas assim que adicionar, ele
          aparecerá aqui, viu?
        </p>

        <v-row >
          <v-col lg="12" class="mt-3">
            <v-card elevation="0" class="px-2 prod">
              <v-row v-for="(item, i) in $store.state.carrinho" :key="i">
                <v-col>
                  <p v-if="item.qtd != 0">{{ item.nome }}</p>
                  <v-row v-if="item.qtd != 0" class="mt-1">
                    <v-col lg="4">
                      <p>{{ $n(parseFloat(item.preco), "currency") }}</p>
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
            <v-btn
              color="#b38b57"
              class="white--text btn-total"
              @click="redireciona"
            >
              Ver meu carrinho ({{ $n(parseFloat(total), "currency") }})
            </v-btn>
          </v-col>
        </v-row>
      </v-card> -->
    </v-bottom-sheet>
  </div>
</template>

<script>
import jsFunctions from "../assets/js/jsFunctions";
import carrinhoFlutuante from '../components/ui/carrinhoFlutuante.vue';
import { mapMutations } from "vuex";

export default {
  name: "Home",
  components:  { carrinhoFlutuante },
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
      imagens: ["banner5.png", "banner4.png", "banner6.jpg", "banner7.jpg", "banner8.jpg", "banner9.jpg"],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
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
  created() {
    this.$http.get(`/produto/`).then((res) => {
      res.data.dados.forEach((prod) => {
        this.itens.push({
          id: prod.id,
          cod: prod.cod,
          src: prod.imagem,
          nome: prod.nome,
          preco: prod.preco,
          qtd: prod.quantidade,
        });
      });
    });
    this.itensBase = this.itens;
    this.$store.state.listaProdutos = this.itens;
  },
  methods: {
    getImgUrl(pic) {
      return require(`../assets/images/${pic}`);
    },
    ...mapMutations(["addCarrinho"]),
    ...mapMutations(["editarCarrinho"]),
    ...mapMutations(["removeItemCarrinho"]),
    removeItem(item) {
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
      if (this.$store.state.carrinho.length == 0 || index == -1) {
        this.total += parseFloat(item.preco);
        item.qtd = 1;
        this.addCarrinho(item);
        this.exibeSnackBar("#b38b57", "Seu produto foi add ao carrinho");
      } else {
        this.atualizarCarrinho(item, "add");
      }
    },
    redireciona() {
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
  height: 2vh;
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

.centraliza {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

#create .v-btn--floating {
  position: relative;
}

.corTitulo {
  color: grey;
  font-size: 16px !important;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.prod{
  overflow-y: scroll !important;
  overflow-x: hidden;
  height: 25vh !important;
}
.prod::-webkit-scrollbar {
  width: 3px;
}

.prod::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.prod::-webkit-scrollbar-thumb {
  background: #bbb;
}

.prod::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

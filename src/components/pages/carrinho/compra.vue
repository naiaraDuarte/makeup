<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card elevation="0">
          <p class="mb-3 tituloModalCarrinho">
            <v-icon class="pb-1" large>mdi-chevron-double-right</v-icon>Meu
            carrinho
          </p>
          <v-divider class="mb-5"></v-divider>
          <v-row v-if="$store.state.carrinho.length > 0">
            <v-col
              lg="12"
              class="px-2"
              v-for="(item, i) in $store.state.carrinho"
              :key="i"
            >
              <v-row v-if="item.qtd > 0" class="centraliza">
                <v-col lg="3">
                  <v-img
                    height="100"
                    width="100"
                    :src="getImgUrl(item.src)"
                  ></v-img>
                </v-col>
                <v-col lg="4">
                  <p>{{ item.nome }}</p>
                </v-col>
                <v-col lg="2">
                  <v-row>
                    <v-col lg="4">
                      <v-btn
                        icon
                        small
                        elevation="1"
                        @click="atualizarCarrinho(item, 'sub')"
                        id="menos"
                      >
                        <v-icon> mdi-minus </v-icon>
                      </v-btn>
                    </v-col>
                    <v-col lg="4">
                      <p>{{ item.qtd }}</p>
                    </v-col>
                    <v-col lg="4">
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
                  </v-row>
                </v-col>
                <v-col lg="2">
                  <h3>{{ $n(item.preco, "currency") }}</h3>
                </v-col>
                <v-col lg="1">
                  <v-btn icon small elevation="0" @click="removeItem(item)">
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <endereco v-show="false"></endereco>
              <v-divider></v-divider>
            </v-col>
            <v-col lg="12">
              <v-row>
                <v-col lg="8">
                  <v-row>
                    <v-col lg="4">
                      <p>Calcular o frete</p>
                      <p>estimados para a sua região</p>
                    </v-col>
                    <v-col lg="4">
                      <v-text-field
                        v-model="cep"
                        v-mask="['#####-###']"
                        label="CEP"
                        id="cep"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col lg="4">
                      <v-btn
                        color="primary"
                        @click="calculaFrete"
                        id="calcular"
                      >
                        Calcular
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col lg="4">
                  <v-card class="separa" elevation="0">
                    <p>{{ $store.state.carrinho.length }} Produtos</p>
                    <p>{{ $n(totalProdutos, "currency") }}</p>
                  </v-card>
                  <v-card class="separa" elevation="0">
                    <p>Frete</p>
                    <p>{{ $n(parseFloat(totalFrete), "currency") }}</p>
                  </v-card>
                  <v-divider></v-divider>
                  <v-card class="separa" elevation="0">
                    <h3>Total</h3>
                    <h3>
                      {{
                        $n(parseFloat(totalProdutos + totalFrete), "currency")
                      }}
                    </h3>
                  </v-card>
                  <v-card class="separa mt-4" elevation="0">
                    <v-btn
                      class="btnFilter ampliarBtn"
                      elevation="0"
                      @click="$router.push(`/`)"
                      >Continuar comprando</v-btn
                    >
                  </v-card>
                  <v-card class="separa mt-2 mb-5" elevation="0">
                    <v-btn
                      class="ampliarBtn"
                      color="primary"
                      elevation="0"
                      @click="prox"
                      id="irPagamento"
                      >Ir para pagamento</v-btn
                    >
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col lg="12" class="mt-5 centraliza">
              <h4 class="grey--text">
                Hummm... você não possui itens em seu carrinho, se redirecione
                para a nossa página de produtos, compre algo e seu produto
                aparecerá aqui, okay?
              </h4>
            </v-col>
            <v-col lg="12" class="centraliza">
              <v-btn color="primary" @click="$router.push(`/`)"
                >Ver produtos</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      <h4 style="font-weight: 100">{{ mensagem }}</h4>
      <template v-slot:action="{ attrs }">
        <v-btn text icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";
import endereco from "../usuario/endereco.vue";

export default {
  components: {
    endereco,
  },
  data() {
    return {
      cep: "",
      mensagem: "",
      snackbarColor: "",
      snackbar: false,
      totalProdutos: 0,
      totalFrete: 0,
    };
  },
  mounted() {
    if (this.$store.state.carrinho.length > 0) {
      this.$store.state.carrinho.forEach((item) => {
        this.totalProdutos += item.qtd * item.preco;
      });
    }
  },
  methods: {
    getImgUrl(pic) {
      return require("../../../assets/images/" + pic);
    },
    calculaFrete() {
      if (this.cep == "" || this.cep == null) {
        this.exibeSnackBar("#b38b57", "O campo CEP deve estar preenchido");
        return false;
      }
      let frm = {
        cep: this.cep.replace("-", ""),
        peso: 1,
        comprimento: 50,
        altura: 8,
        largura: 10,
        diametro: 8,
      };
      this.$http.post(`/frete/`, frm).then((res) => {
        this.totalFrete = parseFloat(res.data.valor[0].Valor);
      });
    },
    ...mapMutations(["addCarrinho"]),
    ...mapMutations(["editarCarrinho"]),
    ...mapMutations(["removeItemCarrinho"]),
    removeItem(item) {
      this.totalProdutos -= parseFloat(item.preco) * item.qtd;
      item.qtd = 0;
      this.removeItemCarrinho(item.cod);
    },
    atualizarCarrinho(item, tipo) {
      let totalProdutos = this.totalProdutos;
      let pdt = this.$store.state.carrinho.filter((prod) => {
        let preco = parseFloat(prod.preco);
        if (item.cod == prod.cod) {
          if (tipo == "add") {
            totalProdutos -= preco * prod.qtd;
            prod.qtd += 1;
            totalProdutos += preco * prod.qtd;
          } else {
            if (prod.qtd == 0) {
              totalProdutos -= preco;
              this.removeItemCarrinho(item.cod);
            } else {
              totalProdutos -= preco;
              prod.qtd -= 1;
            }
          }
        }
      });
      this.totalProdutos = totalProdutos;
      this.editarCarrinho(pdt);
    },

    addProduto(item) {
      let index = this.$store.state.carrinho.findIndex(
        (pdt) => pdt.cod == item.cod
      );
      if (this.$store.state.carrinho.length == 0 || index == -1) {
        this.totalProdutos += parseFloat(item.preco);
        this.addCarrinho(item);
        this.exibeSnackBar("#b38b57", "Seu produto foi add ao carrinho");
      } else {
        this.atualizarCarrinho(item, "add");
      }
    },
    exibeSnackBar(cor, msg) {
      this.snackbarColor = cor;
      this.mensagem = msg;
      this.snackbar = true;
    },
    prox() {
      this.$emit("compraProx", 1);
    },
  },
};
</script>
<style>
.separa {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tituloModalCarrinho {
  font-size: 28px;
  font-weight: 500;
}
</style>
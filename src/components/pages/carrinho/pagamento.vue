<template>
  <v-container fluid>
    <v-card class="px-3" elevation="0">
      <v-row>
        <v-col lg="6">
          <p class="mb-3 tituloModalCarrinho">
            <v-icon class="pb-1" large>mdi-chevron-double-right</v-icon
            >Pagamento
          </p>
          <v-divider class="mb-8"></v-divider>
          <v-card elevation="0" class="mt-3">
            <h4 class="alinhamentoTitulo">
              <p>
                <v-icon>mdi-credit-card-plus-outline</v-icon> Cartão de crédito
              </p>
              <v-btn
                elevation="0"
                text
                v-if="mostrarCartao == false"
                class="btnSubmit pb-3"
                @click="mostrarCartao = true"
                ><v-icon left> mdi-plus </v-icon> add cartão</v-btn
              >
            </h4>
            <p v-show="mostrarCartao == false">
              Selecione os cartões que deseja pagar
            </p>
            <v-row
              v-if="$store.state.cartoes.length > 0"
              v-show="mostrarCartao == false"
            >
              <v-col
                lg="6"
                class="pl-0"
                v-for="(item, i) in this.$store.state.cartoes"
                :key="i"
              >
                <v-card elevation="0">
                  <div @click="selecionaCartao(item.id)">
                    <cartao
                      :class="[
                        item.selecionado == true ? 'marcado' : 'desmarcado',
                      ]"
                      :nome="item.nome"
                      :numero="item.numero"
                      :data="item.data_validade"
                      :id="i"
                    ></cartao>
                  </div>
                  <div v-if="item.selecionado == true">
                    <v-text-field
                      v-if="verificaExistenciaCartao(item) == false"
                      @blur="
                        $event.target.value = salvaValor(
                          item.id,
                          $event.target.value
                        )
                      "
                      label="Valor a pagar neste cartão"
                      class="cupom-input"
                      v-mask="['R$#,##', 'R$##,##', 'R$###,##', 'R$####,##']"
                      id="cupom"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-if="verificaExistenciaCartao(item) == true"
                      :disabled="true"
                      v-model="restante"
                      label="Valor a pagar neste cartão"
                      class="cupom-input"
                      id="cupom"
                      required
                    ></v-text-field>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col>
                <p>Você ainda não possui cartões cadastrados</p>
              </v-col>
            </v-row>
            <v-row v-if="mostrarCartao == true">
              <v-col lg="12" class="alinhamento">
                <v-btn
                  elevation="1"
                  icon
                  id="ir"
                  v-if="mostrarCartao == true"
                  @click="mostrarCartao = false"
                  ><v-icon>mdi-close</v-icon></v-btn
                ></v-col
              >
              <v-col lg="12">
                <addCartao :mostra="false"></addCartao>
              </v-col>
            </v-row>
            <v-row>
              <v-col lg="12">
                <h4><v-icon>mdi-ticket-percent-outline</v-icon> Cupom</h4>
                <p>Você tem um cupom? Desejo usá-lo agora</p>
                <v-row>
                  <v-col lg="10">
                    <v-text-field
                      v-model="cupom"
                      label="Cupom"
                      :disabled="cupomUtilizado == true"
                      class="cupom-input"
                      id="cupom2"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col lg="2">
                    <v-btn
                      color="primary"
                      v-if="cupomUtilizado == false"
                      @click="usarCupom"
                      >Utilizar</v-btn
                    >
                    <v-btn
                      color="primary"
                      v-if="cupomUtilizado == true"
                      @click="removerCupom"
                      >Remover</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col lg="12" class="alinhamento" v-show="mostrarEndereco">
                <v-btn
                  elevation="1"
                  icon
                  v-if="mostrarEndereco == true"
                  @click="mostrarEndereco = false"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </v-col>
              <v-col lg="12" v-show="mostrarEndereco">
                <endereco :mostra="false"></endereco>
              </v-col>
              <v-col lg="12" v-show="mostrarEndereco == false">
                <h4 class="alinhamentoTitulo">
                  <p>
                    <v-icon>mdi-map-marker-radius-outline</v-icon> Endereço de
                    entrega
                  </p>
                  <v-btn
                    elevation="0"
                    text
                    v-if="mostrarEndereco == false"
                    class="btnSubmit pb-3"
                    @click="mostrarEndereco = true"
                    ><v-icon left> mdi-plus </v-icon> Add endereco</v-btn
                  >
                </h4>
                <p>Selecione o endereço de entrega do seus produtos</p>
                <v-row
                  class="mt-3"
                  v-for="(item, i) in $store.state.enderecos"
                  :key="i"
                >
                  <v-col
                    lg="6"
                    v-if="
                      item.tipo_endereco == 'Entrega' ||
                      item.tipo_endereco == 'Cobrança e Entrega'
                    "
                  >
                    <v-card
                      elevation="0"
                      class="card-endereco p-2"
                      :class="[
                        enderecoEntrega == item.id ? 'marcado' : 'desmarcado',
                      ]"
                      @click="enderecoEntrega = item.id"
                    >
                      <div class="endereco">
                        <div class="nome-endereco">
                          <h4>{{ item.nome }}</h4>
                        </div>
                        <div class="cep-endereco">
                          <span>{{ item.cep }}</span>
                          <span>N° {{ item.numero }}</span>
                        </div>
                      </div>
                      <!-- <v-row>
                        <v-col lg="12" class="centraliza p-0">
                          <h4>{{ item.nome }}</h4>
                        </v-col>
                        <v-col lg="6" class="p-0 centraliza">
                          <p>{{ item.cep }}</p>
                        </v-col>
                        <v-col lg="6" class="p-0 centraliza">
                          <p>N° {{ item.numero }}</p>
                        </v-col>
                      </v-row> -->
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col lg="1"></v-col>
        <v-divider vertical></v-divider>
        <v-col lg="5" class="pl-5">
         
          <resumoPedido
            :frete="frete"
            :cashback="cashback.valor"
            :desconto="desconto"
            :tipoDesconto="$store.state.cupomUtilizado.tipo"
            :habilitaBotao="habilitaBotao"
            @total="total = $event"
            pag="pagamento"
          ></resumoPedido>
        </v-col>
      </v-row>
    </v-card>
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
import addCartao from "../usuario/pagamento.vue";
import cartao from "../../ui/cartao.vue";
import resumoPedido from "../carrinho/resumoPedido.vue";
import endereco from "../usuario/endereco.vue";
import { mapMutations } from "vuex";

export default {
  components: { addCartao, cartao, resumoPedido, endereco },
  data() {
    return {
      cartoes: "",
      cupom: "",
      cupomUtilizado: false,
      enderecoEntrega: "",
      pagConfirmacao: false,
      mostrarCartao: false,
      mostrarEndereco: false,
      totalProdutos: 0,
      total: 0,
      frete: "0",
      snackbarColor: "",
      mensagem: "",
      restante: 0,
      snackbar: false,
      cashback: {
        valor: 0,
      },
      itensDivisoes: [
        "Pagar com 1 cartão",
        "Pagar com 2 cartões",
        "Pagar com 3 cartões",
      ],
    };
  },
  activated() {},
  mounted() {
    if (this.$store.state.carrinho.length > 0) {
      this.restante = this.$n(this.totalProdutos, "currency");
    }
    this.$http
      .get(`/cashback/${localStorage.getItem("usuarioId")}`)
      .then((res) => {
        this.cashback = res.data.cashback[0];
      });

    if (Object.keys(this.$store.state.freteCalculado).length > 0) {
      this.enderecoEntrega = this.$store.state.freteCalculado.id;
    }
  },
  watch: {
    total(newVal, oldVal) {
      let val = newVal - oldVal;
      //Add frete
      if (val > 0) {
        this.totalProdutos += val;
      }
      //Teve desconto
      else {
        this.totalProdutos = newVal - (oldVal - this.totalProdutos);
        this.$store.state.cartoesEscolhidos[
          this.$store.state.cartoesEscolhidos.length - 1
        ].valor = this.totalProdutos;
      }
    },
    enderecoEntrega(newVal) {
      this.$store.state.enderecos.filter((endereco) => {
        if (newVal == endereco.id) {
          this.calculaFrete(endereco.cep, endereco.id);
        }
      });
      this.$store.state.enderecos.filter((endereco) => {
        if (endereco.id == newVal) {
          this.$store.state.enderecoDeEntrega = endereco;
        }
      });
    },
    totalProdutos() {
      this.restante = this.$n(this.totalProdutos, "currency");
    },
  },
  computed: {
    habilitaBotao() {
      let valFrete = parseFloat(this.frete);
      if (
        (valFrete != 0 && this.$store.state.cartoesEscolhidos.length > 0) ||
        (valFrete != 0 && this.totalProdutos == 0)
      ) {
        if (this.$store.state.cartoesEscolhidos.length > 0) {
          this.salvaValorRestante();
        }
        return true;
      }
      return false;
    },
    desconto() {
      let frete = parseFloat(this.frete);
      let total = 0;
      let porcen = this.$store.state.cupomUtilizado.porcen;
      if (this.$store.state.carrinho.length > 0) {
        this.$store.state.carrinho.forEach((item) => {
          total += item.qtd * item.preco;
        });
      }
      if (this.$store.state.cupomUtilizado.tipo == "frete") {
        return frete * (porcen / 100);
      } else {
        return total * (porcen / 100);
      }
    },
  },
  methods: {
    ...mapMutations(["editarCupons"]),
    ...mapMutations(["removeCupons"]),
    ...mapMutations(["editarCartao"]),
    selecionaCartao(id) {
      let index = this.$store.state.cartoesEscolhidos.findIndex(
        (item) => item.id == id
      );

      let restante = this.totalProdutos;
      if (index == -1) {
        this.$store.state.cartoes.filter((cartao) => {
          if (cartao.id == id) {
            cartao.selecionado = true;
            this.$store.state.cartoesEscolhidos.push(cartao);
            let ref = this.$store.state.cartoesEscolhidos.findIndex(
              (item) => item.id == id
            );
            if (ref != this.$store.state.cartoesEscolhidos.length - 1) {
              cartao.valor = 0;
            } else {
              cartao.valor = restante;
              this.$store.state.cartoesEscolhidos.forEach((item, i) => {
                if (this.totalProdutos == item.valor) {
                  item.valor = 0;
                  if (i != this.$store.state.cartoesEscolhidos.length - 1) {
                    this.$store.state.cartoesEscolhidos[i] = item;
                  }
                }
              });
            }
            this.$store.state.cartoesEscolhidos[
              this.$store.state.cartoesEscolhidos - 1
            ] = cartao;
            this.editarCartao(cartao);
          }
        });
      } else {
        this.$store.state.cartoes.filter((cartao) => {
          if (cartao.id == id) {
            cartao.selecionado = false;
            this.$store.state.cartoesEscolhidos.splice(index, 1);
            let teste =
              this.$store.state.cartoesEscolhidos[
                this.$store.state.cartoesEscolhidos.length - 1
              ].valor;
            restante = cartao.valor + teste;
            cartao.valor = 0;
            this.editarCartao(cartao);
          }
        });
        this.totalProdutos = restante;
      }
    },
    salvaValor(id, val) {
      val = val.replace("R$", "");
      val = val.replace(",", ".");
      val = parseFloat(val);
      if (val == 0 || val == null || isNaN(val)) {
        return "";
      }
      if (val < 10 || this.totalProdutos - val < 10) {
        this.exibeSnackBar(
          "red",
          "O valor minimo em cada cartão é de R$10,00 reais"
        );
        return "";
      }
      if (val > this.totalProdutos) {
        this.exibeSnackBar("red", "Valor maior que a compra");
        return "";
      }
      let index = this.$store.state.cartoesEscolhidos.findIndex(
        (item) => item.id == id
      );

      this.$store.state.cartoesEscolhidos.filter((item) => {
        if (item.id == id) {
          if (this.totalProdutos != item.valor) {
            this.totalProdutos += item.valor;
          }
          item.valor = val;
          this.$store.state.cartoesEscolhidos[index] = item;
        }
      });
      this.totalProdutos = this.totalProdutos - val;
      this.salvaValorRestante();
      return this.$n(val, "currency");
    },
    salvaValorRestante() {
      this.$store.state.cartoesEscolhidos[
        this.$store.state.cartoesEscolhidos.length - 1
      ].valor = this.totalProdutos;
    },
    verificaExistenciaCartao(item) {
      let teste = this.$store.state.cartoesEscolhidos.findIndex(
        (val) => item.id == val.id
      );
      if (teste == this.$store.state.cartoesEscolhidos.length - 1) return true;
      else return false;
    },
    usarCupom() {
      if (this.cupom == "" || this.cupom == null) {
        this.exibeSnackBar("#b38b57", "Não é possivel usar um cupom vazio");
        return false;
      }
      this.cupom = this.cupom.toUpperCase();
      this.$http
        .get(`/cupom/${this.cupom}`)
        .then((res) => {
          let qtd = res.data.cupom[0].quant - 1;
          let frm = {
            id: res.data.cupom[0].id,
            cod: res.data.cupom[0].cod,
            porcen: res.data.cupom[0].porcen,
            tipo: res.data.cupom[0].tipo,
            quant: qtd,
          };
          this.$store.state.cupomUtilizado = frm;

          this.$http.patch(`/cupom/${frm.id}`, { quant: qtd }).then(() => {
            this.cupomUtilizado = true;
            this.exibeSnackBar("green", "Cupom utilizado");
          });

          return true;
        })
        .catch((e) => {
          this.exibeSnackBar("red", "Cupom inexistente ou esgotado", e);
          return false;
        });
      this.cupom = "";
    },
    removerCupom() {
      let cupomUsado = this.$store.state.cupomUtilizado;
      this.$store.state.cupons.filter((cupom) => {
        if (cupom.cod == cupomUsado.cod) {
          cupom.quant += 1;
          this.editarCupons(cupom);
          this.cupomUtilizado = false;
          (this.$store.state.cupomUtilizado = {
            porcen: 0,
          }),
            this.exibeSnackBar("#b38b57", "Cupom removido");
          return true;
        } else {
          this.exibeSnackBar("red", "falha ao remover cupom");
          return false;
        }
      });
    },
    calculaFrete(cep, id) {
      let frm = {
        cep: cep.replace("-", ""),
        peso: 1,
        comprimento: 50,
        altura: 8,
        largura: 10,
        diametro: 8,
      };
      this.$http.post(`/frete/`, frm).then((res) => {
        this.frete = res.data.valor[0].Valor;
        this.$store.state.freteCalculado = {
          id: id,
          frete: this.frete,
        };
      });

      this.frete = "22.00";
      this.$store.state.freteCalculado = {
        id: id,
        frete: this.frete,
      };
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
.card-endereco {
  border: 2px solid #bbb !important;
}
.marcado {
  border: 2px solid #b38b57 !important;
}
.desmarcado {
  border: 2px solid #bbb !important;
}
.cupom-input input {
  text-transform: uppercase;
}
.alinhamento {
  display: flex;
  justify-content: end;
}
.alinhamentoTitulo {
  display: flex;
  justify-content: space-between;
}
.endereco {
  padding: 2%;
}

.nome-endereco {
  display: flex;
  justify-content: center;
  padding-bottom: 4%;
}

.cep-endereco {
  display: flex;
  justify-content: space-around;
}
</style>
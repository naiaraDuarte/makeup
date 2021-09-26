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
                  <div @click="marca(item.id)">
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

                  <v-text-field
                    v-if="item.selecionado == true && i < $store.state.cartoes.length - 1"
                    @blur="salvaValor(item.id, $event.target.value)"
                    label="Valor a pagar neste cartão"
                    class="cupom-input"
                    v-mask="['R$#,##', 'R$##,##', 'R$###,##', 'R$####,##']"
                    id="cupom"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-if="item.selecionado == true && i == $store.state.cartoes.length - 1" 
                    :disabled="true"
                    v-model="restante"
                    label="Valor a pagar neste cartão"
                    class="cupom-input"
                    id="cupom"
                    required
                  ></v-text-field>
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
                      id="cupom"
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
                <p>Selecione o endereço de entraga do seus produtos</p>
                <v-row
                  class="mt-3"
                  v-for="(item, i) in this.$store.state.enderecos"
                  :key="i"
                >
                  <v-col lg="6" v-if="item.tipo_endereco == 'Entrega'">
                    <v-card
                      elevation="0"
                      class="card-endereco p-2"
                      :class="[
                        enderecoEntrega == item.id ? 'marcado' : 'desmarcado',
                      ]"
                      @click="enderecoEntrega = item.id"
                    >
                      <v-row>
                        <v-col lg="12" class="centraliza">
                          <h4>{{ item.nome }}</h4>
                        </v-col>
                        <v-col lg="6" class="p-0 centraliza">
                          <p>{{ item.cep }}</p>
                        </v-col>
                        <v-col lg="6" class="p-0 centraliza">
                          <p>N° {{ item.numero }}</p>
                        </v-col>
                      </v-row>
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
            :desconto="desconto"
            :habilitaBotao="habilitaBotao"
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
      marcados: [],
      totalProdutos: 0,
      frete: "0",
      snackbarColor: "",
      mensagem: "",
      restante: 0,
      snackbar: false,
      itensDivisoes: [
        "Pagar com 1 cartão",
        "Pagar com 2 cartões",
        "Pagar com 3 cartões",
      ],
    };
  },
  mounted() {
    if (this.$store.state.carrinho.length > 0) {
      this.$store.state.carrinho.forEach((item) => {
        this.totalProdutos += item.qtd * item.preco;
      });
      this.restante = this.$n(this.totalProdutos + parseFloat(this.frete), "currency")
    }
  },
  watch: {
    enderecoEntrega(newVal) {
      this.$store.state.enderecos.filter((endereco) => {
        if (newVal == endereco.id) {
          this.calculaFrete(endereco.cep);
        }
      });
      this.$store.state.enderecos.filter((endereco) => {
        if (endereco.id == newVal) {
          this.$store.state.enderecoDeEntrega = endereco;
        }
      });
    },
  },
  computed: {
    habilitaBotao() {
      if (this.frete != "0" && this.marcados.length > 0) {
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
    marca(val) {
      this.$store.state.cartoesEscolhidos = [];
      let index = this.marcados.findIndex((item) => item.cartao == val);
      if (index == -1) {
        this.marcados.push({cartao: val, valor: 0});
        this.$store.state.cartoes.filter((cartao) => {
          this.marcados.some((item) => {
            if (cartao.id == item.cartao) {
              cartao.selecionado = true;
              cartao.valor = 0;
              this.$store.state.cartoesEscolhidos.push(cartao);
              this.editarCartao(cartao);
            }
          });
        });
      } else {
        this.$store.state.cartoes.filter((cartao) => {
          this.marcados.some((item) => {
            if (cartao.id == item.cartao) {
              cartao.selecionado = false;
              cartao.valor = 0;
              this.editarCartao(cartao);
            }
          });
        });
        this.marcados.splice(index, 1);
        this.$store.state.cartoesEscolhidos = this.marcados;
      }
      console.log(this.marcados);
    },
    salvaValor(id, val) {
      let index = this.marcados.findIndex((item) => item.cartao == val);
      this.marcados[index] = {cartao: id, valor: val};
      this.$store.state.cartoesEscolhidos = this.marcados;
      val = val.replace("R$", "")
      val = val.replace(",", ".")
      this.restante = this.$n((this.totalProdutos + parseFloat(this.frete)) - parseFloat(val), "currency");
    },
    usarCupom() {
      if (this.cupom == "" || this.cupom == null) {
        this.exibeSnackBar("#b38b57", "Não é possivel usar um cupom vazio");
        return false;
      }
      this.cupom = this.cupom.toUpperCase();
      if (this.$store.state.cupons.length == 0) {
        this.exibeSnackBar("red", "Nenhum cupom cadastrado");
        return false;
      }
      this.$store.state.cupons.filter((cupom) => {
        if (cupom.cod == this.cupom && cupom.quant > 0) {
          let frm = {
            cod: this.cupom,
            porcen: cupom.porcen,
            tipo: cupom.tipo,
          };
          this.$store.state.cupomUtilizado = frm;
          cupom.quant -= 1;
          this.editarCupons(cupom);
          this.cupomUtilizado = true;
          this.exibeSnackBar("green", "Cupom utilizado");
          console.log("FUncionaouuu", this.$store.state.cupons);
          return true;
        } else {
          this.exibeSnackBar("red", "Cupom inexistente ou esgotado");
          return false;
        }
      });
      this.cupom = "";
    },
    removerCupom() {
      let cupomUsado = this.$store.state.cupomUtilizado;
      this.$store.state.cupons.filter((cupom) => {
        if (cupom.cod == cupomUsado.cod) {
          cupom.quant += 1;
          this.editarCupons(cupom);
          console.log("Valor abatido", this.$store.state.cupons);
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
    calculaFrete(cep) {
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
        this.$store.state.freteCalculado = this.frete;
        console.log("valor", res);
      });

      this.frete = "22.00";
      this.$store.state.freteCalculado = this.frete;
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
</style>